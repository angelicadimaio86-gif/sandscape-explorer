import type { Sample } from "@/types/sample";
import { SampleCard } from "./SampleCard";

interface Props {
  samples: readonly Sample[];
}

export function SampleGrid({ samples }: Props) {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {samples.map((sample) => (
        <li key={sample.id} className="contents">
          <SampleCard sample={sample} />
        </li>
      ))}
    </ul>
  );
}