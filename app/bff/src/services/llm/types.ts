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

export interface ICatalogLLMProvider {
  interpretQuery(userQuery: string): Promise<CatalogQuery>;
}
