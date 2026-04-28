import { Link } from "@tanstack/react-router";

export function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl font-semibold text-foreground">
        Il progetto
      </h1>
      <p className="mt-4 text-base leading-relaxed text-foreground/90">
        Il <strong>Museo Digitale delle Sabbie del Mondo</strong> è una
        collezione didattica che raccoglie campioni di sabbia da continenti,
        paesi e ambienti diversi. Ogni campione è documentato con immagini
        macro e al microscopio, dati geografici e tipologici.
      </p>
      <p className="mt-4 text-base leading-relaxed text-foreground/90">
        L'obiettivo è raccontare in modo accessibile la varietà geologica
        della Terra: sabbie vulcaniche, marine, fluviali, eoliche e desertiche
        che mostrano colori, granulometrie e composizioni mineralogiche
        sorprendentemente diverse.
      </p>

      <h2 className="mt-10 font-serif text-2xl font-semibold text-foreground">
        Come è organizzato
      </h2>
      <ul className="mt-3 list-disc space-y-2 pl-6 text-foreground/90">
        <li>
          <Link to="/galleria" className="text-primary hover:underline">
            Galleria
          </Link>{" "}
          — tutti i campioni con ricerca, filtri multi-select e ordinamento.
        </li>
        <li>
          <Link to="/mappa" className="text-primary hover:underline">
            Mappa
          </Link>{" "}
          — distribuzione geografica per paese.
        </li>
        <li>
          Scheda dettaglio — immagini, dati museali e QR code per condivisione.
        </li>
      </ul>

      <h2 className="mt-10 font-serif text-2xl font-semibold text-foreground">
        Tecnologie
      </h2>
      <p className="mt-3 text-foreground/90">
        React 19, TypeScript, TanStack Router, Tailwind CSS v4, Zod per la
        validazione del dataset, react-simple-maps per la mappa.
      </p>
    </div>
  );
}