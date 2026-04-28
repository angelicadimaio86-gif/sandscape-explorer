import { createFileRoute } from "@tanstack/react-router";
import { GalleryPage } from "@/pages/GalleryPage";

export const Route = createFileRoute("/galleria")({
  component: GalleryPage,
  head: () => ({
    meta: [
      { title: "Galleria — Museo delle Sabbie" },
      { name: "description", content: "Esplora, filtra e ordina i campioni della collezione." },
      { property: "og:title", content: "Galleria — Museo delle Sabbie" },
      { property: "og:description", content: "Ricerca multi-filtro fra centinaia di campioni di sabbia." },
    ],
  }),
});