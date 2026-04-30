import { useLang } from "@/hooks/useLang";
import { ExternalLink } from "lucide-react";

export function Footer() {
  const { t } = useLang();
  const links = [
    { href: "https://nbr.gov.bd/", label: t.nbrSite },
    {
      href: "https://nbr.gov.bd/uploads/public-notice/Press_Release-_Risk_Based_Audit_Selection.pdf",
      label: t.pressRelease,
    },
    {
      href: "https://nbr.gov.bd/uploads/news-scroller/AUDIT_SELECTION_2023-24.xlsx",
      label: t.excelFile,
    },
  ];
  return (
    <footer className="mt-20 border-t border-border/60 bg-card/40">
      <div className="container mx-auto px-4 py-10 grid gap-6 md:grid-cols-3">
        <div>
          <div className="font-display font-bold text-lg">{t.siteTitle}</div>
          <p className="text-sm text-muted-foreground mt-2 max-w-xs">{t.footerNote}</p>
          <p className="text-xs text-muted-foreground mt-3">{t.privacy}</p>
        </div>
        <div>
          <div className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">
            {t.sources}
          </div>
          <ul className="space-y-2 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-primary transition"
                >
                  {l.label} <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-warning/15 text-warning-foreground text-xs font-semibold">
            {t.unofficial}
          </div>
          <p className="text-xs text-muted-foreground mt-3">{t.lastUpdated}</p>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} · {t.siteTitle}
      </div>
    </footer>
  );
}
