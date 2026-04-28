# Sandscape Explorer — Museo Digitale delle Sabbie del Mondo

Collezione didattica di **856 campioni di sabbia** da tutto il mondo, con galleria filtrabile, mappa interattiva e schede dettagliate.

## Funzionalità

- 🏛️ Home con statistiche e campioni in evidenza
- 🖼️ Galleria con ricerca + filtri multi-select (continenti, paesi, tipologie) e ordinamento
- 🗺️ Mappa SVG mondiale con paesi cliccabili e pannello laterale
- 📋 Scheda dettaglio con palette per tipologia, bandiera del paese, sfondo marino, QR code
- ✅ Dataset validato con Zod + normalizzazione (paesi, continenti, tipologie)

## Tecnologie

React 19 · TypeScript · TanStack Router · Tailwind CSS v4 · Zod · react-simple-maps · qrcode.react

## Struttura

```
src/
  components/   # Header, Footer, SampleCard, FilterBar, MapView, ...
  pages/        # HomePage, GalleryPage, MapPage, SampleDetailPage, AboutPage
  routes/       # File-based routing TanStack
  data/         # dati.json + schema Zod + loader
  hooks/        # useSamples, useFilteredSamples
  utils/        # normalize, countries, palettes, image
  types/        # Sample, Continente, Tipologia
scripts/
  validate-data.ts
```

## Comandi

```bash
bun install
bun run dev            # avvia in locale
bun run build          # build produzione
bun run preview        # preview build
bun run validate:data  # valida dataset (Zod + ID univoci)
bun run lint
bun run format
```

## Obiettivi didattici

Mostrare la varietà geologica della Terra (sabbie vulcaniche, marine, fluviali, eoliche, desertiche) attraverso una collezione organizzata e accessibile.

## Sviluppi futuri

- Coordinate precise per marker geografici puntuali
- Confronto fianco-a-fianco tra campioni
- Filtro per granulometria e composizione mineralogica
- Export PDF della scheda campione