import Link from "next/link";
import { EmergencyBanner } from "@/components/EmergencyBanner";
import { RecoveryCard } from "@/components/RecoveryCard";
import { SafetyBanner } from "@/components/SafetyBanner";

const cards = [
  ["Conservative Care", "Protocol-driven routing keeps emergency and urgent warning signs in front.", "/about", "urgent"],
  ["Education Library", "Safety-first AF ablation recovery guidance organized for quick scanning.", "/education", "default"],
  ["Clinician Review Queue", "Preview a structured mock queue for clinician-facing review summaries.", "/admin", "default"],
  ["AF-only MVP scope", "PostAblate is focused only on recovery after atrial fibrillation ablation.", "/about", "default"]
] as const;

const heroActions = [
  ["I Have a Symptom", "Any time", "Chest pain, bleeding, shortness of breath, palpitations, or any urgent concern? Start here.", "/triage", "urgent"],
  ["Next-Day Safety Check", "Day 1", "A quick safety review of your access sites, medications, and immediate post-procedure symptoms.", "/follow-up/next-day", "default"],
  ["1-Week Recovery Check", "Day 7", "Review healing progress, rhythm symptoms, activity, fatigue, and medication questions.", "/follow-up/one-week", "default"],
  ["30-Day Follow-Up", "Day 30", "Review your rhythm symptoms, medications, healthcare use, quality of life, and recovery trajectory.", "/follow-up/thirty-day", "default"]
] as const;

const pathway = [
  ["Day 1", "Next-Day Safety"],
  ["Week 1", "Recovery Check"],
  ["Month 1", "Follow-Up Review"]
] as const;

export default function Home() {
  return (
    <div className="bg-[linear-gradient(180deg,#fbfaf7_0%,#eef6f7_46%,#f5f8fb_100%)]">
      <section className="mx-auto grid min-h-[calc(100vh-116px)] max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div>
          <p className="mb-3 inline-flex rounded-full border border-teal/20 bg-white/80 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-teal shadow-sm">AF Ablation Recovery Companion</p>
          <p className="text-lg font-semibold tracking-tight text-teal">PostAblate</p>
          <h1 className="mt-3 max-w-3xl text-5xl font-semibold leading-tight tracking-tight text-navy sm:text-6xl">Guided recovery after AF ablation.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
            Know what to expect, when to check in, and when to contact your care team - all in one place.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {heroActions.map(([title, label, description, href, tone]) => (
              <Link
                key={href}
                href={href}
                className={tone === "urgent"
                  ? "rounded-lg border border-coral/25 bg-red-50/95 p-4 text-navy shadow-card transition hover:-translate-y-0.5 hover:border-coral/40 hover:shadow-soft focus:outline-none focus:ring-4 focus:ring-coral/15"
                  : "rounded-lg border border-slate-200/80 bg-white/95 p-4 text-navy shadow-card transition hover:-translate-y-0.5 hover:border-teal/30 hover:shadow-soft focus:outline-none focus:ring-4 focus:ring-teal/15"}
              >
                <span className={tone === "urgent" ? "text-xs font-semibold uppercase tracking-wide text-coral" : "text-xs font-semibold uppercase tracking-wide text-teal"}>{label}</span>
                <span className="mt-2 block text-base font-semibold leading-6">{title}</span>
                <span className="mt-2 block text-sm leading-6 text-slate-600">{description}</span>
              </Link>
            ))}
          </div>
          <div className="mt-8 grid gap-3">
            <EmergencyBanner />
            <SafetyBanner />
          </div>
        </div>
        <div className="grid gap-5">
          <div className="rounded-lg border border-slate-200/70 bg-white/90 p-5 shadow-card backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-wide text-teal">Protocol first</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-navy">Conservative recovery support with clinician oversight</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              PostAblate uses fixed safety pathways for AF ablation recovery. Red flags override routine education, and uncertain concerning symptoms escalate.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200/70 bg-white/90 p-4 shadow-card">
              <p className="text-3xl font-semibold text-coral">911</p>
              <p className="mt-1 text-sm text-slate-600">Emergency symptoms escalate immediately.</p>
            </div>
            <div className="rounded-lg border border-slate-200/70 bg-white/90 p-4 shadow-card">
              <p className="text-3xl font-semibold text-teal">AF-only</p>
              <p className="mt-1 text-sm text-slate-600">The active MVP scope is AF ablation recovery.</p>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200/70 bg-white/90 p-4 shadow-card">
            <p className="text-sm font-semibold uppercase tracking-wide text-teal">Recovery timeline</p>
            <div className="mt-4 grid gap-3">
              {pathway.map(([when, label], index) => (
                <div key={label} className="grid grid-cols-[auto_1fr] gap-3">
                  <div className="flex flex-col items-center">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-sky text-xs font-semibold text-navy ring-1 ring-teal/15">{index + 1}</span>
                    {index < pathway.length - 1 ? <span className="mt-2 h-7 w-px bg-slate-200" /> : null}
                  </div>
                  <div className="rounded-lg bg-clinical px-3 py-2 text-sm">
                    <p className="font-semibold text-navy">{when}</p>
                    <p className="text-slate-600">{label}</p>
                  </div>
                </div>
              ))}
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
