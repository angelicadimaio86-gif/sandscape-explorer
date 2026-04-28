import { SAMPLES, computeStats } from "@/data/samples";
import type { SampleStats } from "@/types/sample";
import { useMemo } from "react";

/**
 * Restituisce il dataset completo (immutabile) e statistiche aggregate.
 * Il dataset è caricato a build-time, quindi non c'è loading state.
 */
export function useSamples() {
  const samples = SAMPLES;

  const stats: SampleStats = useMemo(() => computeStats(samples), [samples]);

  const continenti = useMemo(() => {
    const set = new Set<string>();
    samples.forEach((s) => set.add(s.continente));
    return Array.from(set).sort();
  }, [samples]);

  const tipologie = useMemo(() => {
    const set = new Set<string>();
    samples.forEach((s) => set.add(s.tipologia));
    return Array.from(set).sort();
  }, [samples]);

  const paesi = useMemo(() => {
    const set = new Set<string>();
    samples.forEach((s) => set.add(s.paese));
    return Array.from(set).sort();
  }, [samples]);

  return { samples, stats, continenti, tipologie, paesi };
}