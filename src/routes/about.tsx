import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/pages/AboutPage";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "Il progetto — Museo delle Sabbie" },
      { name: "description", content: "Origini, finalità e tecnologie del Museo Digitale delle Sabbie." },
      { property: "og:title", content: "Il progetto — Museo delle Sabbie" },
      { property: "og:description", content: "Una collezione didattica di sabbie da tutto il mondo." },
    ],
  }),
});