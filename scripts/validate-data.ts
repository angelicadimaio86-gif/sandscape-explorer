/**
 * Validazione dataset Museo delle Sabbie.
 * Esegui con: bun run scripts/validate-data.ts
 */
import dati from "../src/data/dati.json";
import { rawDatasetSchema } from "../src/data/schema";
import { normalizeSample } from "../src/utils/normalize";

const result = rawDatasetSchema.safeParse(dati);
if (!result.success) {
  console.error("❌ Schema invalido:");
  for (const issue of result.error.issues.slice(0, 20)) {
    console.error(` - ${issue.path.join(".")}: ${issue.message}`);
  }
  process.exit(1);
}

const ids = new Set<number>();
const dups: number[] = [];
let invalidId = 0;
for (const raw of result.data) {
  const s = normalizeSample(raw);
  if (!Number.isFinite(s.id)) { invalidId++; continue; }
  if (ids.has(s.id)) dups.push(s.id);
  else ids.add(s.id);
}

if (invalidId > 0) console.error(`❌ ${invalidId} campioni con id non valido`);
if (dups.length > 0) console.error(`❌ ID duplicati: ${dups.join(", ")}`);
if (invalidId > 0 || dups.length > 0) process.exit(1);

console.log(`✅ Dataset valido: ${result.data.length} campioni, ${ids.size} ID univoci.`);