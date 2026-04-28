import { useSamples } from "@/hooks/useSamples";
import { MapView } from "@/components/MapView";

export function MapPage() {
  const { samples, stats } = useSamples();
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-6">
        <h1 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">
          Mappa del mondo
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {stats.paesi} paesi rappresentati nella collezione. Clicca un paese
          evidenziato per vedere i campioni.
        </p>
      </header>
      <MapView samples={samples} />
    </div>
  );
}