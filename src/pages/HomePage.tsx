import { Link } from "@tanstack/react-router";
import { useSamples } from "@/hooks/useSamples";
import { StatsCards } from "@/components/StatsCards";
import { SampleCard } from "@/components/SampleCard";

export function HomePage() {
  const { samples, stats } = useSamples();
  const featured = samples.slice(0, 4);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div
          aria-hidden
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, var(--accent), transparent 60%), radial-gradient(ellipse at 70% 80%, var(--sea-mid), transparent 65%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Collezione didattica
          </p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            Museo Digitale delle Sabbie del Mondo
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Una collezione di {stats.totale} campioni di sabbia provenienti da{" "}
            {stats.paesi} paesi e {stats.continenti} continenti, organizzati in{" "}
            {stats.tipologie} tipologie geologiche.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/galleria"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
            >
              Esplora la galleria →
            </Link>
            <Link
              to="/mappa"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary"
            >
              Apri la mappa
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section
        aria-labelledby="stats-heading"
        className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
      >
        <h2 id="stats-heading" className="sr-only">
          Statistiche della collezione
        </h2>
        <StatsCards stats={stats} />
      </section>

      {/* FEATURED */}
      <section
        aria-labelledby="featured-heading"
        className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8"
      >
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2
              id="featured-heading"
              className="font-serif text-2xl font-semibold text-foreground sm:text-3xl"
            >
              In evidenza
            </h2>
            <p className="text-sm text-muted-foreground">
              Una piccola selezione dalla collezione.
            </p>
          </div>
          <Link
            to="/galleria"
            className="text-sm font-medium text-primary hover:underline"
          >
            Vedi tutti →
          </Link>
        </div>
        <ul
          role="list"
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {featured.map((s) => (
            <li key={s.id} className="contents">
              <SampleCard sample={s} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}