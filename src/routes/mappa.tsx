import { createFileRoute } from "@tanstack/react-router";
import { MapPage } from "@/pages/MapPage";

export const Route = createFileRoute("/mappa")({
  component: MapPage,
  head: () => ({
    meta: [
      { title: "Mappa — Museo delle Sabbie" },
      { name: "description", content: "Distribuzione geografica dei campioni nel mondo." },
      { property: "og:title", content: "Mappa — Museo delle Sabbie" },
      { property: "og:description", content: "Mappa mondiale interattiva dei paesi rappresentati nella collezione." },
    ],
  }),
});