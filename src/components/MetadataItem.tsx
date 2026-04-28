import type { ColorPalette } from "@/utils/palettes";
import { FALLBACK_PALETTE } from "@/utils/palettes";

interface Props {
  label: string;
  value: string | null | undefined;
  palette?: ColorPalette;
  bgImage?: string | null;
  emphasized?: boolean;
}

export function MetadataItem({
  label,
  value,
  palette,
  bgImage,
  emphasized,
}: Props) {
  if (!value) return null;
  const p = palette ?? FALLBACK_PALETTE;

  return (
    <div
      className="relative overflow-hidden rounded-2xl border p-4 shadow-sm transition-shadow hover:shadow-[var(--shadow-museum)]"
      style={{
        backgroundColor: p.bg,
        borderColor: p.border,
        color: p.text,
      }}
    >
      {bgImage && (
        <>
          <div
            aria-hidden
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage: `url(${bgImage})`,
              filter: "saturate(0.55) brightness(1.05)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${p.bg}cc 0%, ${p.bg}99 100%)`,
            }}
          />
        </>
      )}
      <div className="relative">
        <div
          className="text-[11px] font-semibold uppercase tracking-[0.14em]"
          style={{ color: p.label }}
        >
          {label}
        </div>
        <div
          className={
            emphasized
              ? "mt-1 font-serif text-2xl font-semibold leading-tight"
              : "mt-1 text-base font-medium tabular-nums"
          }
        >
          {value}
        </div>
      </div>
    </div>
  );
}