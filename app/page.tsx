import Link from "next/link";
import { EmergencyBanner } from "@/components/EmergencyBanner";
import { RecoveryCard } from "@/components/RecoveryCard";
import { SafetyBanner } from "@/components/SafetyBanner";

const cards = [
  ["Symptom triage", "Answer structured safety questions any time after AF ablation.", "/triage", "urgent"],
  ["One-week recovery check", "Review early safety concerns, access-site healing, rhythm symptoms, and medications.", "/follow-up/one-week", "default"],
  ["One-month follow-up", "Capture rhythm symptoms, healthcare use, recovery trajectory, and patient-reported outcomes.", "/follow-up/one-month", "default"],
  ["AF ablation recovery education", "Read safety-first guidance about common recovery questions.", "/education", "default"],
  ["Clinician review", "Preview a structured review queue with mock AF ablation submissions.", "/admin", "default"]
] as const;

export default function Home() {
  return (
    <div className="bg-[linear-gradient(180deg,#dff3f8_0%,#f5f8fb_58%,#f5f8fb_100%)]">
      <section className="mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-teal">AF ablation recovery MVP</p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-navy sm:text-6xl">PostAblate</h1>
          <p className="mt-4 text-2xl font-medium text-navy">Guided recovery after AF ablation.</p>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">A structured recovery companion for patients after atrial fibrillation ablation.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/triage" className="rounded-lg bg-navy px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-slate-800">
              Start recovery check
            </Link>
            <Link href="/follow-up" className="rounded-lg border border-teal/30 bg-white px-5 py-3 text-sm font-semibold text-teal shadow-sm transition hover:bg-teal hover:text-white">
              Complete follow-up
            </Link>
          </div>
          <div className="mt-8 grid gap-3">
            <EmergencyBanner />
            <SafetyBanner />
          </div>
        </div>
        <div className="rounded-lg border border-white/70 bg-white/85 p-5 shadow-soft">
          <div className="rounded-lg bg-clinical p-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-teal">Protocol first</p>
            <h2 className="mt-2 text-2xl font-semibold text-navy">Conservative recovery support with clinician oversight</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              PostAblate uses fixed safety pathways for AF ablation recovery. Red flags override routine education, and uncertain concerning symptoms escalate.
            </p>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-white p-4">
              <p className="text-3xl font-semibold text-coral">911</p>
              <p className="mt-1 text-sm text-slate-600">Emergency symptoms escalate immediately.</p>
            </div>
            <div className="rounded-lg bg-white p-4">
              <p className="text-3xl font-semibold text-teal">AF-only</p>
              <p className="mt-1 text-sm text-slate-600">The active MVP scope is AF ablation recovery.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cards.map(([title, description, href, tone]) => (
            <RecoveryCard key={href} title={title} description={description} href={href} tone={tone} />
          ))}
        </div>
      </section>
    </div>
  );
}
