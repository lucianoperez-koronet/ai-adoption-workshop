export interface CatalogQuery {
  categories?: string[];
  colors?: string[];
  origins?: string[];
  nameContains?: string;
  unitType?: string;
  box?: string;
}

export interface SearchResponse {
  data: import('./product').Product[];
  query: CatalogQuery;
  total: number;
}
