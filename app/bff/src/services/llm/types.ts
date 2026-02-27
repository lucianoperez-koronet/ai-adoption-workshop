/**
 * Structured query output from the LLM for filtering the flower catalog.
 * All fields are optional; empty object means no filters (return all products).
 */
export interface CatalogQuery {
  categories?: string[];
  colors?: string[];
  origins?: string[];
  nameContains?: string;
  unitType?: string;
  box?: string;
}

/**
 * When the user describes an occasion/event rather than specific flower attributes,
 * the LLM returns fallback data so we can suggest relevant products via tags.
 */
export interface CatalogFallback {
  tags?: string[];
  colors?: string[];
  categories?: string[];
  message?: string;
}

export interface CatalogLLMResponse {
  query: CatalogQuery;
  fallback?: CatalogFallback;
}

export interface ICatalogLLMProvider {
  interpretQuery(userQuery: string): Promise<CatalogLLMResponse>;
}
