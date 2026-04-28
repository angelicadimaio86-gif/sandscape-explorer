import type { SampleStats } from "@/types/sample";

interface Props {
  stats: SampleStats;
}

const ITEMS: ReadonlyArray<{
  key: keyof SampleStats;
  label: string;
  emoji: string;
}> = [
  { key: "totale", label: "Campioni", emoji: "🧪" },
  { key: "paesi", label: "Paesi", emoji: "🌍" },
  { key: "continenti", label: "Continenti", emoji: "🗺️" },
  { key: "tipologie", label: "Tipologie", emoji: "🏷️" },
];

export function StatsCards({ stats }: Props) {
  return (
    <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {ITEMS.map((item) => (
        <div
          key={item.key}
          className="flex flex-col items-start gap-1 rounded-2xl border border-border bg-card p-4 shadow-sm"
        >
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
            <span aria-hidden>{item.emoji}</span>
            <dt>{item.label}</dt>
          </div>
          <dd className="font-serif text-3xl font-semibold tabular-nums text-foreground">
            {stats[item.key]}
          </dd>
        </div>
      ))}
    </dl>
  );
}