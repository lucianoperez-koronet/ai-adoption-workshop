import { Skeleton } from '@/components/ui/skeleton';

export function ProductCardSkeleton() {
  return (
    <article
      className="flex flex-col rounded-xl bg-white border border-gray-200/60 shadow-sm overflow-hidden"
      style={{ minHeight: 280 }}
    >
      <Skeleton className="aspect-square w-full rounded-none" />
      <div className="p-3 flex flex-col flex-1 gap-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-2/3 mt-1" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="mt-auto pt-3 h-10 w-full rounded-lg" />
      </div>
    </article>
  );
}
