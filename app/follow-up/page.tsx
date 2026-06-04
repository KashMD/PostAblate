import { FollowUpOptionCard } from "@/components/FollowUpOptionCard";
import { PageHeader } from "@/components/PageHeader";
import { SafetyBanner } from "@/components/SafetyBanner";
import Link from "next/link";

export default function FollowUpPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Follow-up"
        title="Choose your AF ablation recovery check-in"
        description="PostAblate supports a structured pathway: next-day safety screening, 1-week recovery review, and 30-day recovery follow-up. Symptom triage is available anytime."
      />
      <SafetyBanner />
      <Link href="/triage" className="mt-6 block rounded-lg border border-coral/25 bg-red-50/90 p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft focus:outline-none focus:ring-4 focus:ring-coral/15">
        <p className="text-sm font-semibold uppercase tracking-wide text-coral">Have symptoms now?</p>
        <h2 className="mt-1 text-xl font-semibold tracking-tight text-navy">Use Anytime Symptom Triage</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">Chest pain, bleeding, shortness of breath, palpitations, or any urgent concern should not wait for a scheduled check-in.</p>
      </Link>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <FollowUpOptionCard badge="Day 1" title="Next-Day Safety Check" description="A quick safety review of your access sites, medications, and immediate post-procedure symptoms." href="/follow-up/next-day" />
        <FollowUpOptionCard badge="Day 7" title="1-Week Recovery Check" description="Review healing progress, rhythm symptoms, activity, fatigue, and medication questions." href="/follow-up/one-week" />
        <FollowUpOptionCard badge="Day 30" title="30-Day Recovery Follow-Up" description="Review your rhythm symptoms, medications, healthcare use, quality of life, and recovery trajectory." href="/follow-up/thirty-day" />
      </div>
    </div>
  );
}
