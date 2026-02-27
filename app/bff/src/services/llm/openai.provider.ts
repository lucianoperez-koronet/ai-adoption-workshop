import OpenAI from 'openai';
import type { CatalogLLMResponse, ICatalogLLMProvider } from './types.js';
import { CATALOG_SEARCH_SYSTEM_PROMPT } from '../../prompts/catalogSearch.js';
import { log } from '../../lib/logger.js';

export class OpenAIProvider implements ICatalogLLMProvider {
  private client: OpenAI;
  private model: string;

  constructor(apiKey: string, model = 'gpt-4o-mini') {
    this.client = new OpenAI({ apiKey });
    this.model = model;
  }

  async interpretQuery(userQuery: string): Promise<CatalogLLMResponse> {
    const startMs = Date.now();
    log.info('llm.openai', 'interpretQuery started', {
      userQuery,
      model: this.model,
    });

    const response = await this.client.chat.completions.create({
      model: this.model,
      messages: [
        { role: 'system', content: CATALOG_SEARCH_SYSTEM_PROMPT },
        { role: 'user', content: userQuery },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'catalog_response',
          strict: true,
          schema: {
            type: 'object',
            properties: {
              query: {
                type: 'object',
                description: 'Exact attribute filters for catalog products',
                properties: {
                  categories: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Product categories to filter',
                  },
                  colors: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Colors to filter',
                  },
                  origins: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Origins to filter (MIA, SJO, NL, etc.)',
                  },
                  nameContains: {
                    type: 'string',
                    description: 'Substring to match in product name',
                  },
                  unitType: {
                    type: 'string',
                    enum: ['Stem', 'Bunch'],
                    description: 'Unit type filter',
                  },
                  box: {
                    type: 'string',
                    description: 'Box type filter',
                  },
                },
                additionalProperties: false,
              },
              fallback: {
                type: 'object',
                description: 'Occasion-based suggestions when no exact match',
                properties: {
                  tags: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Occasion/event tags to match',
                  },
                  colors: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Suggested colors for the occasion',
                  },
                  categories: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Suggested categories for the occasion',
                  },
                  message: {
                    type: 'string',
                    description: 'Friendly message explaining the suggestion',
                  },
                },
                additionalProperties: false,
              },
            },
            required: ['query'],
            additionalProperties: false,
          },
        },
      },
    });

    const content = response.choices[0]?.message?.content;
    const elapsedMs = Date.now() - startMs;

    if (!content) {
      log.warn('llm.openai', 'Empty response from OpenAI', { elapsedMs });
      return { query: {} };
    }

    const parsed = JSON.parse(content) as CatalogLLMResponse;
    log.info('llm.openai', 'interpretQuery completed', {
      catalogQuery: parsed.query,
      hasFallback: !!parsed.fallback,
      rawContentLength: content.length,
      usage: response.usage,
      elapsedMs,
    });
    return parsed;
  }
}
