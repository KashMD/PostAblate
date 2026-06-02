import type { TriageCategory } from "@/lib/triage/types";

export type MockSubmission = {
  initials: string;
  ablationDate: string;
  accessSite: string;
  type: "Intake" | "Anytime Symptom Triage" | "Next-Day Safety Check" | "1-Week Recovery Check" | "30-Day Recovery Follow-Up";
  category: TriageCategory;
  concern: string;
  submittedDate: string;
  status: "New" | "Reviewed" | "Closed";
};

export const mockSubmissions: MockSubmission[] = [
  { initials: "AR", ablationDate: "2026-05-21", accessSite: "Left groin", type: "Anytime Symptom Triage", category: "emergency", concern: "Severe chest pressure with shortness of breath", submittedDate: "2026-06-01", status: "New" },
  { initials: "JM", ablationDate: "2026-05-24", accessSite: "Right groin", type: "Next-Day Safety Check", category: "urgent", concern: "Temperature 100.4 F and worsening groin redness", submittedDate: "2026-06-01", status: "New" },
  { initials: "LK", ablationDate: "2026-05-01", accessSite: "Left neck", type: "1-Week Recovery Check", category: "routine", concern: "Medication question without missed doses", submittedDate: "2026-05-31", status: "Reviewed" },
  { initials: "SP", ablationDate: "2026-05-28", accessSite: "Right groin", type: "Anytime Symptom Triage", category: "education", concern: "Mild improving bruising", submittedDate: "2026-05-31", status: "Closed" },
  { initials: "GT", ablationDate: "2026-05-07", accessSite: "Left groin, Right neck", type: "30-Day Recovery Follow-Up", category: "urgent", concern: "Palpitations lasting longer than 24 hours", submittedDate: "2026-06-01", status: "New" }
];
