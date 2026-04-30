import { createFileRoute } from "@tanstack/react-router";
import { SearchPanel } from "@/components/SearchPanel";
import { Disclaimer } from "@/components/Disclaimer";
import { useLang } from "@/hooks/useLang";
import { fmtNum } from "@/i18n/strings";
import { ShieldCheck, Database, Zap } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { lang, t } = useLang();
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero opacity-[0.08] dark:opacity-[0.18]" />
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />

        <div className="relative container mx-auto px-4 pt-12 pb-16 md:pt-20 md:pb-24">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <Disclaimer />
            <h1 className="mt-5 font-display font-extrabold text-3xl md:text-5xl lg:text-6xl text-balance leading-tight">
              {t.heroTitle}
            </h1>
            <p className="mt-5 text-base md:text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
              {t.heroSubtitle}
            </p>
          </div>

          <SearchPanel />

          {/* Stats */}
          <div className="mt-14 grid grid-cols-3 gap-3 md:gap-6 max-w-3xl mx-auto">
            {[
              { v: fmtNum(72341, lang), l: t.stats.total, icon: Database },
              { v: lang === "bn" ? "২য়" : "2nd", l: t.stats.phase, icon: Zap },
              { v: lang === "bn" ? "২০২৩-২৪" : "2023-24", l: t.stats.year, icon: ShieldCheck },
            ].map((s, i) => (
              <div
                key={i}
                className="rounded-2xl bg-card border border-border p-4 md:p-6 shadow-card text-center"
              >
                <s.icon className="w-5 h-5 mx-auto text-primary mb-2" />
                <div className="font-display font-bold text-xl md:text-3xl text-foreground">
                  {s.v}
                </div>
                <div className="text-[11px] md:text-xs uppercase tracking-wider text-muted-foreground mt-1">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
