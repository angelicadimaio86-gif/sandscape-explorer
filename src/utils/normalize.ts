/**
 * Utility di normalizzazione del dataset.
 *
 * Regole:
 * - Non modifichiamo MAI il significato scientifico dei dati.
 * - Correggiamo solo capitalizzazione, alias di paesi, e piccoli formati di
 *   tipologia (es. "Eolica-Desertica" -> "Eolica - Desertica").
 * - Manteniamo sempre il valore originale in `Sample.original`.
 */

import type {
  Continente,
  RawSample,
  Sample,
  Tipologia,
} from "@/types/sample";

const CONTINENTI_VALIDI: readonly Continente[] = [
  "Africa",
  "America Centrale",
  "Asia",
  "Europa",
  "Nord America",
  "Oceania",
  "Sud America",
  "Non specificato",
] as const;

const TIPOLOGIE_VALIDE: readonly Tipologia[] = [
  "Altro",
  "Cava",
  "Desertica",
  "Eolica - Desertica",
  "Fluviale",
  "Lacustre",
  "Lagunare",
  "Marina",
  "Marina - Fluviale",
  "Marina - Vulcanica",
  "Montagna",
  "Non specificata",
  "Torrentizia",
  "Vulcanica",
] as const;

/** Capitalizzazione "title case" semplice, rispettando parole brevi. */
function titleCase(value: string): string {
  return value
    .toLowerCase()
    .split(" ")
    .map((w) => (w.length === 0 ? w : w[0].toUpperCase() + w.slice(1)))
    .join(" ");
}

function trimOrNull(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const t = value.trim();
  return t.length === 0 ? null : t;
}

/* -------------------------------------------------------------------------- */
/* Paesi                                                                       */
/* -------------------------------------------------------------------------- */

const PAESE_ALIAS: Record<string, string> = {
  USA: "Stati Uniti",
  "U.S.A.": "Stati Uniti",
  "Stati Uniti d'America": "Stati Uniti",
  Kenia: "Kenya",
  "Rep. delle Maldive": "Maldive",
  "Rep. di Capo Verde": "Capo Verde",
  "Rep. di Mauritius": "Mauritius",
  "Repubblica Dominicana": "Repubblica Dominicana",
  "Emirati Arabi": "Emirati Arabi Uniti",
};

export function normalizeCountry(raw: string | null | undefined): string {
  const cleaned = trimOrNull(raw);
  if (!cleaned) return "Non specificato";
  if (PAESE_ALIAS[cleaned]) return PAESE_ALIAS[cleaned];
  // Caso insensibile alla maiuscola
  const found = Object.keys(PAESE_ALIAS).find(
    (k) => k.toLowerCase() === cleaned.toLowerCase(),
  );
  if (found) return PAESE_ALIAS[found];
  return cleaned;
}

/* -------------------------------------------------------------------------- */
/* Continenti                                                                  */
/* -------------------------------------------------------------------------- */

const CONTINENTE_ALIAS: Record<string, Continente> = {
  africa: "Africa",
  "america centrale": "America Centrale",
  "centro america": "America Centrale",
  asia: "Asia",
  europa: "Europa",
  "nord america": "Nord America",
  "north america": "Nord America",
  oceania: "Oceania",
  "sud america": "Sud America",
  "south america": "Sud America",
  "non specificato": "Non specificato",
};

export function normalizeContinent(
  raw: string | null | undefined,
): Continente {
  const cleaned = trimOrNull(raw);
  if (!cleaned) return "Non specificato";
  const key = cleaned.toLowerCase();
  if (CONTINENTE_ALIAS[key]) return CONTINENTE_ALIAS[key];
  // Tentativo di match diretto
  const direct = CONTINENTI_VALIDI.find(
    (c) => c.toLowerCase() === key,
  );
  return direct ?? "Non specificato";
}

/* -------------------------------------------------------------------------- */
/* Tipologie                                                                   */
/* -------------------------------------------------------------------------- */

const TIPOLOGIA_ALIAS: Record<string, Tipologia> = {
  altro: "Altro",
  cava: "Cava",
  desertica: "Desertica",
  "eolica desertica": "Eolica - Desertica",
  "eolica-desertica": "Eolica - Desertica",
  "eolica - desertica": "Eolica - Desertica",
  fluviale: "Fluviale",
  lacustre: "Lacustre",
  lagunare: "Lagunare",
  marina: "Marina",
  "marina fluviale": "Marina - Fluviale",
  "marina-fluviale": "Marina - Fluviale",
  "marina - fluviale": "Marina - Fluviale",
  "marina vulcanica": "Marina - Vulcanica",
  "marina/vulcanica": "Marina - Vulcanica",
  "marina-vulcanica": "Marina - Vulcanica",
  "marina - vulcanica": "Marina - Vulcanica",
  montagna: "Montagna",
  montana: "Montagna",
  "non specificata": "Non specificata",
  torrentizia: "Torrentizia",
  vulcanica: "Vulcanica",
};

export function normalizeTypology(
  raw: string | null | undefined,
): Tipologia {
  const cleaned = trimOrNull(raw);
  if (!cleaned) return "Non specificata";
  const key = cleaned.toLowerCase().replace(/\s+/g, " ").trim();
  if (TIPOLOGIA_ALIAS[key]) return TIPOLOGIA_ALIAS[key];
  // Heuristica: title case + match
  const tc = titleCase(cleaned) as Tipologia;
  return TIPOLOGIE_VALIDE.includes(tc) ? tc : "Altro";
}

/* -------------------------------------------------------------------------- */
/* Sample                                                                      */
/* -------------------------------------------------------------------------- */

function normalizeId(raw: RawSample["id"]): number {
  if (typeof raw === "number" && Number.isFinite(raw)) return raw;
  if (typeof raw === "string") {
    const n = parseInt(raw, 10);
    if (Number.isFinite(n)) return n;
  }
  return Number.NaN;
}

function normalizeAnno(raw: RawSample["anno"]): string | null {
  if (raw == null) return null;
  const s = String(raw).trim();
  return s.length === 0 ? null : s;
}

function normalizeImagePath(
  raw: string | null | undefined,
): string | null {
  const cleaned = trimOrNull(raw);
  if (!cleaned) return null;
  // Garantisce path assoluto a /images/...
  if (cleaned.startsWith("http://") || cleaned.startsWith("https://"))
    return cleaned;
  if (cleaned.startsWith("/")) return cleaned;
  return `/${cleaned}`;
}

export function normalizeSample(raw: RawSample): Sample {
  const id = normalizeId(raw.id);
  const nome = trimOrNull(raw.nome) ?? "Campione senza nome";
  const provenienza = trimOrNull(raw.provenienza) ?? nome;
  const paese = normalizeCountry(raw.paese);
  const continente = normalizeContinent(raw.continente);
  const tipologia = normalizeTypology(raw.tipologia);

  return {
    id,
    nome,
    provenienza,
    provincia: trimOrNull(raw.provincia),
    isola: trimOrNull(raw.isola),
    regione: trimOrNull(raw.regione),
    bacino: trimOrNull(raw.bacino),
    paese,
    continente,
    tipologia,
    anno: normalizeAnno(raw.anno),
    descrizione: trimOrNull(raw.descrizione),
    immagine: normalizeImagePath(raw.immagine),
    microscopio: normalizeImagePath(raw.microscopio),
    qrcode: normalizeImagePath(raw.qrcode),
    immaginiExtra: Array.isArray(raw.immagini_extra)
      ? raw.immagini_extra
          .map((p) => normalizeImagePath(p))
          .filter((p): p is string => p !== null)
      : [],
    original: {
      paese: trimOrNull(raw.paese),
      continente: trimOrNull(raw.continente),
      tipologia: trimOrNull(raw.tipologia),
    },
  };
}

export { CONTINENTI_VALIDI, TIPOLOGIE_VALIDE };