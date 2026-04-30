import { Link } from "@tanstack/react-router";
import { useLang } from "@/hooks/useLang";
import { ShieldCheck } from "lucide-react";

export function Header() {
  const { lang, setLang, t } = useLang();
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-hero flex items-center justify-center shadow-glow group-hover:scale-105 transition">
            <ShieldCheck className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="leading-tight">
            <div className="font-display font-bold text-base">{t.siteTitle}</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground hidden sm:block">
              {t.siteTagline}
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {[
            { to: "/", label: t.nav.home },
            { to: "/notice", label: t.nav.notice },
            { to: "/about", label: t.nav.about },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3 py-2 rounded-lg hover:bg-muted transition"
              activeProps={{ className: "px-3 py-2 rounded-lg bg-muted text-primary" }}
              activeOptions={{ exact: true }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 p-1 rounded-full bg-muted text-xs font-semibold">
          <button
            onClick={() => setLang("bn")}
            className={`px-3 py-1.5 rounded-full transition ${
              lang === "bn" ? "bg-background shadow-sm text-primary" : "text-muted-foreground"
            }`}
          >
            বাং
          </button>
          <button
            onClick={() => setLang("en")}
            className={`px-3 py-1.5 rounded-full transition ${
              lang === "en" ? "bg-background shadow-sm text-primary" : "text-muted-foreground"
            }`}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
}
