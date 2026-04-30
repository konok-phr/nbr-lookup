import tinsUrl from "@/data/tins.bin?url";
import detailsUrl from "@/data/details.bin?url";
import metaUrl from "@/data/meta.json?url";

export type MetaEntry = { zone: string; circle: string; submission_type: string };
export type LookupResult = MetaEntry & { tin: string; year: string };

type DataBundle = {
  tins: BigUint64Array;
  details: Uint16Array;
  meta: MetaEntry[];
  year: string;
  count: number;
};

let bundlePromise: Promise<DataBundle> | null = null;

async function loadBundle(): Promise<DataBundle> {
  const [tinsRes, detailsRes, metaRes] = await Promise.all([
    fetch(tinsUrl),
    fetch(detailsUrl),
    fetch(metaUrl),
  ]);
  if (!tinsRes.ok || !detailsRes.ok || !metaRes.ok) {
    throw new Error("Failed to load audit data");
  }
  const [tinsBuf, detailsBuf, metaJson] = await Promise.all([
    tinsRes.arrayBuffer(),
    detailsRes.arrayBuffer(),
    metaRes.json() as Promise<{ year: string; count: number; meta: MetaEntry[] }>,
  ]);
  return {
    tins: new BigUint64Array(tinsBuf),
    details: new Uint16Array(detailsBuf),
    meta: metaJson.meta,
    year: metaJson.year,
    count: metaJson.count,
  };
}

export function ensureData(): Promise<DataBundle> {
  if (!bundlePromise) bundlePromise = loadBundle();
  return bundlePromise;
}

export async function lookupTin(tin: string): Promise<LookupResult | null> {
  const clean = tin.replace(/\D/g, "");
  if (clean.length !== 12) return null;
  const target = BigInt(clean);
  const data = await ensureData();
  const arr = data.tins;
  let lo = 0;
  let hi = arr.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    const v = arr[mid];
    if (v === target) {
      const m = data.meta[data.details[mid]];
      return { tin: clean, year: data.year, ...m };
    }
    if (v < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return null;
}
