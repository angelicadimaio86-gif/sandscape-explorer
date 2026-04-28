import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/galleria", label: "Galleria" },
  { to: "/mappa", label: "Mappa" },
  { to: "/about", label: "Progetto" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="group flex items-center gap-3"
          aria-label="Museo delle Sabbie - Home"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/40 ring-1 ring-border transition-transform group-hover:scale-105">
            <span aria-hidden className="text-lg">🏛️</span>
          </div>
          <div className="leading-tight">
            <div className="font-serif text-base font-semibold text-foreground sm:text-lg">
              Museo delle Sabbie
            </div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              del Mondo
            </div>
          </div>
        </Link>

        <nav aria-label="Navigazione principale" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active =
                link.to === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.to);
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground/80 hover:bg-secondary hover:text-foreground",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:bg-secondary md:hidden"
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav
          aria-label="Navigazione mobile"
          className="border-t border-border/70 bg-background md:hidden"
        >
          <ul className="flex flex-col gap-1 px-4 py-3">
            {NAV_LINKS.map((link) => {
              const active =
                link.to === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.to);
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm font-medium",
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-secondary",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}