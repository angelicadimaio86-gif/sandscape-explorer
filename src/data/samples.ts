/**
 * Carica e valida il dataset dei campioni.
 *
 * Il JSON viene importato come modulo a build-time (no fetch a runtime),
 * validato con Zod (modalità tollerante) e normalizzato.
 */

import datiRaw from "./dati.json";
import { rawDatasetSchema } from "./schema";
import { normalizeSample } from "@/utils/normalize";
import type { Sample, SampleStats } from "@/types/sample";

function loadSamples(): Sample[] {
  const parsed = rawDatasetSchema.safeParse(datiRaw);
  if (!parsed.success) {
    // Mai bloccare l'app: scartiamo i campioni invalidi e logghiamo gli errori.
    if (typeof console !== "undefined") {
      console.warn(
        "[samples] Validazione dataset fallita per uno o più campioni:",
        parsed.error.issues.slice(0, 5),
      );
    }
    const arr = Array.isArray(datiRaw) ? datiRaw : [];
    return arr
      .map((raw) => {
        try {
          return normalizeSample(raw as never);
        } catch {
          return null;
        }
      })
      .filter((s): s is Sample => s !== null && Number.isFinite(s.id));
  }

  return parsed.data
    .map((raw) => normalizeSample(raw))
    .filter((s) => Number.isFinite(s.id));
}

export const SAMPLES: readonly Sample[] = Object.freeze(loadSamples());

export function computeStats(samples: readonly Sample[]): SampleStats {
  const paesi = new Set<string>();
  const continenti = new Set<string>();
  const tipologie = new Set<string>();
  for (const s of samples) {
    paesi.add(s.paese);
    continenti.add(s.continente);
    tipologie.add(s.tipologia);
  }
  return {
    totale: samples.length,
    paesi: paesi.size,
    continenti: continenti.size,
    tipologie: tipologie.size,
  };
}

export function getSampleById(id: number | string): Sample | undefined {
  const numeric = typeof id === "string" ? parseInt(id, 10) : id;
  if (!Number.isFinite(numeric)) return undefined;
  return SAMPLES.find((s) => s.id === numeric);
}