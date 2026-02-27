import { Search, Sparkles } from 'lucide-react';

interface NaturalSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  placeholder?: string;
}

export function NaturalSearchBar({
  value,
  onChange,
  onSubmit,
  isLoading = false,
  placeholder = 'Search in natural language... e.g. "red alstroemeria from Colombia"',
}: NaturalSearchBarProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center border border-[#CEDBE8] rounded-xl bg-white"
      style={{
        width: 'min(526px, 100%)',
        height: '48px',
        padding: '4px 4px 4px 16px',
        gap: '2px',
      }}
    >
      <div className="flex-1 flex items-center gap-2 min-w-0">
        <Sparkles
          className="shrink-0 text-primary"
          style={{ width: 18, height: 18 }}
          aria-hidden
        />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={isLoading}
          className="w-full border-0 bg-transparent outline-none text-[#567094] placeholder:text-[#567094]/64"
          style={{
            fontFamily: 'Inter',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '1.5em',
          }}
          aria-label="Natural language search"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || !value.trim()}
        className="flex items-center justify-center rounded-lg shrink-0 disabled:opacity-60 transition-opacity"
        style={{
          width: '40px',
          height: '40px',
          backgroundColor: 'var(--tenant-primary, #109347)',
          padding: '8px',
        }}
        aria-label="Search"
      >
        <Search
          className={isLoading ? 'animate-pulse' : ''}
          style={{
            width: '20px',
            height: '20px',
            color: '#FFFFFF',
          }}
        />
      </button>
    </form>
  );
}
