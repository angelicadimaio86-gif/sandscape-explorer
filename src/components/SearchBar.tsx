import { Search, X } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  resultsCount?: number;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Cerca per nome, paese, provenienza…",
  resultsCount,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="search" className="sr-only">
        Ricerca campioni
      </label>
      <div className="relative">
        <Search
          aria-hidden
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          id="search"
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-full border border-border bg-card py-3 pl-10 pr-10 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        {value.length > 0 && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Cancella ricerca"
            className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <X size={14} />
          </button>
        )}
      </div>
      {typeof resultsCount === "number" && (
        <p className="px-1 text-xs text-muted-foreground">
          {resultsCount === 0
            ? "Nessun risultato"
            : `${resultsCount} ${resultsCount === 1 ? "campione" : "campioni"}`}
        </p>
      )}
    </div>
  );
}