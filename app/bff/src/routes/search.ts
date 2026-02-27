import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Hono } from 'hono';
import { getCatalogLLMProvider } from '../services/llm/index.js';
import type { CatalogQuery, CatalogFallback, CatalogLLMResponse } from '../services/llm/types.js';
import { filterProducts, filterByFallback, isEmptyQuery, type Product } from '../utils/filterProducts.js';
import {
  createTraceId,
  log,
  runWithTrace,
} from '../lib/logger.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const productsPath = join(__dirname, '../data/products.json');
const products: Product[] = JSON.parse(readFileSync(productsPath, 'utf-8'));

const search = new Hono();

search.get('/', (c) => {
  log.info('search', 'GET /api/search - returning all products', {
    total: products.length,
  });
  return c.json({
    data: products,
    query: {},
    total: products.length,
  });
});

search.post('/', async (c) => {
  const traceId = createTraceId();
  const result = await runWithTrace(traceId, async () => {
    const startMs = Date.now();
    log.info('search', 'POST /api/search - request received', { traceId });

    try {
      const body = await c.req.json<{
        query?: string;
        catalogQuery?: CatalogQuery;
      }>();

      let catalogQuery: CatalogQuery;
      let fallback: CatalogFallback | undefined;
      let source: 'nl' | 'structured';

      if (body?.catalogQuery && typeof body.catalogQuery === 'object') {
        source = 'structured';
        catalogQuery = body.catalogQuery;
        log.info('search', 'Using structured catalogQuery (no LLM call)', {
          catalogQuery,
          source,
        });
      } else if (typeof body?.query === 'string' && body.query.trim()) {
        source = 'nl';
        log.info('search', 'Calling LLM to interpret natural language query', {
          userQuery: body.query.trim(),
          source,
        });
        const provider = getCatalogLLMProvider();
        const llmResponse: CatalogLLMResponse = await provider.interpretQuery(body.query.trim());
        catalogQuery = llmResponse.query ?? {};
        fallback = llmResponse.fallback;
        log.info('search', 'LLM returned response', {
          catalogQuery,
          hasFallback: !!fallback,
          source,
        });
      } else {
        log.warn('search', 'Invalid request body - missing query or catalogQuery');
        const res = c.json(
          { error: 'Provide "query" (natural language) or "catalogQuery" (structured)' },
          { status: 400 }
        );
        res.headers.set('X-Trace-Id', traceId);
        return res;
      }

      let filtered = filterProducts(products, catalogQuery);
      let isFallback = false;
      let fallbackMessage: string | undefined;

      if (filtered.length === 0 || (isEmptyQuery(catalogQuery) && fallback)) {
        if (fallback) {
          const fallbackResults = filterByFallback(products, fallback);
          if (fallbackResults.length > 0) {
            filtered = fallbackResults;
            isFallback = true;
            fallbackMessage = fallback.message;
            log.info('search', 'Fallback applied — occasion-based results', {
              fallbackTags: fallback.tags,
              fallbackColors: fallback.colors,
              fallbackCategories: fallback.categories,
              fallbackCount: fallbackResults.length,
            });
          }
        }
      }

      const elapsedMs = Date.now() - startMs;

      log.info('search', 'Search completed', {
        catalogQuery,
        filteredCount: filtered.length,
        isFallback,
        totalCatalog: products.length,
        elapsedMs,
      });

      const res = c.json({
        data: filtered,
        query: catalogQuery,
        total: filtered.length,
        ...(isFallback && {
          isFallback: true,
          fallbackMessage,
          fallbackCriteria: {
            tags: fallback?.tags,
            colors: fallback?.colors,
            categories: fallback?.categories,
          },
        }),
      });
      res.headers.set('X-Trace-Id', traceId);
      return res;
    } catch (err) {
      const elapsedMs = Date.now() - startMs;
      log.error('search', 'Search failed', {
        error: err instanceof Error ? err.message : String(err),
        stack: err instanceof Error ? err.stack : undefined,
        elapsedMs,
      });
      const message = err instanceof Error ? err.message : 'Search failed';
      const res = c.json({ error: message }, { status: 500 });
      res.headers.set('X-Trace-Id', traceId);
      return res;
    }
  });
  return result;
});

export default search;
