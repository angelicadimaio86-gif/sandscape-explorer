import { Link, useParams } from "@tanstack/react-router";
import { QRCodeSVG } from "qrcode.react";
import { getSampleById } from "@/data/samples";
import { safeImageSrc } from "@/utils/image";
import { getFlagUrl } from "@/utils/countries";
import {
  getContinentePalette,
  getTipologiaPalette,
  FALLBACK_PALETTE,
} from "@/utils/palettes";
import { MetadataItem } from "@/components/MetadataItem";
import { EmptyState } from "@/components/EmptyState";

const SEA_BG = "/images/bg-sea.jpg";

export function SampleDetailPage() {
  const { id } = useParams({ from: "/campioni/$id" });
  const sample = getSampleById(id);

  if (!sample) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <EmptyState
          title="Campione non trovato"
          message={`Nessun campione con id "${id}" nella collezione.`}
          action={
            <Link
              to="/galleria"
              className="mt-2 inline-flex rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Torna alla galleria
            </Link>
          }
        />
      </div>
    );
  }

  const tipologiaPalette = getTipologiaPalette(sample.tipologia);
  const continentePalette = getContinentePalette(sample.continente);
  const flagUrl = getFlagUrl(sample.paese, 320);

  // URL pubblico per QR code
  const publicUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/campioni/${sample.id}`
      : `/campioni/${sample.id}`;

  return (
    <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        to="/galleria"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        ← Torna alla galleria
      </Link>

      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Campione N° {sample.id}
        </p>
        <h1 className="mt-2 font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
          {sample.nome}
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          {sample.paese} · {sample.continente}
        </p>
      </header>

      {/* IMMAGINI */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <figure className="overflow-hidden rounded-2xl border border-border bg-muted shadow-sm">
          <img
            src={safeImageSrc(sample.immagine)}
            alt={`Sabbia di ${sample.nome}`}
            className="aspect-[4/3] w-full object-cover"
          />
          <figcaption className="bg-card px-4 py-2 text-xs text-muted-foreground">
            Macro del campione
          </figcaption>
        </figure>

        {sample.microscopio && (
          <figure className="overflow-hidden rounded-2xl border border-border bg-muted shadow-sm">
            <img
              src={safeImageSrc(sample.microscopio)}
              alt={`Vista al microscopio di ${sample.nome}`}
              className="aspect-[4/3] w-full object-cover"
            />
            <figcaption className="bg-card px-4 py-2 text-xs text-muted-foreground">
              Vista al microscopio
            </figcaption>
          </figure>
        )}
      </div>

      {/* METADATI */}
      <section
        aria-labelledby="meta-heading"
        className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        <h2 id="meta-heading" className="sr-only">
          Dati del campione
        </h2>

        <MetadataItem
          label="Provenienza"
          value={sample.provenienza}
          emphasized
        />
        <MetadataItem
          label="Paese"
          value={sample.paese}
          palette={continentePalette}
          bgImage={flagUrl}
          emphasized
        />
        <MetadataItem
          label="Continente"
          value={sample.continente}
          palette={continentePalette}
        />
        <MetadataItem
          label="Tipologia"
          value={sample.tipologia}
          palette={tipologiaPalette}
        />
        <MetadataItem
          label="Bacino / Mare"
          value={sample.bacino}
          bgImage={SEA_BG}
          palette={{ ...FALLBACK_PALETTE, bg: "#DDE6E8", border: "#9CB1B6", text: "#34464B", label: "#56676C" }}
        />
        <MetadataItem label="Anno" value={sample.anno} />
        <MetadataItem label="Regione" value={sample.regione} />
        <MetadataItem label="Provincia" value={sample.provincia} />
        <MetadataItem label="Isola" value={sample.isola} />
      </section>

      {/* DESCRIZIONE */}
      {sample.descrizione && (
        <section className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-3 font-serif text-xl font-semibold text-foreground">
            Descrizione
          </h2>
          <p className="text-base leading-relaxed text-foreground/90">
            {sample.descrizione}
          </p>
        </section>
      )}

      {/* QR CODE */}
      <section className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 shadow-sm sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">
          <h2 className="font-serif text-xl font-semibold text-foreground">
            Condividi questo campione
          </h2>
          <p className="text-sm text-muted-foreground">
            Scansiona il QR code per aprire questa scheda da un altro
            dispositivo.
          </p>
        </div>
        <div className="rounded-xl bg-white p-3 shadow">
          <QRCodeSVG
            value={publicUrl}
            size={120}
            level="M"
            aria-label={`QR code per ${sample.nome}`}
          />
        </div>
      </section>
    </article>
  );
}