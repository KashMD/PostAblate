"use client";

import type { TriageResult } from "@/lib/triage/types";
import { StatusBadge } from "./StatusBadge";
import { ClinicianSummaryCard } from "./ClinicianSummaryCard";

export function TriageResultCard({ result }: { result: TriageResult }) {
  const actionLabel =
    result.category === "emergency"
      ? "Call 911 or seek emergency care now"
      : result.category === "urgent"
        ? "Contact your EP team today"
        : result.category === "routine"
          ? "Submit for nurse review"
          : "Read recovery education";

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <div className="flex flex-wrap items-center gap-3">
        <StatusBadge category={result.category} label={result.label} />
        <p className="text-sm font-medium text-slate-500">Protocol-driven result</p>
      </div>
      <h2 className="mt-4 text-2xl font-semibold text-navy">{result.label}</h2>
      <p className="mt-2 text-slate-700">{result.explanation}</p>
      <div className="mt-4 rounded-lg bg-clinical p-4 text-sm text-slate-700">
        <p className="font-semibold text-navy">Recommended next step</p>
        <p className="mt-1">{result.recommendedAction}</p>
      </div>
      <div className="mt-4">
        <p className="text-sm font-semibold text-navy">Why this category appeared</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
          {result.matchedCriteria.map((criterion) => (
            <li key={criterion}>{criterion}</li>
          ))}
        </ul>
      </div>
      <a
        href={result.category === "education" ? "/education" : "/admin"}
        className="mt-5 inline-flex rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
      >
        {actionLabel}
      </a>
      <p className="mt-4 text-xs leading-5 text-slate-500">{result.disclaimer}</p>
      <ClinicianSummaryCard summary={result.clinicianSummary} />
    </section>
  );
}
