/**
 * Tipi del dominio Museo delle Sabbie.
 *
 * - `RawSample`: struttura grezza così come arriva dal JSON. Tutti i campi
 *   secondari sono opzionali / nullable per essere tolleranti con il dataset.
 * - `Sample`: campione normalizzato che usiamo nell'app. Mantiene anche le
 *   versioni originali dei campi normalizzati per tracciabilità.
 */

export interface RawSample {
  id: number | string;
  nome?: string | null;
  provenienza?: string | null;
  provincia?: string | null;
  isola?: string | null;
  regione?: string | null;
  bacino?: string | null;
  paese?: string | null;
  continente?: string | null;
  tipologia?: string | null;
  anno?: string | number | null;
  descrizione?: string | null;
  immagine?: string | null;
  microscopio?: string | null;
  qrcode?: string | null;
  immagini_extra?: string[] | null;
}

export type Continente =
  | "Africa"
  | "America Centrale"
  | "Asia"
  | "Europa"
  | "Nord America"
  | "Oceania"
  | "Sud America"
  | "Non specificato";

export type Tipologia =
  | "Altro"
  | "Cava"
  | "Desertica"
  | "Eolica - Desertica"
  | "Fluviale"
  | "Lacustre"
  | "Lagunare"
  | "Marina"
  | "Marina - Fluviale"
  | "Marina - Vulcanica"
  | "Montagna"
  | "Non specificata"
  | "Torrentizia"
  | "Vulcanica";

export interface Sample {
  id: number;
  nome: string;
  provenienza: string;
  provincia: string | null;
  isola: string | null;
  regione: string | null;
  bacino: string | null;
  paese: string;
  continente: Continente;
  tipologia: Tipologia;
  anno: string | null;
  descrizione: string | null;
  immagine: string | null;
  microscopio: string | null;
  qrcode: string | null;
  immaginiExtra: string[];

  /** Valori originali per tracciabilità — mai modificare il dato scientifico. */
  original: {
    paese: string | null;
    continente: string | null;
    tipologia: string | null;
  };
}

export interface SampleStats {
  totale: number;
  paesi: number;
  continenti: number;
  tipologie: number;
}