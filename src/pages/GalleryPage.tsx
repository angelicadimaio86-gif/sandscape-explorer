import { useState } from "react";
import { useSamples } from "@/hooks/useSamples";
import {
  useFilteredSamples,
  EMPTY_FILTERS,
  type SampleFilters,
  type SortBy,
  type SortDir,
} from "@/hooks/useFilteredSamples";
import { SampleGrid } from "@/components/SampleGrid";
import { SearchBar } from "@/components/SearchBar";
import { FilterBar } from "@/components/FilterBar";
import { EmptyState } from "@/components/EmptyState";

export function GalleryPage() {
  const { samples, continenti, tipologie, paesi } = useSamples();
  const [filters, setFilters] = useState<SampleFilters>(EMPTY_FILTERS);
  const [sortBy, setSortBy] = useState<SortBy>("nome");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const filtered = useFilteredSamples(samples, filters, sortBy, sortDir);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-col gap-2">
        <h1 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">
          Galleria dei campioni
        </h1>
        <p className="text-sm text-muted-foreground">
          Esplora, filtra e ordina i {samples.length} campioni della collezione.
        </p>
      </header>

      <div className="mb-6 flex flex-col gap-4">
        <SearchBar
          value={filters.search}
          onChange={(v) => setFilters({ ...filters, search: v })}
          resultsCount={filtered.length}
        />
        <FilterBar
          filters={filters}
          onChange={setFilters}
          continenti={continenti}
          tipologie={tipologie}
          paesi={paesi}
        />
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <label htmlFor="sort" className="text-muted-foreground">
            Ordina per:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="rounded-full border border-border bg-card px-3 py-1.5 text-sm shadow-sm focus:border-primary focus:outline-none"
          >
            <option value="nome">Nome</option>
            <option value="paese">Paese</option>
            <option value="anno">Anno</option>
            <option value="id">ID</option>
          </select>
          <button
            type="button"
            onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
            className="rounded-full border border-border bg-card px-3 py-1.5 text-sm shadow-sm hover:bg-secondary"
            aria-label={`Inverti ordine, attualmente ${sortDir === "asc" ? "crescente" : "decrescente"}`}
          >
            {sortDir === "asc" ? "↑ A→Z" : "↓ Z→A"}
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="Nessun campione trovato"
          message="Prova a rimuovere alcuni filtri o a modificare la ricerca."
        />
      ) : (
        <SampleGrid samples={filtered} />
      )}
    </div>
  );
}