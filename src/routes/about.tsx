import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/hooks/useLang";
import { Disclaimer } from "@/components/Disclaimer";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About · NBR Audit Lookup (Community Tool)" },
      {
        name: "description",
        content:
          "About this community-built TIN lookup tool for NBR's Risk-Based Audit Selection 2023-24. Not an official NBR website.",
      },
      { property: "og:title", content: "About · NBR Audit Lookup" },
      {
        property: "og:description",
        content: "Why and how this community tool was built.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useLang();
  const sources = [
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
    <div className="container mx-auto px-4 py-10 md:py-16 max-w-3xl">
      <Disclaimer />
      <h1 className="mt-4 font-display font-extrabold text-3xl md:text-4xl">{t.aboutTitle}</h1>
      <p className="mt-4 text-lg text-muted-foreground text-balance">{t.aboutBody}</p>

      <div className="mt-8 rounded-2xl bg-card border border-border p-6 shadow-card">
        <h2 className="font-display font-bold text-xl mb-4">{t.sources}</h2>
        <ul className="space-y-2.5">
          {sources.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-primary hover:underline font-medium"
              >
                {s.label} <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted-foreground">{t.lastUpdated}</p>
        <p className="mt-2 text-sm text-muted-foreground">{t.privacy}</p>
      </div>
    </div>
  );
}
