import type { CatalogQuery } from '@/types/search';
import { X } from 'lucide-react';

interface FilterChipsProps {
  query: CatalogQuery;
  onRemove: (updatedQuery: CatalogQuery) => void;
}

function Chip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm bg-primary/10 text-primary"
      style={{ backgroundColor: 'rgba(16, 147, 71, 0.12)' }}
    >
      {label}
      <button
        type="button"
        onClick={onRemove}
        className="rounded-full p-0.5 hover:bg-primary/20 transition-colors"
        aria-label={`Remove ${label}`}
      >
        <X style={{ width: 14, height: 14 }} />
      </button>
    </span>
  );
}

export function FilterChips({ query, onRemove }: FilterChipsProps) {
  const chips: { key: keyof CatalogQuery; label: string; value?: string }[] = [];

  if (query.categories?.length) {
    query.categories.forEach((c) =>
      chips.push({ key: 'categories', label: `Category: ${c}`, value: c })
    );
  }
  if (query.colors?.length) {
    query.colors.forEach((c) =>
      chips.push({ key: 'colors', label: `Color: ${c}`, value: c })
    );
  }
  if (query.origins?.length) {
    query.origins.forEach((o) =>
      chips.push({ key: 'origins', label: `Origin: ${o}`, value: o })
    );
  }
  if (query.nameContains) {
    chips.push({
      key: 'nameContains',
      label: `Name: "${query.nameContains}"`,
    });
  }
  if (query.unitType) {
    chips.push({ key: 'unitType', label: `Unit: ${query.unitType}` });
  }
  if (query.box) {
    chips.push({ key: 'box', label: `Box: ${query.box}` });
  }

  if (chips.length === 0) return null;

  const handleRemove = (
    key: keyof CatalogQuery,
    value?: string
  ) => {
    const updated = { ...query };
    if (key === 'categories' && value) {
      updated.categories = (query.categories ?? []).filter((c) => c !== value);
      if (!updated.categories.length) delete updated.categories;
    } else if (key === 'colors' && value) {
      updated.colors = (query.colors ?? []).filter((c) => c !== value);
      if (!updated.colors.length) delete updated.colors;
    } else if (key === 'origins' && value) {
      updated.origins = (query.origins ?? []).filter((o) => o !== value);
      if (!updated.origins.length) delete updated.origins;
    } else {
      delete updated[key];
    }
    onRemove(updated);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip) => (
        <Chip
          key={`${chip.key}-${chip.value ?? chip.label}`}
          label={chip.label}
          onRemove={() => handleRemove(chip.key, chip.value)}
        />
      ))}
    </div>
  );
}
