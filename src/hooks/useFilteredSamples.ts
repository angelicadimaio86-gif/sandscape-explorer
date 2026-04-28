import { useMemo } from "react";
import type { Sample } from "@/types/sample";

export type SortBy = "nome" | "paese" | "anno" | "id";
export type SortDir = "asc" | "desc";

export interface SampleFilters {
  /** Ricerca testuale (nome, paese, provenienza, regione). */
  search: string;
  /** OR fra continenti scelti. AND con altre categorie. */
  continenti: string[];
  /** OR fra tipologie scelte. AND con altre categorie. */
  tipologie: string[];
  /** OR fra paesi scelti. AND con altre categorie. */
  paesi: string[];
}

export const EMPTY_FILTERS: SampleFilters = {
  search: "",
  continenti: [],
  tipologie: [],
  paesi: [],
};

function matchesSearch(sample: Sample, query: string): boolean {
  if (query.length === 0) return true;
  const q = query.toLowerCase();
  return (
    sample.nome.toLowerCase().includes(q) ||
    sample.paese.toLowerCase().includes(q) ||
    sample.provenienza.toLowerCase().includes(q) ||
    (sample.regione?.toLowerCase().includes(q) ?? false) ||
    (sample.provincia?.toLowerCase().includes(q) ?? false)
  );
}

function compareSamples(a: Sample, b: Sample, sortBy: SortBy): number {
  switch (sortBy) {
    case "nome":
      return a.nome.localeCompare(b.nome, "it");
    case "paese":
      return a.paese.localeCompare(b.paese, "it");
    case "anno": {
      const ya = a.anno ? parseInt(a.anno, 10) : 0;
      const yb = b.anno ? parseInt(b.anno, 10) : 0;
      return ya - yb;
    }
    case "id":
    default:
      return a.id - b.id;
  }
}

/**
 * Applica filtri multi-select con logica:
 *   AND fra categorie diverse, OR all'interno della stessa categoria.
 * Ordinamento e ricerca testuale combinate.
 */
export function useFilteredSamples(
  samples: readonly Sample[],
  filters: SampleFilters,
  sortBy: SortBy = "id",
  sortDir: SortDir = "asc",
): Sample[] {
  return useMemo(() => {
    const { search, continenti, tipologie, paesi } = filters;
    const trimmed = search.trim();
    const useC = continenti.length > 0;
    const useT = tipologie.length > 0;
    const useP = paesi.length > 0;

    const filtered = samples.filter((s) => {
      if (useC && !continenti.includes(s.continente)) return false;
      if (useT && !tipologie.includes(s.tipologia)) return false;
      if (useP && !paesi.includes(s.paese)) return false;
      if (!matchesSearch(s, trimmed)) return false;
      return true;
    });

    const sorted = [...filtered].sort((a, b) => compareSamples(a, b, sortBy));
    return sortDir === "desc" ? sorted.reverse() : sorted;
  }, [samples, filters, sortBy, sortDir]);
}