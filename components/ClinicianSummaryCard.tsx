"use client";

export function ClinicianSummaryCard({ summary }: { summary: string }) {
  return (
    <details className="mt-5 rounded-lg border border-slate-200 bg-white p-4">
      <summary className="cursor-pointer text-sm font-semibold text-navy">Structured clinician summary</summary>
      <pre className="mt-4 whitespace-pre-wrap rounded-lg bg-slate-950 p-4 text-xs leading-5 text-slate-100">{summary}</pre>
    </details>
  );
}
