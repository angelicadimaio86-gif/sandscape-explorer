import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SampleFilters } from "@/hooks/useFilteredSamples";

interface Props {
  filters: SampleFilters;
  onChange: (filters: SampleFilters) => void;
  continenti: readonly string[];
  tipologie: readonly string[];
  paesi: readonly string[];
}

function toggle(arr: string[], value: string): string[] {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

function MultiSelect({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: readonly string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const count = selected.length;
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={cn(
          "flex w-full items-center justify-between gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:border-primary/50",
          count > 0 && "border-primary/60 bg-primary/5 text-primary",
        )}
      >
        <span>
          {label}
          {count > 0 && (
            <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-semibold text-primary-foreground">
              {count}
            </span>
          )}
        </span>
        <ChevronDown
          size={16}
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Chiudi menu"
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setOpen(false)}
          />
          <ul
            role="listbox"
            aria-label={label}
            aria-multiselectable="true"
            className="absolute left-0 top-full z-20 mt-2 max-h-72 w-72 max-w-[80vw] overflow-y-auto rounded-xl border border-border bg-popover p-1 shadow-lg"
          >
            {options.map((opt) => {
              const isSelected = selected.includes(opt);
              return (
                <li key={opt}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => onToggle(opt)}
                    className={cn(
                      "flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-secondary",
                      isSelected && "bg-primary/10 text-primary",
                    )}
                  >
                    <span>{opt}</span>
                    {isSelected && <span aria-hidden>✓</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

export function FilterBar({
  filters,
  onChange,
  continenti,
  tipologie,
  paesi,
}: Props) {
  const hasFilters =
    filters.continenti.length +
      filters.tipologie.length +
      filters.paesi.length +
      (filters.search.length > 0 ? 1 : 0) >
    0;

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <MultiSelect
          label="Continenti"
          options={continenti}
          selected={filters.continenti}
          onToggle={(v) =>
            onChange({ ...filters, continenti: toggle(filters.continenti, v) })
          }
        />
        <MultiSelect
          label="Tipologie"
          options={tipologie}
          selected={filters.tipologie}
          onToggle={(v) =>
            onChange({ ...filters, tipologie: toggle(filters.tipologie, v) })
          }
        />
        <MultiSelect
          label="Paesi"
          options={paesi}
          selected={filters.paesi}
          onToggle={(v) =>
            onChange({ ...filters, paesi: toggle(filters.paesi, v) })
          }
        />
      </div>

      {hasFilters && (
        <div className="flex flex-wrap items-center gap-2">
          {filters.continenti.map((c) => (
            <Chip
              key={`c-${c}`}
              label={c}
              onRemove={() =>
                onChange({
                  ...filters,
                  continenti: filters.continenti.filter((x) => x !== c),
                })
              }
            />
          ))}
          {filters.tipologie.map((t) => (
            <Chip
              key={`t-${t}`}
              label={t}
              onRemove={() =>
                onChange({
                  ...filters,
                  tipologie: filters.tipologie.filter((x) => x !== t),
                })
              }
            />
          ))}
          {filters.paesi.map((p) => (
            <Chip
              key={`p-${p}`}
              label={p}
              onRemove={() =>
                onChange({
                  ...filters,
                  paesi: filters.paesi.filter((x) => x !== p),
                })
              }
            />
          ))}
          <button
            type="button"
            onClick={() =>
              onChange({ search: "", continenti: [], tipologie: [], paesi: [] })
            }
            className="ml-auto rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground hover:bg-secondary"
          >
            Reset filtri
          </button>
        </div>
      )}
    </div>
  );
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Rimuovi filtro ${label}`}
        className="rounded-full p-0.5 hover:bg-foreground/10"
      >
        <X size={12} />
      </button>
    </span>
  );
}