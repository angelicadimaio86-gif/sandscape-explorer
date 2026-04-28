import { useMemo, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import type { Sample } from "@/types/sample";
import { ISO3_TO_PAESE, getIso3 } from "@/utils/countries";
import { Link } from "@tanstack/react-router";
import { safeImageSrc } from "@/utils/image";

/** Topojson world atlas (countries) — caricato via CDN, ~120 KB. */
const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface Props {
  samples: readonly Sample[];
}

export function MapView({ samples }: Props) {
  const [selectedPaese, setSelectedPaese] = useState<string | null>(null);

  /** Map paese -> conteggio campioni e iso3 set per evidenziazione. */
  const { byPaese, iso3Set } = useMemo(() => {
    const byPaese = new Map<string, Sample[]>();
    const iso3Set = new Set<string>();
    for (const s of samples) {
      const arr = byPaese.get(s.paese) ?? [];
      arr.push(s);
      byPaese.set(s.paese, arr);
      const iso3 = getIso3(s.paese);
      if (iso3) iso3Set.add(iso3);
    }
    return { byPaese, iso3Set };
  }, [samples]);

  const selectedSamples = selectedPaese ? byPaese.get(selectedPaese) ?? [] : [];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
      <div className="overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-sm">
        <ComposableMap
          projectionConfig={{ scale: 155 }}
          width={900}
          height={500}
          className="h-auto w-full"
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                // world-atlas usa numeric id; serve mapping numerico -> iso3.
                // Lazy hack: react-simple-maps espone properties.name (en)
                // ma per noi basta l'id numerico ISO. Usiamo properties.name.
                const name = (geo.properties as { name?: string }).name ?? "";
                // Match approssimativo: se il paese è in iso3Set tramite mapping rovescio.
                // Per robustezza confrontiamo per iso3 derivato dall'id numerico se possibile.
                const iso3 = numericToIso3(geo.id as string | number);
                const paeseIt = iso3 ? ISO3_TO_PAESE[iso3] : undefined;
                const isPresent = paeseIt
                  ? iso3Set.has(iso3 ?? "")
                  : false;
                const isSelected =
                  selectedPaese && paeseIt === selectedPaese;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => {
                      if (paeseIt && isPresent) setSelectedPaese(paeseIt);
                    }}
                    style={{
                      default: {
                        fill: isSelected
                          ? "var(--sea-mid)"
                          : isPresent
                            ? "var(--sand-400)"
                            : "var(--sand-100)",
                        stroke: "var(--sand-200)",
                        strokeWidth: 0.5,
                        outline: "none",
                        cursor: isPresent ? "pointer" : "default",
                        transition: "fill 200ms",
                      },
                      hover: {
                        fill: isPresent
                          ? "var(--sea-mid)"
                          : "var(--sand-100)",
                        outline: "none",
                      },
                      pressed: {
                        fill: "var(--sea-deep)",
                        outline: "none",
                      },
                    }}
                    aria-label={
                      paeseIt
                        ? `${paeseIt}${isPresent ? ` — ${byPaese.get(paeseIt)?.length ?? 0} campioni` : ""}`
                        : name
                    }
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>

        <div className="flex flex-wrap items-center gap-4 px-3 pb-2 text-xs text-muted-foreground">
          <Legend color="var(--sand-100)" label="Nessun campione" />
          <Legend color="var(--sand-400)" label="Paese presente" />
          <Legend color="var(--sea-mid)" label="Selezionato" />
        </div>
      </div>

      <aside className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
        {selectedPaese ? (
          <>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-foreground">
                {selectedPaese}
              </h2>
              <p className="text-sm text-muted-foreground">
                {selectedSamples.length} campion
                {selectedSamples.length === 1 ? "e" : "i"} ·{" "}
                {[...new Set(selectedSamples.map((s) => s.continente))].join(
                  ", ",
                )}
              </p>
            </div>

            <ul className="grid max-h-[60vh] grid-cols-2 gap-3 overflow-y-auto pr-1">
              {selectedSamples.slice(0, 12).map((s) => (
                <li key={s.id}>
                  <Link
                    to="/campioni/$id"
                    params={{ id: String(s.id) }}
                    className="group block overflow-hidden rounded-lg border border-border bg-background"
                  >
                    <img
                      src={safeImageSrc(s.immagine)}
                      alt={s.nome}
                      loading="lazy"
                      className="aspect-square w-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="px-2 py-1.5 text-xs">
                      <div className="truncate font-medium text-foreground">
                        {s.nome}
                      </div>
                      <div className="truncate text-muted-foreground">
                        {s.tipologia}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => setSelectedPaese(null)}
              className="mt-auto rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary"
            >
              Deseleziona paese
            </button>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground">
            <div aria-hidden className="text-3xl">🗺️</div>
            <p>
              Clicca su un paese evidenziato della mappa per vedere i campioni
              collegati.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        aria-hidden
        className="inline-block h-3 w-3 rounded-sm border border-border"
        style={{ backgroundColor: color }}
      />
      <span>{label}</span>
    </div>
  );
}

/**
 * world-atlas usa ID numerici ISO 3166-1 numeric.
 * Mapping per i paesi presenti nel nostro dataset.
 */
const NUMERIC_TO_ISO3: Record<string, string> = {
  "012": "DZA", "044": "BHS", "056": "BEL", "084": "BLZ", "204": "BEN",
  "076": "BRA", "100": "BGR", "132": "CPV", "196": "CYP", "188": "CRI",
  "191": "HRV", "192": "CUB", "208": "DNK", "218": "ECU", "818": "EGY",
  "784": "ARE", "233": "EST", "608": "PHL", "250": "FRA", "400": "JOR",
  "300": "GRC", "356": "IND", "360": "IDN", "372": "IRL", "352": "ISL",
  "376": "ISR", "380": "ITA", "404": "KEN", "422": "LBN", "434": "LBY",
  "440": "LTU", "450": "MDG", "462": "MDV", "458": "MYS", "470": "MLT",
  "504": "MAR", "480": "MUS", "484": "MEX", "104": "MMR", "516": "NAM",
  "566": "NGA", "578": "NOR", "528": "NLD", "586": "PAK", "604": "PER",
  "616": "POL", "620": "PRT", "826": "GBR", "214": "DOM", "642": "ROU",
  "686": "SEN", "760": "SYR", "705": "SVN", "724": "ESP", "144": "LKA",
  "710": "ZAF", "840": "USA", "752": "SWE", "834": "TZA", "764": "THA",
  "788": "TUN", "792": "TUR", "348": "HUN", "860": "UZB", "862": "VEN",
  "704": "VNM", "887": "YEM",
};

function numericToIso3(id: string | number | null | undefined): string | null {
  if (id == null) return null;
  const key = String(id).padStart(3, "0");
  return NUMERIC_TO_ISO3[key] ?? null;
}