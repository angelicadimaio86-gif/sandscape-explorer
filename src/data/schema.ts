/**
 * Schema Zod per validare il dataset Museo delle Sabbie.
 *
 * - Lo schema grezzo (`rawSampleSchema`) è tollerante: rispetta il JSON così
 *   com'è (campi opzionali/nullable, anno come stringa o numero).
 * - Lo schema normalizzato (`sampleSchema`) descrive l'output di
 *   `normalizeSample()` e viene usato come check di sicurezza.
 */

import { z } from "zod";

export const rawSampleSchema = z.object({
  id: z.union([z.number(), z.string()]),
  nome: z.string().nullable().optional(),
  provenienza: z.string().nullable().optional(),
  provincia: z.string().nullable().optional(),
  isola: z.string().nullable().optional(),
  regione: z.string().nullable().optional(),
  bacino: z.string().nullable().optional(),
  paese: z.string().nullable().optional(),
  continente: z.string().nullable().optional(),
  tipologia: z.string().nullable().optional(),
  anno: z.union([z.string(), z.number()]).nullable().optional(),
  descrizione: z.string().nullable().optional(),
  immagine: z.string().nullable().optional(),
  microscopio: z.string().nullable().optional(),
  qrcode: z.string().nullable().optional(),
  immagini_extra: z.array(z.string()).nullable().optional(),
});

export const rawDatasetSchema = z.array(rawSampleSchema);

export const sampleSchema = z.object({
  id: z.number().int().positive(),
  nome: z.string().min(1),
  provenienza: z.string().min(1),
  provincia: z.string().nullable(),
  isola: z.string().nullable(),
  regione: z.string().nullable(),
  bacino: z.string().nullable(),
  paese: z.string().min(1),
  continente: z.string().min(1),
  tipologia: z.string().min(1),
  anno: z.string().nullable(),
  descrizione: z.string().nullable(),
  immagine: z.string().nullable(),
  microscopio: z.string().nullable(),
  qrcode: z.string().nullable(),
  immaginiExtra: z.array(z.string()),
  original: z.object({
    paese: z.string().nullable(),
    continente: z.string().nullable(),
    tipologia: z.string().nullable(),
  }),
});

export type RawSampleInput = z.infer<typeof rawSampleSchema>;