import { useEffect, useRef, useState } from "react";
import { Search, Loader2, X } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { fmtNum, toBnDigits } from "@/i18n/strings";
import { ensureData, lookupTin, normalizeTin, type LookupResult } from "@/lib/tinLookup";

// Convert any supported numeral system (Bengali, Arabic-Indic, full-width) to ASCII digits.
function toAsciiDigits(s: string): string {
  return s.replace(/[\u0660-\u0669\u06F0-\u06F9\u09E6-\u09EF\uFF10-\uFF19]/g, (ch) => {
    const code = ch.charCodeAt(0);
    if (code >= 0x0660 && code <= 0x0669) return String(code - 0x0660);
    if (code >= 0x06F0 && code <= 0x06F9) return String(code - 0x06F0);
    if (code >= 0x09E6 && code <= 0x09EF) return String(code - 0x09E6);
    if (code >= 0xFF10 && code <= 0xFF19) return String(code - 0xFF10);
    return ch;
  });
}

type State =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "found"; result: LookupResult }
  | { kind: "notfound"; tin: string }
  | { kind: "error"; msg: string };

function formatTinDisplay(s: string) {
  const c = s.replace(/\D/g, "").slice(0, 12);
  const parts = [c.slice(0, 3), c.slice(3, 6), c.slice(6, 12)].filter(Boolean);
  return parts.join(" ");
}

export function SearchPanel() {
  const { lang, t } = useLang();
  const [value, setValue] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    void ensureData();
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const clean = normalizeTin(value);
    if (!clean) {
      setState({ kind: "error", msg: t.invalidTin });
      return;
    }
    setState({ kind: "loading" });
    try {
      const r = await lookupTin(clean);
      if (r) setState({ kind: "found", result: r });
      else setState({ kind: "notfound", tin: clean });
    } catch {
      setState({ kind: "error", msg: t.invalidTin });
    }
  }

  function clear() {
    setValue("");
    setState({ kind: "idle" });
    inputRef.current?.focus();
  }

  const displayTin = (tin: string) => (lang === "bn" ? toBnDigits(tin) : tin);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={onSubmit} className="relative">
        <label className="block text-sm font-semibold mb-2 text-foreground/90">
          {t.searchLabel}
        </label>
        <div className="relative group">
          <div className="absolute inset-0 bg-hero rounded-2xl blur-xl opacity-30 group-focus-within:opacity-50 transition" />
          <div className="relative flex items-stretch bg-card border border-border rounded-2xl shadow-card overflow-hidden focus-within:ring-2 focus-within:ring-ring transition">
            <div className="pl-5 flex items-center text-muted-foreground">
              <Search className="w-5 h-5" />
            </div>
            <input
              ref={inputRef}
              inputMode="numeric"
              autoComplete="off"
              value={formatTinDisplay(value)}
              onChange={(e) => setValue(toAsciiDigits(e.target.value).replace(/\D/g, "").slice(0, 12))}
              onPaste={(e) => {
                e.preventDefault();
                const pasted = e.clipboardData.getData("text");
                setValue(toAsciiDigits(pasted).replace(/\D/g, "").slice(0, 12));
              }}
              placeholder={t.searchPlaceholder}
              className="flex-1 bg-transparent px-4 py-5 text-lg md:text-xl font-mono tracking-wide outline-none placeholder:text-muted-foreground/60"
              aria-label={t.searchLabel}
            />
            {value && (
              <button
                type="button"
                onClick={clear}
                className="px-3 text-muted-foreground hover:text-foreground transition"
                aria-label={t.clearBtn}
              >
                <X className="w-5 h-5" />
              </button>
            )}
            <button
              type="submit"
              disabled={state.kind === "loading"}
              className="bg-hero text-primary-foreground px-6 md:px-8 font-semibold flex items-center gap-2 hover:opacity-95 active:scale-[0.98] transition disabled:opacity-70"
            >
              {state.kind === "loading" ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
              <span className="hidden sm:inline">{t.searchBtn}</span>
            </button>
          </div>
        </div>
      </form>

      {state.kind === "error" && (
        <div className="mt-4 p-4 rounded-xl bg-destructive/10 text-destructive text-sm font-medium animate-fade-up">
          {state.msg}
        </div>
      )}

      {state.kind === "found" && (
        <div className="mt-6 animate-fade-up rounded-2xl bg-card border-2 border-success/40 shadow-elegant overflow-hidden">
          <div className="bg-success/10 px-5 py-4 border-b border-success/20 flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-success flex items-center justify-center text-success-foreground font-bold shrink-0 animate-pulse-ring">
              ✓
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-success">{t.foundTitle}</h3>
              <p className="text-sm text-muted-foreground mt-0.5">{t.foundDesc}</p>
            </div>
          </div>
          <dl className="p-5 grid sm:grid-cols-2 gap-4">
            <Field label={t.fields.tin} value={displayTin(state.result.tin)} mono />
            <Field
              label={t.fields.year}
              value={lang === "bn" ? toBnDigits(state.result.year) : state.result.year}
            />
            <Field label={t.fields.zone} value={state.result.zone} wide />
            <Field label={t.fields.circle} value={state.result.circle} />
            <Field label={t.fields.submission_type} value={state.result.submission_type} />
          </dl>
        </div>
      )}

      {state.kind === "notfound" && (
        <div className="mt-6 animate-fade-up rounded-2xl bg-card border border-border shadow-card overflow-hidden">
          <div className="bg-muted px-5 py-4 border-b border-border flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-muted-foreground/20 flex items-center justify-center text-muted-foreground font-bold shrink-0">
              —
            </div>
            <div>
              <h3 className="font-display font-bold text-lg">{t.notFoundTitle}</h3>
              <p className="text-sm text-muted-foreground mt-0.5">{t.notFoundDesc}</p>
            </div>
          </div>
          <div className="p-5">
            <Field label={t.fields.tin} value={displayTin(state.tin)} mono />
          </div>
        </div>
      )}

      <p className="text-center text-xs text-muted-foreground mt-6">
        {t.privacy} · {fmtNum(72341, lang)} {t.stats.total.toLowerCase()}
      </p>
    </div>
  );
}

function Field({
  label,
  value,
  mono,
  wide,
}: {
  label: string;
  value: string;
  mono?: boolean;
  wide?: boolean;
}) {
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <dt className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
        {label}
      </dt>
      <dd className={`mt-1 font-semibold text-foreground ${mono ? "font-mono tracking-wide" : ""}`}>
        {value}
      </dd>
    </div>
  );
}
