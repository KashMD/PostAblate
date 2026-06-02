import type { TriageCategory } from "@/lib/triage/types";

export type MockSubmission = {
  initials: string;
  ablationDate: string;
  accessSite: string;
  type: "Intake" | "Symptom triage" | "One-week check" | "One-month follow-up";
  category: TriageCategory;
  concern: string;
  submittedDate: string;
  status: "New" | "Reviewed" | "Closed";
};

export const mockSubmissions: MockSubmission[] = [
  { initials: "AR", ablationDate: "2026-05-21", accessSite: "Groin", type: "Symptom triage", category: "emergency", concern: "Severe chest pressure with shortness of breath", submittedDate: "2026-06-01", status: "New" },
  { initials: "JM", ablationDate: "2026-05-24", accessSite: "Groin", type: "One-week check", category: "urgent", concern: "Temperature 100.4 F and worsening groin redness", submittedDate: "2026-06-01", status: "New" },
  { initials: "LK", ablationDate: "2026-05-01", accessSite: "Wrist", type: "One-month follow-up", category: "routine", concern: "Medication question without missed doses", submittedDate: "2026-05-31", status: "Reviewed" },
  { initials: "SP", ablationDate: "2026-05-28", accessSite: "Groin", type: "Symptom triage", category: "education", concern: "Mild improving bruising", submittedDate: "2026-05-31", status: "Closed" },
  { initials: "GT", ablationDate: "2026-05-07", accessSite: "More than one site", type: "One-month follow-up", category: "urgent", concern: "Palpitations lasting longer than 24 hours", submittedDate: "2026-06-01", status: "New" }
];
