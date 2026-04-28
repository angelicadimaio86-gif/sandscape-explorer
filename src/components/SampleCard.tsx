import { Link } from "@tanstack/react-router";
import type { Sample } from "@/types/sample";
import { safeImageSrc } from "@/utils/image";
import { getFlagUrl } from "@/utils/countries";
import { getTipologiaPalette } from "@/utils/palettes";

interface Props {
  sample: Sample;
}

export function SampleCard({ sample }: Props) {
  const palette = getTipologiaPalette(sample.tipologia);
  const flag = getFlagUrl(sample.paese, 80);

  return (
    <Link
      to="/campioni/$id"
      params={{ id: String(sample.id) }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-museum)] focus-visible:-translate-y-0.5 focus-visible:shadow-[var(--shadow-museum)]"
      aria-label={`Apri scheda di ${sample.nome}, ${sample.paese}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={safeImageSrc(sample.immagine)}
          alt={`Sabbia di ${sample.nome}, ${sample.paese}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className="absolute left-3 top-3 rounded-full border px-3 py-1 text-xs font-medium shadow-sm"
          style={{
            background: palette.bg,
            borderColor: palette.border,
            color: palette.text,
          }}
        >
          {sample.tipologia}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <div className="flex items-center gap-2">
          {flag && (
            <img
              src={flag}
              alt=""
              aria-hidden
              loading="lazy"
              className="h-3.5 w-5 flex-shrink-0 rounded-sm object-cover ring-1 ring-border/60"
            />
          )}
          <span className="truncate text-xs uppercase tracking-wider text-muted-foreground">
            {sample.paese} · {sample.continente}
          </span>
        </div>
        <h3 className="line-clamp-2 font-serif text-lg font-semibold leading-tight text-foreground">
          {sample.nome}
        </h3>
        {sample.anno && (
          <span className="mt-auto pt-2 text-xs text-muted-foreground tabular-nums">
            {sample.anno}
          </span>
        )}
      </div>
    </Link>
  );
}