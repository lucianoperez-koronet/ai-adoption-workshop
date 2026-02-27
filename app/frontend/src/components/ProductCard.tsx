import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

function formatSpecs(product: Product): string {
  const parts: string[] = [];
  const colorSpec = product.specs?.find((s) => s.label === 'Color');
  const stemSpec = product.specs?.find((s) => s.label === 'Stem/Bun');
  const unitSpec = product.specs?.find((s) => s.label === 'Unit/Box');
  const boxSpec = product.specs?.find((s) => s.label === 'Box');
  if (stemSpec) parts.push(`Stem/Bun: ${stemSpec.value}`);
  if (unitSpec) parts.push(`Unit/Box: ${unitSpec.value}`);
  if (boxSpec) parts.push(`Box: ${boxSpec.value}`);
  if (colorSpec) parts.push(`Color: ${colorSpec.value}`);
  return parts.join(' | ');
}

export function ProductCard({ product }: ProductCardProps) {
  const specs = formatSpecs(product);

  return (
    <article
      className="flex flex-col rounded-xl bg-white border border-gray-200/60 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
      style={{ minHeight: 280 }}
    >
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            No image
          </div>
        )}
      </div>
      <div className="p-3 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{specs}</p>
        <button
          className="mt-auto pt-3 w-full py-2 rounded-lg text-white text-sm font-medium transition-colors hover:opacity-90"
          style={{ backgroundColor: 'var(--tenant-primary, #109347)' }}
        >
          Shop Now
        </button>
      </div>
    </article>
  );
}
