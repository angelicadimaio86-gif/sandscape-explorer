/**
 * Palette museali per Tipologia / Continente / Paese.
 *
 * Tonalità desaturate, ispirate a sabbia, mare, archivio museale.
 * Riportate dalla logica di `public/dettaglio.js` (versione raffinata).
 */

export interface ColorPalette {
  bg: string;
  border: string;
  text: string;
  label: string;
}

export const FALLBACK_PALETTE: ColorPalette = {
  bg: "#F4EDE2",
  border: "#CBB79E",
  text: "#4C4035",
  label: "#7A6850",
};

export const TIPOLOGIA_PALETTE: Record<string, ColorPalette> = {
  Cava: { bg: "#EAEFE0", border: "#B8C29B", text: "#4D5836", label: "#6E7A52" },
  Desertica: { bg: "#F5E6CB", border: "#D4B583", text: "#5C4524", label: "#8A6B3A" },
  "Eolica - Desertica": { bg: "#F2DCBF", border: "#C99B6C", text: "#5A3D20", label: "#8A5E36" },
  Fluviale: { bg: "#E5E0D5", border: "#A89B85", text: "#4A4135", label: "#6E6450" },
  Lacustre: { bg: "#DDE6E8", border: "#9CB1B6", text: "#34464B", label: "#56676C" },
  Lagunare: { bg: "#D8E3DF", border: "#8FA8A0", text: "#324640", label: "#54675F" },
  Marina: { bg: "#D4E0E4", border: "#8AA1A8", text: "#2E4248", label: "#506068" },
  "Marina - Fluviale": { bg: "#D9E1DD", border: "#94A89F", text: "#36443D", label: "#586860" },
  "Marina - Vulcanica": { bg: "#D6D2DC", border: "#998FA8", text: "#3C334A", label: "#5C5170" },
  Montagna: { bg: "#E6D8C6", border: "#B89779", text: "#4D3823", label: "#7A5A3E" },
  "Non specificata": { bg: "#EEE7DA", border: "#BFB199", text: "#4A4135", label: "#766B58" },
  Torrentizia: { bg: "#D8DFE3", border: "#94A6AE", text: "#36444B", label: "#586A72" },
  Vulcanica: { bg: "#D9D1CB", border: "#7A6A5E", text: "#332A24", label: "#5A4A3E" },
  Altro: FALLBACK_PALETTE,
};

export const CONTINENTE_PALETTE: Record<string, ColorPalette> = {
  Africa: { bg: "#F2DCBF", border: "#C99B6C", text: "#5A3D20", label: "#8A5E36" },
  "America Centrale": { bg: "#EBE2D0", border: "#BFA77E", text: "#4D3F25", label: "#7A6643" },
  Asia: { bg: "#E8DCD2", border: "#B89A85", text: "#4A352A", label: "#7A5C49" },
  Europa: { bg: "#DDE6E8", border: "#9CB1B6", text: "#34464B", label: "#56676C" },
  "Nord America": { bg: "#E2E5DB", border: "#A6AC95", text: "#3F4435", label: "#666B56" },
  Oceania: { bg: "#D4E0E4", border: "#8AA1A8", text: "#2E4248", label: "#506068" },
  "Sud America": { bg: "#E5DCC4", border: "#B5A06D", text: "#4F3F1F", label: "#7A6638" },
  "Non specificato": FALLBACK_PALETTE,
};

export function getTipologiaPalette(tipologia: string): ColorPalette {
  return TIPOLOGIA_PALETTE[tipologia] ?? FALLBACK_PALETTE;
}

export function getContinentePalette(continente: string): ColorPalette {
  return CONTINENTE_PALETTE[continente] ?? FALLBACK_PALETTE;
}