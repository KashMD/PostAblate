import { FollowUpOptionCard } from "@/components/FollowUpOptionCard";
import { PageHeader } from "@/components/PageHeader";
import { SafetyBanner } from "@/components/SafetyBanner";

export default function FollowUpPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Follow-up"
        title="Choose your AF ablation check-in"
        description="The one-week check focuses on early safety and recovery. The one-month follow-up focuses on rhythm symptoms, recovery trajectory, medication adherence, healthcare use, and patient-reported outcomes."
      />
      <SafetyBanner />
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <FollowUpOptionCard title="One-week recovery check" description="Review early access-site healing, bleeding, chest and breathing symptoms, swallowing symptoms, fever, rhythm symptoms, medicines, and activity questions." href="/follow-up/one-week" />
        <FollowUpOptionCard title="One-month follow-up" description="Capture longer recovery trajectory, healthcare use, rhythm episodes, access-site status, medication adherence, functional recovery, and patient-reported outcomes." href="/follow-up/one-month" />
      </div>
    </div>
  );
}
