import { createFileRoute } from "@tanstack/react-router";
import { SampleDetailPage } from "@/pages/SampleDetailPage";
import { getSampleById } from "@/data/samples";

export const Route = createFileRoute("/campioni/$id")({
  component: SampleDetailPage,
  head: ({ params }) => {
    const sample = getSampleById(params.id);
    const title = sample
      ? `${sample.nome} — Museo delle Sabbie`
      : "Campione — Museo delle Sabbie";
    const description = sample
      ? `Sabbia ${sample.tipologia.toLowerCase()} da ${sample.paese}. Provenienza: ${sample.provenienza}.`
      : "Scheda campione del Museo delle Sabbie.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        ...(sample?.immagine
          ? [{ property: "og:image", content: sample.immagine }]
          : []),
      ],
    };
  },
});