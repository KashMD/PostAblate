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
    <section className="rounded-lg border border-slate-200/80 bg-white/95 p-5 shadow-card">
      <div className="flex flex-wrap items-center gap-3">
        <StatusBadge category={result.category} label={result.label} />
        <p className="text-sm font-medium text-slate-500">Protocol-driven result</p>
      </div>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-navy">{result.label}</h2>
      <p className="mt-2 text-slate-700">{result.explanation}</p>
      <div className="mt-4 rounded-lg border border-slate-200 bg-clinical p-4 text-sm leading-6 text-slate-700">
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
        className="mt-5 inline-flex min-h-11 items-center rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-navy/20"
      >
        {actionLabel}
      </a>
      <p className="mt-4 text-xs leading-5 text-slate-500">{result.disclaimer}</p>
      <ClinicianSummaryCard summary={result.clinicianSummary} />
    </section>
  );
}
