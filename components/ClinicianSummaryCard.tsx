"use client";

export function ClinicianSummaryCard({ summary }: { summary: string }) {
  return (
    <details className="mt-5 rounded-lg border border-slate-200 bg-white/95 p-4">
      <summary className="cursor-pointer text-sm font-semibold text-navy">Structured clinician summary</summary>
      <pre className="mt-4 max-h-80 overflow-auto whitespace-pre-wrap rounded-lg bg-slate-950 p-4 text-xs leading-5 text-slate-100">{summary}</pre>
    </details>
  );
}
