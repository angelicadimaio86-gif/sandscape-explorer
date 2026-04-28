import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="max-w-md text-center">
          <h1 className="font-serif text-7xl font-bold text-foreground">404</h1>
          <h2 className="mt-4 font-serif text-xl font-semibold text-foreground">
            Pagina non trovata
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            La pagina cercata non esiste o è stata spostata.
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Torna alla home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Museo Digitale delle Sabbie del Mondo" },
      {
        name: "description",
        content:
          "Esplora 856 campioni di sabbia da tutto il mondo: galleria, mappa interattiva e schede dettagliate.",
      },
      { name: "author", content: "Sandscape Explorer" },
      { property: "og:title", content: "Museo Digitale delle Sabbie del Mondo" },
      {
        property: "og:description",
        content:
          "Una collezione museale di sabbie da continenti, paesi e tipologie diverse.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "it_IT" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
