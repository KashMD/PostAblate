import type { TriageAnswer, TriageCategory } from "./types";

export const DEFAULT_SAFETY_NET =
  "Please follow your discharge instructions and your EP team's specific advice. If symptoms worsen or you develop fainting, severe chest pain, severe shortness of breath, stroke symptoms, heavy bleeding, sudden or rapidly increasing access-site swelling, a fast-growing painful lump, a cold/numb/weak limb, blue skin, fever with concerning symptoms, trouble swallowing after AF ablation, coughing or vomiting blood, or repeated defibrillator/ICD or S-ICD shocks, seek emergency care.";

const dispositionLabels: Record<TriageCategory, string> = {
  emergency: "Emergency care now",
  urgent: "Call EP team today",
  routine: "Routine nurse review",
  education: "Self-care education and continue planned follow-up"
};

function value(answer: TriageAnswer, key: keyof TriageAnswer, fallback = "Not reported") {
  const item = answer[key];
  if (Array.isArray(item)) return item.length ? item.join(", ") : fallback;
  if (typeof item === "boolean") return item ? "Yes" : "No";
  return item ? String(item) : fallback;
}

export function buildTriageSummary(answer: TriageAnswer, category: TriageCategory) {
  return [
    "PostAblate Symptom Triage Summary",
    "",
    `Procedure type: AF ablation`,
    `Ablation date: ${value(answer, "ablationDate")}`,
    `Access site: ${value(answer, "accessSite")}`,
    `Other access site, if known: ${value(answer, "otherAccessSite")}`,
    `Main concern: ${value(answer, "mainConcern")}`,
    `Timing of symptom onset: ${value(answer, "symptomOnset")}`,
    `Severity: ${value(answer, "severity")}`,
    `Rhythm symptoms: ${value(answer, "palpitations")}`,
    `Episode frequency/duration: ${value(answer, "rhythmDuration")}`,
    `Heart rate during symptoms: ${value(answer, "heartRate" as keyof TriageAnswer)}`,
    `ECG/rhythm recording available: ${value(answer, "rhythmRecording" as keyof TriageAnswer)}`,
    `Chest pain or shortness of breath: ${value(answer, "chestPain")} / ${value(answer, "shortnessOfBreath")}`,
    `Swallowing symptoms: ${value(answer, "swallowing")}`,
    `Coughing or vomiting blood: ${value(answer, "coughingOrVomitingBlood")}`,
    `Fever or chills: ${value(answer, "fever")}`,
    `Access-site findings: ${value(answer, "accessSiteFindings")}`,
    `Bleeding: ${value(answer, "bleeding")}`,
    `Lump/swelling/bruising: ${value(answer, "accessSiteTrend")} / ${value(answer, "accessSiteSymptomTrend")}`,
    `Limb color/temperature/sensation/strength: ${value(answer, "limbSymptoms")}`,
    `Dizziness, near-syncope, or syncope: ${value(answer, "fainting")}`,
    `Urinary symptoms or blood in urine: ${value(answer, "urinary")}`,
    `Weight gain or fluid-retention symptoms: ${value(answer, "fluidRetention")}`,
    `Blood thinner or antiplatelet use: ${value(answer, "anticoagulantUse")}`,
    `Missed blood thinner doses: ${value(answer, "missedBloodThinner")}`,
    `Antiarrhythmic use: ${value(answer, "antiarrhythmicUse")}`,
    `Medication changes: ${value(answer, "medicationChanges")}`,
    `Defibrillator/ICD/S-ICD shock if reported: ${value(answer, "defibrillatorShock")}`,
    `Recommended disposition: ${dispositionLabels[category]}`,
    `Patient-facing advice given: ${dispositionLabels[category]}`,
    `Questions for EP team: ${value(answer, "questionsForTeam")}`
  ].join("\n");
}

export function buildFollowUpSummary(
  title:
    | "PostAblate Next-Day Safety Check Summary"
    | "PostAblate 1-Week Recovery Check Summary"
    | "PostAblate 30-Day Recovery Follow-Up Summary",
  answer: TriageAnswer,
  category: TriageCategory
) {
  return [
    title,
    "",
    `Procedure type: AF ablation`,
    `Ablation date: ${value(answer, "ablationDate")}`,
    `Access site: ${value(answer, "accessSite")}`,
    `Other access site, if known: ${value(answer, "otherAccessSite")}`,
    `Site/access recovery: ${value(answer, "siteHealing" as keyof TriageAnswer)}`,
    `Bleeding/lump/swelling/bruising: ${value(answer, "bleeding")} / ${value(answer, "accessSiteFindings")}`,
    `Limb color/temperature/sensation/strength: ${value(answer, "limbSymptoms")}`,
    `Fever or chills: ${value(answer, "fever")}`,
    `Chest pain: ${value(answer, "chestPain")}`,
    `Shortness of breath: ${value(answer, "shortnessOfBreath")}`,
    `Palpitations/rhythm symptoms: ${value(answer, "palpitations")}`,
    `Swallowing symptoms: ${value(answer, "swallowing")}`,
    `Coughing or vomiting blood: ${value(answer, "coughingOrVomitingBlood")}`,
    `New back pain: ${value(answer, "newBackPain")}`,
    `Urinary symptoms: ${value(answer, "urinary")}`,
    `Fluid-retention symptoms: ${value(answer, "fluidRetention")}`,
    `Blood thinner adherence: ${value(answer, "missedBloodThinner")}`,
    `Medication questions/changes: ${value(answer, "medicationChanges")}`,
    `Functional recovery: ${value(answer, "functionalRecovery" as keyof TriageAnswer)}`,
    `Overall recovery score: ${value(answer, "overallRecoveryScore" as keyof TriageAnswer)}`,
    `Rhythm worry score: ${value(answer, "rhythmWorryScore" as keyof TriageAnswer)}`,
    `Patient's main concern: ${value(answer, "questionsForTeam")}`,
    `Recommended disposition: ${dispositionLabels[category]}`,
    `Questions for EP team: ${value(answer, "questionsForTeam")}`
  ].join("\n");
}
