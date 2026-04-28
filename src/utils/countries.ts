/**
 * Mapping Paese (italiano) -> codice ISO 3166-1 alpha-2 e alpha-3.
 *
 * - alpha-2 (`iso2`) viene usato per le bandiere via flagcdn.com (URL CDN).
 * - alpha-3 (`iso3`) viene usato per matchare i paesi nella mappa SVG
 *   mondiale (TopoJSON usa codici alpha-3).
 */

export interface CountryCodes {
  iso2: string;
  iso3: string;
}

const PAESE_CODES: Record<string, CountryCodes> = {
  Algeria: { iso2: "dz", iso3: "DZA" },
  Bahamas: { iso2: "bs", iso3: "BHS" },
  Belgio: { iso2: "be", iso3: "BEL" },
  Belize: { iso2: "bz", iso3: "BLZ" },
  Benin: { iso2: "bj", iso3: "BEN" },
  Brasile: { iso2: "br", iso3: "BRA" },
  Bulgaria: { iso2: "bg", iso3: "BGR" },
  "Capo Verde": { iso2: "cv", iso3: "CPV" },
  Cipro: { iso2: "cy", iso3: "CYP" },
  "Costa Rica": { iso2: "cr", iso3: "CRI" },
  Croazia: { iso2: "hr", iso3: "HRV" },
  Cuba: { iso2: "cu", iso3: "CUB" },
  Danimarca: { iso2: "dk", iso3: "DNK" },
  Ecuador: { iso2: "ec", iso3: "ECU" },
  Egitto: { iso2: "eg", iso3: "EGY" },
  "Emirati Arabi Uniti": { iso2: "ae", iso3: "ARE" },
  Estonia: { iso2: "ee", iso3: "EST" },
  Filippine: { iso2: "ph", iso3: "PHL" },
  Francia: { iso2: "fr", iso3: "FRA" },
  Giordania: { iso2: "jo", iso3: "JOR" },
  Grecia: { iso2: "gr", iso3: "GRC" },
  India: { iso2: "in", iso3: "IND" },
  Indonesia: { iso2: "id", iso3: "IDN" },
  Irlanda: { iso2: "ie", iso3: "IRL" },
  Islanda: { iso2: "is", iso3: "ISL" },
  Israele: { iso2: "il", iso3: "ISR" },
  Italia: { iso2: "it", iso3: "ITA" },
  Kenya: { iso2: "ke", iso3: "KEN" },
  Libano: { iso2: "lb", iso3: "LBN" },
  Libia: { iso2: "ly", iso3: "LBY" },
  Lituania: { iso2: "lt", iso3: "LTU" },
  Madagascar: { iso2: "mg", iso3: "MDG" },
  Maldive: { iso2: "mv", iso3: "MDV" },
  Malesia: { iso2: "my", iso3: "MYS" },
  Malta: { iso2: "mt", iso3: "MLT" },
  Marocco: { iso2: "ma", iso3: "MAR" },
  Mauritius: { iso2: "mu", iso3: "MUS" },
  Messico: { iso2: "mx", iso3: "MEX" },
  Myanmar: { iso2: "mm", iso3: "MMR" },
  Namibia: { iso2: "na", iso3: "NAM" },
  Nigeria: { iso2: "ng", iso3: "NGA" },
  Norvegia: { iso2: "no", iso3: "NOR" },
  "Paesi Bassi": { iso2: "nl", iso3: "NLD" },
  Pakistan: { iso2: "pk", iso3: "PAK" },
  Perù: { iso2: "pe", iso3: "PER" },
  Polonia: { iso2: "pl", iso3: "POL" },
  Portogallo: { iso2: "pt", iso3: "PRT" },
  "Regno Unito": { iso2: "gb", iso3: "GBR" },
  "Repubblica Dominicana": { iso2: "do", iso3: "DOM" },
  Romania: { iso2: "ro", iso3: "ROU" },
  Senegal: { iso2: "sn", iso3: "SEN" },
  Siria: { iso2: "sy", iso3: "SYR" },
  Slovenia: { iso2: "si", iso3: "SVN" },
  Spagna: { iso2: "es", iso3: "ESP" },
  "Sri Lanka": { iso2: "lk", iso3: "LKA" },
  Sudafrica: { iso2: "za", iso3: "ZAF" },
  "Stati Uniti": { iso2: "us", iso3: "USA" },
  Svezia: { iso2: "se", iso3: "SWE" },
  Tanzania: { iso2: "tz", iso3: "TZA" },
  Thailandia: { iso2: "th", iso3: "THA" },
  Tunisia: { iso2: "tn", iso3: "TUN" },
  Turchia: { iso2: "tr", iso3: "TUR" },
  Ungheria: { iso2: "hu", iso3: "HUN" },
  Uzbekistan: { iso2: "uz", iso3: "UZB" },
  Venezuela: { iso2: "ve", iso3: "VEN" },
  Vietnam: { iso2: "vn", iso3: "VNM" },
  Yemen: { iso2: "ye", iso3: "YEM" },
};

export function getCountryCodes(paese: string): CountryCodes | null {
  return PAESE_CODES[paese] ?? null;
}

export function getFlagUrl(paese: string, size: 80 | 160 | 320 = 160): string | null {
  const codes = getCountryCodes(paese);
  if (!codes) return null;
  return `https://flagcdn.com/w${size}/${codes.iso2}.png`;
}

export function getIso3(paese: string): string | null {
  return getCountryCodes(paese)?.iso3 ?? null;
}

/** Mappa inversa: ISO3 -> nome paese italiano (per la mappa SVG). */
export const ISO3_TO_PAESE: Readonly<Record<string, string>> = Object.freeze(
  Object.fromEntries(
    Object.entries(PAESE_CODES).map(([nome, codes]) => [codes.iso3, nome]),
  ),
);