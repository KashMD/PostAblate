import { AdminMetricCard } from "@/components/AdminMetricCard";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { mockSubmissions } from "@/lib/mock/admin";

const filters = ["Emergency now", "Same-day EP flags", "Routine nurse review", "Education-only encounters", "Next-day safety checks", "1-week recovery checks", "30-day recovery follow-ups", "Access-site concerns", "Rhythm symptoms", "Medication concerns"];

export default function AdminPage() {
  const metrics = [
    ["Total patients", 42],
    ["New triage submissions", 8],
    ["Emergency flags", mockSubmissions.filter((item) => item.category === "emergency").length],
    ["Same-day EP flags", mockSubmissions.filter((item) => item.category === "urgent").length],
    ["Next-day safety checks", mockSubmissions.filter((item) => item.type === "Next-Day Safety Check").length],
    ["1-week recovery checks", mockSubmissions.filter((item) => item.type === "1-Week Recovery Check").length],
    ["30-day recovery follow-ups", mockSubmissions.filter((item) => item.type === "30-Day Recovery Follow-Up").length],
    ["Routine nurse review", mockSubmissions.filter((item) => item.category === "routine").length],
    ["Education-only encounters", mockSubmissions.filter((item) => item.category === "education").length]
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader eyebrow="Clinician Review Queue placeholder" title="AF ablation recovery review dashboard" description="Mock clinician dashboard structure for future authenticated review. Real auth and persistence are not active in this MVP scaffold." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map(([label, value]) => <AdminMetricCard key={label} label={String(label)} value={value} />)}
      </div>
      <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
        <h2 className="text-lg font-semibold text-navy">Filters</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {filters.map((filter) => <span key={filter} className="rounded-full border border-slate-200 bg-clinical px-3 py-1 text-xs font-semibold text-slate-600">{filter}</span>)}
        </div>
      </section>
      <section className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left text-sm">
            <thead className="bg-clinical text-xs uppercase tracking-wide text-slate-500">
              <tr>
                {["Patient initials", "AF ablation date", "Access site", "Submission type", "Triage category", "Main symptom/concern", "Submitted date", "Status"].map((heading) => <th key={heading} className="px-4 py-3 font-semibold">{heading}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockSubmissions.map((submission) => (
                <tr key={`${submission.initials}-${submission.submittedDate}`} className="align-top">
                  <td className="px-4 py-4 font-semibold text-navy">{submission.initials}</td>
                  <td className="px-4 py-4 text-slate-600">{submission.ablationDate}</td>
                  <td className="px-4 py-4 text-slate-600">{submission.accessSite}</td>
                  <td className="px-4 py-4 text-slate-600">{submission.type}</td>
                  <td className="px-4 py-4"><StatusBadge category={submission.category} /></td>
                  <td className="px-4 py-4 text-slate-600">{submission.concern}</td>
                  <td className="px-4 py-4 text-slate-600">{submission.submittedDate}</td>
                  <td className="px-4 py-4 text-slate-600">{submission.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
