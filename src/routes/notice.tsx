import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/hooks/useLang";
import { ExternalLink, FileText, FileSpreadsheet } from "lucide-react";
import { Disclaimer } from "@/components/Disclaimer";

export const Route = createFileRoute("/notice")({
  head: () => ({
    meta: [
      { title: "Official Notice · NBR Audit Selection 2023-24" },
      {
        name: "description",
        content:
          "Read the official NBR press release about the automated Risk-Based Audit Selection of 72,341 income-tax returns for assessment year 2023-24.",
      },
      { property: "og:title", content: "Official NBR Press Release · Audit Selection 2023-24" },
      {
        property: "og:description",
        content: "NBR press release on the 2nd-phase automated audit selection.",
      },
    ],
  }),
  component: NoticePage,
});

const PDF_URL =
  "https://nbr.gov.bd/uploads/public-notice/Press_Release-_Risk_Based_Audit_Selection.pdf";
const XLSX_URL =
  "https://nbr.gov.bd/uploads/news-scroller/AUDIT_SELECTION_2023-24.xlsx";

function NoticePage() {
  const { t } = useLang();
  return (
    <div className="container mx-auto px-4 py-10 md:py-16 max-w-4xl">
      <Disclaimer />
      <h1 className="mt-4 font-display font-extrabold text-3xl md:text-4xl">{t.noticeTitle}</h1>
      <p className="mt-3 text-muted-foreground text-balance">{t.noticeDesc}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={PDF_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-hero text-primary-foreground font-semibold shadow-elegant hover:opacity-95 transition"
        >
          <FileText className="w-4 h-4" /> {t.openPdf}
          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
        </a>
        <a
          href={XLSX_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-card border border-border font-semibold hover:bg-muted transition"
        >
          <FileSpreadsheet className="w-4 h-4 text-primary" /> {t.openExcel}
          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
        </a>
      </div>

      <div className="mt-8 rounded-2xl overflow-hidden border border-border shadow-card bg-card">
        <iframe
          title="NBR Press Release PDF"
          src={PDF_URL}
          className="w-full h-[70vh] min-h-[520px]"
        />
      </div>
    </div>
  );
}
