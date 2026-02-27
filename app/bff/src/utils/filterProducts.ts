import type { CatalogQuery } from '../services/llm/types.js';

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

export function filterProducts(products: Product[], query: CatalogQuery): Product[] {
  if (
    !query.categories?.length &&
    !query.colors?.length &&
    !query.origins?.length &&
    !query.nameContains &&
    !query.unitType &&
    !query.box
  ) {
    return products;
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
