import type { CatalogQuery, SearchResponse } from '@/types/search';

const API_BASE = '/api';

export async function getAllProducts(): Promise<SearchResponse> {
  const res = await fetch(`${API_BASE}/search`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function searchWithCatalogQuery(
  catalogQuery: CatalogQuery
): Promise<SearchResponse> {
  const res = await fetch(`${API_BASE}/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ catalogQuery }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error ?? `Search failed: ${res.status}`);
  }
  return res.json();
}

export async function searchProducts(query: string): Promise<SearchResponse> {
  const res = await fetch(`${API_BASE}/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: query.trim() }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error ?? `Search failed: ${res.status}`);
  }
  return res.json();
}
