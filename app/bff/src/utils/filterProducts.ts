import type { CatalogQuery, CatalogFallback } from '../services/llm/types.js';

export interface Product {
  id: string;
  name: string;
  category: string;
  color: string;
  quality: string;
  origin: string;
  image?: string;
  searchCode?: string;
  unitType?: string;
  units?: number;
  box?: string;
  tags?: string[];
  pack?: number;
  bunches?: number;
  quantity?: number;
  companyProductId?: number;
  specs?: { label?: string; value: string }[];
  detailSpecs?: { icon: string; label: string; value: string }[];
}

export function isEmptyQuery(query: CatalogQuery): boolean {
  return (
    !query.categories?.length &&
    !query.colors?.length &&
    !query.origins?.length &&
    !query.nameContains &&
    !query.unitType &&
    !query.box
  );
}

export function filterProducts(products: Product[], query: CatalogQuery): Product[] {
  if (isEmptyQuery(query)) {
    return [];
  }

  return products.filter((p) => {
    if (query.categories?.length && !query.categories.includes(p.category)) {
      return false;
    }
    if (query.colors?.length && !query.colors.includes(p.color)) {
      return false;
    }
    if (query.origins?.length && !query.origins.includes(p.origin)) {
      return false;
    }
    if (
      query.nameContains &&
      !p.name.toLowerCase().includes(query.nameContains.toLowerCase())
    ) {
      return false;
    }
    if (query.unitType && p.unitType !== query.unitType) {
      return false;
    }
    if (query.box && p.box !== query.box) {
      return false;
    }
    return true;
  });
}

/**
 * Scores and filters products by how well they match fallback criteria.
 * Products matching ANY tag, color, or category get a relevance score;
 * only products with score > 0 are returned, sorted by score descending.
 */
export function filterByFallback(products: Product[], fallback: CatalogFallback): Product[] {
  const hasTags = (fallback.tags?.length ?? 0) > 0;
  const hasColors = (fallback.colors?.length ?? 0) > 0;
  const hasCategories = (fallback.categories?.length ?? 0) > 0;

  if (!hasTags && !hasColors && !hasCategories) {
    return [];
  }

  const tagSet = new Set(fallback.tags ?? []);
  const colorSet = new Set(fallback.colors ?? []);
  const categorySet = new Set(fallback.categories ?? []);

  const scored = products.map((p) => {
    let score = 0;
    if (hasTags && p.tags?.length) {
      score += p.tags.filter((t) => tagSet.has(t)).length * 2;
    }
    if (hasColors && colorSet.has(p.color)) {
      score += 3;
    }
    if (hasCategories && categorySet.has(p.category)) {
      score += 3;
    }
    return { product: p, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.product);
}
