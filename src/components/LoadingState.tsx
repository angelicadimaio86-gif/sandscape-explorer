export function LoadingState({ label = "Caricamento…" }: { label?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-40 flex-col items-center justify-center gap-3 text-muted-foreground"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-primary" />
      <p className="text-sm">{label}</p>
    </div>
  );
}