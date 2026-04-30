import { AlertCircle } from "lucide-react";
import { useLang } from "@/hooks/useLang";

export function Disclaimer() {
  const { t } = useLang();
  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-warning/15 text-warning-foreground border border-warning/30 text-xs font-semibold">
      <AlertCircle className="w-3.5 h-3.5" />
      {t.unofficial}
    </div>
  );
}
