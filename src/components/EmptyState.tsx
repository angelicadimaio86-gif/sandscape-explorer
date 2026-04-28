interface Props {
  title?: string;
  message?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  title = "Nessun risultato",
  message = "Prova a modificare i filtri o la ricerca.",
  action,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card/40 p-10 text-center">
      <div aria-hidden className="text-4xl">🏝️</div>
      <h3 className="font-serif text-xl font-semibold text-foreground">
        {title}
      </h3>
      <p className="max-w-md text-sm text-muted-foreground">{message}</p>
      {action}
    </div>
  );
}