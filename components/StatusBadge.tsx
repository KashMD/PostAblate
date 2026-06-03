import { cn } from "@/lib/utils";
import type { TriageCategory } from "@/lib/triage/types";

const styles: Record<TriageCategory, string> = {
  emergency: "bg-red-100 text-red-900 border-red-200",
  urgent: "bg-amber-100 text-amber-950 border-amber-200",
  routine: "bg-blue-100 text-blue-950 border-blue-200",
  education: "bg-emerald-100 text-emerald-950 border-emerald-200"
};

export function StatusBadge({ category, label }: { category: TriageCategory; label?: string }) {
  return <span className={cn("inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold shadow-sm", styles[category])}>{label ?? category}</span>;
}
