export function Footer() {
  return (
    <footer className="mt-16 border-t border-border/70 bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <p className="font-serif">
            Museo Digitale delle Sabbie del Mondo
          </p>
          <p className="text-xs">
            © {new Date().getFullYear()} — Progetto didattico
          </p>
        </div>
      </div>
    </footer>
  );
}