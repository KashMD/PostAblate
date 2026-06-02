import { DisclaimerBox } from "@/components/DisclaimerBox";
import { EmergencyBanner } from "@/components/EmergencyBanner";
import { PageHeader } from "@/components/PageHeader";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Safety and scope"
        title="About PostAblate"
        description="PostAblate is a patient-facing, protocol-driven recovery support scaffold for atrial fibrillation ablation only."
      />
      <div className="grid gap-4">
        <EmergencyBanner />
        <DisclaimerBox>
          PostAblate is educational, conservative, and built for clinician oversight. It is not a diagnostic tool, does not replace the electrophysiology team, and does not replace emergency care.
        </DisclaimerBox>
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-navy">What this MVP supports</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">The active pathway supports structured recovery after AF ablation: intake, anytime symptom triage, next-day safety check, 1-week recovery check, 30-day recovery follow-up, education, and clinician review summaries.</p>
        </section>
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-navy">What this MVP does not do</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">It does not diagnose symptoms, rule out complications, change medications, provide open-ended AI advice, or activate pathways for pacemakers, ICD implants, SVT, atrial flutter as a separate pathway, PVC, VT, or general EP recovery.</p>
        </section>
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-navy">Conservative triage philosophy</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">Emergency warning signs always override routine recovery education. Urgent same-day concerns override routine nurse review. When information is incomplete but potentially concerning, the app escalates rather than reassures.</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">AI placeholders are present in environment configuration for future work, but AI is not active in this scaffold.</p>
        </section>
      </div>
    </div>
  );
}
