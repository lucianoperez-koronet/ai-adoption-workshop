import { useState, useEffect, useCallback } from 'react';
import { NaturalSearchBar } from '@/components/NaturalSearchBar';
import { ProductGrid } from '@/components/ProductGrid';
import { ProductCardSkeleton } from '@/components/ProductCardSkeleton';
import { FilterChips } from '@/components/FilterChips';
import {
  getAllProducts,
  searchProducts,
  searchWithCatalogQuery,
} from '@/services/searchApi';
import type { CatalogQuery, SearchResponse } from '@/types/search';
import type { Product } from '@/types/product';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState('');
  const [catalogQuery, setCatalogQuery] = useState<CatalogQuery>({});
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res: SearchResponse = await getAllProducts();
      setProducts(res.data);
      setCatalogQuery(res.query ?? {});
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const handleSearch = useCallback(async () => {
    if (!query.trim()) return;
    setSearching(true);
    setError(null);
    try {
      const res = await searchProducts(query.trim());
      setProducts(res.data);
      setCatalogQuery(res.query ?? {});
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Search failed');
    } finally {
      setSearching(false);
    }
  }, [query]);

  const handleRemoveFilter = useCallback(async (updatedQuery: CatalogQuery) => {
    setSearching(true);
    setError(null);
    try {
      const res = await searchWithCatalogQuery(updatedQuery);
      setProducts(res.data);
      setCatalogQuery(res.query ?? {});
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to update filters');
    } finally {
      setSearching(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-primary">
              <svg viewBox="0 0 24 24" className="w-full h-full text-white p-1.5" fill="currentColor">
                <path d="M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9zM5.6 10.25c0 1.38 1.12 2.5 2.5 2.5.53 0 1.01-.16 1.42-.44l-.02.19c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5l-.02-.19c.4.28.89.44 1.42.44 1.38 0 2.5-1.12 2.5-2.5 0-1-.6-1.85-1.44-2.25.84-.4 1.44-1.25 1.44-2.25 0-1.38-1.12-2.5-2.5-2.5-.53 0-1.01.16-1.42.44l.02-.19C14.5 2.12 13.38 1 12 1S9.5 2.12 9.5 3.5l.02.19c-.4-.28-.89-.44-1.42-.44-1.38 0-2.5 1.12-2.5 2.5 0 1 .6 1.85 1.44 2.25-.84.4-1.44 1.25-1.44 2.25z" />
              </svg>
            </div>
            <div>
              <span className="font-bold text-primary text-lg">ALLURE</span>
              <span className="block text-gray-500 text-xs -mt-0.5">FARMS</span>
            </div>
          </div>
          <NaturalSearchBar
            value={query}
            onChange={setQuery}
            onSubmit={handleSearch}
            isLoading={searching}
          />
          <button
            className="px-4 py-2 rounded-lg text-white font-medium text-sm"
            style={{ backgroundColor: 'var(--tenant-primary)' }}
          >
            Login &gt;
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-56 shrink-0">
            <h2 className="font-semibold text-gray-900 mb-3">Filters</h2>
            <div className="border-t border-gray-200 pt-3">
              <h3 className="text-sm font-medium text-gray-700 mb-2">AI filters</h3>
              <p className="text-xs text-gray-500 mb-3">
                Search in natural language. Filters appear here when applied.
              </p>
              {Object.keys(catalogQuery).length > 0 && (
                <FilterChips query={catalogQuery} onRemove={handleRemoveFilter} />
              )}
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <h1 className="font-bold text-gray-900 text-xl">All Products</h1>
              <span className="text-gray-500 text-sm">
                {loading || searching ? '...' : `${products.length} Results Found`}
              </span>
            </div>

            {error && (
              <div className="mb-4 p-4 rounded-lg bg-red-50 text-red-700 text-sm">
                {error}
                <button
                  onClick={loadAll}
                  className="ml-2 underline font-medium"
                >
                  Retry
                </button>
              </div>
            )}

            {loading || searching ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {Array.from({ length: 10 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <ProductGrid products={products} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
