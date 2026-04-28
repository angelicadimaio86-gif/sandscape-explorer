import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/pages/HomePage";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Museo Digitale delle Sabbie del Mondo" },
      {
        name: "description",
        content:
          "Una collezione di 856 campioni di sabbia da tutto il mondo, organizzati per paese, continente e tipologia.",
      },
      { property: "og:title", content: "Museo Digitale delle Sabbie del Mondo" },
      {
        property: "og:description",
        content: "Esplora la collezione: galleria, mappa interattiva, schede dettagliate.",
      },
    ],
  }),
});