import { AdminMetricCard } from "@/components/AdminMetricCard";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { mockSubmissions } from "@/lib/mock/admin";

const reviewFilters = ["All", "Emergency", "Urgent", "Routine", "Education", "Next-Day", "1-Week", "30-Day"];

const categoryLabels = {
  emergency: "Emergency",
  urgent: "Urgent",
  routine: "Routine",
  education: "Education"
} as const;

const statusStyles = {
  New: "border-teal/20 bg-sky text-navy",
  Reviewed: "border-slate-200 bg-clinical text-slate-700",
  Closed: "border-emerald-200 bg-emerald-50 text-emerald-900"
} as const;

export default function AdminPage() {
  const metrics = [
    ["Emergency flags", mockSubmissions.filter((item) => item.category === "emergency").length],
    ["Same-day EP", mockSubmissions.filter((item) => item.category === "urgent").length],
    ["Routine review", mockSubmissions.filter((item) => item.category === "routine").length],
    ["Education only", mockSubmissions.filter((item) => item.category === "education").length]
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader eyebrow="Clinician Review Queue placeholder" title="AF ablation recovery review dashboard" description="Mock clinician dashboard structure for future authenticated review. Real auth and persistence are not active in this MVP scaffold." />
      <div className="mb-6 rounded-lg border border-teal/20 bg-sky/60 p-4 text-sm leading-6 text-navy shadow-sm">
        Demo/mock dashboard only. This queue is not monitored and does not contain real patient data.
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map(([label, value]) => <AdminMetricCard key={label} label={String(label)} value={value} />)}
      </div>
      <section className="mt-6 rounded-lg border border-slate-200/80 bg-white/95 p-5 shadow-card">
        <h2 className="text-lg font-semibold tracking-tight text-navy">Filters</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {reviewFilters.map((filter) => <span key={filter} className="rounded-full border border-slate-200 bg-clinical px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm">{filter}</span>)}
        </div>
      </section>
      <section className="mt-6 overflow-hidden rounded-lg border border-slate-200/80 bg-white/95 shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left text-sm">
            <thead className="bg-clinical text-xs uppercase tracking-wide text-slate-500">
              <tr>
                {["Patient initials", "AF ablation date", "Access site", "Submission type", "Triage category", "Main symptom/concern", "Submitted date", "Status"].map((heading) => <th key={heading} className="px-5 py-4 font-semibold">{heading}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockSubmissions.map((submission) => (
                <tr key={`${submission.initials}-${submission.submittedDate}`} className="align-top transition hover:bg-clinical/70">
                  <td className="px-5 py-5 font-semibold text-navy">{submission.initials}</td>
                  <td className="px-5 py-5 text-slate-600">{submission.ablationDate}</td>
                  <td className="px-5 py-5 text-slate-600">{submission.accessSite}</td>
                  <td className="px-5 py-5 text-slate-600">{submission.type}</td>
                  <td className="px-5 py-5"><StatusBadge category={submission.category} label={categoryLabels[submission.category]} /></td>
                  <td className="max-w-xs px-5 py-5 leading-6 text-slate-600">{submission.concern}</td>
                  <td className="px-5 py-5 text-slate-600">{submission.submittedDate}</td>
                  <td className="px-5 py-5"><span className={`rounded-full border px-3 py-1.5 text-xs font-semibold shadow-sm ${statusStyles[submission.status]}`}>{submission.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
