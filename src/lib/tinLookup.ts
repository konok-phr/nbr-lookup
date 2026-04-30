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

/**
 * Normalize a user-entered TIN to a canonical 12-digit ASCII string.
 * Handles:
 *  - Leading/trailing whitespace
 *  - Spaces, dashes, dots, underscores, parentheses, slashes between digits
 *  - Bengali digits (০-৯) and Arabic-Indic digits (٠-٩ / ۰-۹)
 *  - Full-width digits (０-９)
 *  - Stray non-digit characters
 *  - Leading zeros: if 1-12 digits remain, left-pad with zeros to 12.
 *    Returns null if more than 12 digits or zero digits remain.
 */
export function normalizeTin(input: string): string | null {
  if (!input) return null;
  // Map non-ASCII numerals to ASCII
  const mapped = input.replace(/[\u0660-\u0669\u06F0-\u06F9\u09E6-\u09EF\uFF10-\uFF19]/g, (ch) => {
    const code = ch.charCodeAt(0);
    if (code >= 0x0660 && code <= 0x0669) return String(code - 0x0660); // Arabic-Indic
    if (code >= 0x06F0 && code <= 0x06F9) return String(code - 0x06F0); // Extended Arabic-Indic
    if (code >= 0x09E6 && code <= 0x09EF) return String(code - 0x09E6); // Bengali
    if (code >= 0xFF10 && code <= 0xFF19) return String(code - 0xFF10); // Full-width
    return ch;
  });
  const digits = mapped.replace(/\D/g, "");
  if (digits.length === 0 || digits.length > 12) return null;
  return digits.padStart(12, "0");
}

export async function lookupTin(tin: string): Promise<LookupResult | null> {
  const clean = normalizeTin(tin);
  if (!clean) return null;
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
