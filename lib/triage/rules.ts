import { buildTriageSummary, DEFAULT_SAFETY_NET } from "./summary";
import type { TriageAnswer, TriageCategory, TriageResult } from "./types";

const emergencyMessage =
  "This could be urgent after an AF ablation. Please call 911 or seek emergency care now. Do not drive yourself if you feel faint, weak, short of breath, unstable, or have severe chest pain.";

const urgentMessage =
  "This should be reviewed by your EP team today. Please contact your EP office or on-call heart rhythm team. If symptoms worsen or you develop fainting, severe chest pain, severe shortness of breath, heavy bleeding, stroke symptoms, trouble swallowing, coughing or vomiting blood, or a cold/numb/weak limb, seek emergency care.";

const routineMessage =
  "Based on what you reported, this does not match the emergency warning signs listed in this tool, but it should still be reviewed. Please submit this for nurse review and follow your discharge instructions.";

const educationMessage =
  "Based on what you reported, this does not match the emergency warning signs listed in this tool, but it should still be monitored. Please follow your discharge instructions and contact your EP team if symptoms worsen or concern you.";

function includesAny(values: unknown, needles: string[]) {
  const list = Array.isArray(values) ? values : values ? [values] : [];
  return list.some((item) => needles.some((needle) => String(item).toLowerCase().includes(needle)));
}

function equalsAny(value: unknown, candidates: string[]) {
  return candidates.includes(String(value ?? "").toLowerCase());
}

function collectEmergency(answer: TriageAnswer) {
  const criteria: string[] = [];

  if (answer.symptomCategory === "stroke-like-symptoms" || includesAny(answer.strokeSymptoms, ["face", "weakness", "numb", "speaking", "confusion", "vision", "walking", "balance", "headache"])) criteria.push("Stroke-like symptoms reported");
  if (equalsAny(answer.fainting, ["fainting/loss of consciousness", "fainting", "loss of consciousness"])) criteria.push("Fainting or loss of consciousness");
  if (includesAny(answer.fainting, ["near-fainting with instability", "severe"])) criteria.push("Near-fainting with severe symptoms");
  if (equalsAny(answer.severity, ["severe"]) && answer.symptomCategory === "chest-pain") criteria.push("Severe chest pain or pressure");
  if (includesAny(answer.chestPain, ["severe", "spreading", "sweating", "nausea", "vomiting", "fainting", "severe dizziness", "weakness"])) criteria.push("Emergency chest pain features");
  if (includesAny(answer.shortnessOfBreath, ["severe"])) criteria.push("Severe shortness of breath");
  if (includesAny(answer.overallConcern, ["unsafe", "collapse", "severe weakness"])) criteria.push("Severe weakness, collapse, or feeling unsafe");
  if (includesAny(answer.bleeding, ["heavy", "soaking", "did not stop", "does not stop", "bright red"])) criteria.push("Heavy or persistent access-site bleeding");
  if (includesAny(answer.accessSiteTrend, ["rapidly expanding", "fast-growing", "fast growing"]) || includesAny(answer.accessSiteFindings, ["rapidly expanding", "fast-growing"])) criteria.push("Rapidly expanding or fast-growing painful access-site lump");
  if (includesAny(answer.limbSymptoms, ["cold", "pale", "blue", "numb", "tingling", "weak", "severe pain"])) criteria.push("Cold, pale, blue, numb, painful, or weak limb after access");
  if (answer.symptomCategory === "coughing-blood" || answer.symptomCategory === "vomiting-blood" || includesAny(answer.coughingOrVomitingBlood, ["cough", "vomit"])) criteria.push("Coughing or vomiting blood");
  if (includesAny(answer.swallowing, ["trouble swallowing"]) || includesAny(answer.swallowing, ["severe"]) && includesAny([answer.chestPain, answer.fever], ["severe", "fever"])) criteria.push("Trouble swallowing or severe swallowing symptoms after AF ablation");
  if (includesAny(answer.urinary, ["black stools"])) criteria.push("Black stools while on anticoagulation");
  if (includesAny(answer.defibrillatorShock, ["more than one", "chest pain", "fainting", "severe", "very unwell", "ongoing"])) criteria.push("Concerning ICD/S-ICD shock symptoms");

  return criteria;
}

function collectUrgent(answer: TriageAnswer) {
  const criteria: string[] = [];

  if (answer.symptomCategory === "fever-chills" || includesAny(answer.fever, ["chills", "100.4", "38", "101.5", "fever"])) criteria.push("Fever or chills");
  if (includesAny(answer.accessSiteFindings, ["worsening", "redness", "warmth", "drainage", "pus", "red streaks", "swelling", "bleeding"]) || includesAny(answer.accessSiteTrend, ["worsening", "enlarging"]) || includesAny(answer.accessSiteSymptomTrend, ["worsening"])) criteria.push("Worsening access-site symptoms");
  if (includesAny(answer.bleeding, ["ongoing", "stopped quickly"]) && !includesAny(answer.bleeding, ["heavy", "soaking", "did not stop"])) criteria.push("Ongoing or recurrent bleeding that is not heavy");
  if (includesAny(answer.missedBloodThinner, ["missed", "stopped", "no", "not sure"]) || includesAny(answer.medicationChanges, ["stopped", "changed", "uncertain"])) criteria.push("Medication interruption or uncertainty about anticoagulation/heart medicines");
  if (answer.symptomCategory === "blood-thinner-question" && (includesAny(answer.bleeding, ["bleeding", "ongoing", "stopped quickly"]) || includesAny(answer.accessSiteFindings, ["bruising", "swelling", "lump"]))) criteria.push("Blood thinner question with bleeding, bruising, swelling, or lump concern");
  if (includesAny(answer.palpitations, ["longer than 24", "severe", "frequent", "worsening", "sustained", "associated"]) || answer.dizzinessWithRhythm) criteria.push("Prolonged, worsening, or symptomatic rhythm symptoms");
  if (includesAny(answer.shortnessOfBreath, ["new", "worsening", "moderate"]) || includesAny(answer.chestPain, ["persistent", "worsening", "moderate"])) criteria.push("New or worsening chest/breathing symptoms");
  if (answer.symptomCategory === "new-back-pain" || equalsAny(answer.newBackPain, ["yes"])) criteria.push("New back pain after AF/left atrial ablation");
  if (answer.symptomCategory === "swallowing" || includesAny(answer.swallowing, ["painful", "trouble", "severe"])) criteria.push("Trouble swallowing or painful swallowing after AF ablation");
  if (answer.symptomCategory === "severe-reflux" || includesAny(answer.reflux, ["worsening", "severe"])) criteria.push("Severe reflux-like chest discomfort after AF ablation");
  if (includesAny(answer.urinary, ["trouble", "painful", "blood"])) criteria.push("Trouble urinating or blood in urine");
  if (includesAny(answer.fluidRetention, ["weight", "swelling", "lying flat"])) criteria.push("Fluid retention symptoms");
  if (includesAny(answer.overallConcern, ["severe", "prolonged", "unusual", "worsening", "concerning"])) criteria.push("Symptom feels severe, prolonged, unusual, worsening, or concerning");

  return criteria;
}

function collectRoutine(answer: TriageAnswer) {
  const criteria: string[] = [];

  if (answer.symptomCategory === "activity-question") criteria.push("Activity, work, exercise, sex, driving, or travel question");
  if (answer.symptomCategory === "medication-question" || answer.symptomCategory === "blood-thinner-question") criteria.push("Medication question without reported red flags");
  if (includesAny(answer.palpitations, ["mild"])) criteria.push("Mild rhythm symptoms without severe features");
  if (includesAny(answer.accessSiteFindings, ["pain", "soreness"]) || answer.symptomCategory === "bruising") criteria.push("Mild access-site soreness, bruising, or lump");
  if (answer.symptomCategory === "other") criteria.push("Uncertain symptom without emergency details");

  return criteria;
}

function collectEducation(answer: TriageAnswer) {
  const criteria: string[] = [];

  if (answer.symptomCategory === "sore-throat") criteria.push("Mild sore throat after anesthesia or TEE");
  if (answer.symptomCategory === "fatigue" && (equalsAny(answer.severity, ["mild"]) || !answer.severity)) criteria.push("Mild fatigue that is not worsening");
  if (answer.symptomCategory === "mild-chest-discomfort" || includesAny(answer.chestPain, ["mild"])) criteria.push("Mild chest soreness or discomfort");
  if (includesAny(answer.shortnessOfBreath, ["mild"])) criteria.push("Mild shortness of breath");
  if (includesAny(answer.bleeding, ["small spot", "quarter"])) criteria.push("Small amount of blood on bandage");
  if (includesAny(answer.accessSiteFindings, ["stable", "small", "bruising"]) || includesAny(answer.accessSiteTrend, ["improving", "stable"])) criteria.push("Mild and stable access-site findings");
  if (includesAny(answer.palpitations, ["brief", "extra beats", "skipped", "fluttering"])) criteria.push("Brief palpitations during healing period without red flags");

  return criteria;
}

const meta: Record<TriageCategory, Omit<TriageResult, "category" | "clinicianSummary" | "matchedCriteria">> = {
  emergency: {
    label: "Emergency now",
    explanation: "Your answers include warning signs that can be urgent after AF ablation.",
    recommendedAction: emergencyMessage,
    disclaimer: DEFAULT_SAFETY_NET
  },
  urgent: {
    label: "Urgent same-day EP contact",
    explanation: "Your answers include symptoms that should be reviewed by your EP team today.",
    recommendedAction: urgentMessage,
    disclaimer: DEFAULT_SAFETY_NET
  },
  routine: {
    label: "Routine nurse review",
    explanation: "Your answers do not match the emergency criteria in this tool, but clinician review is appropriate.",
    recommendedAction: routineMessage,
    disclaimer: DEFAULT_SAFETY_NET
  },
  education: {
    label: "Expected recovery education",
    explanation: "Your answers fit common recovery issues only if symptoms stay mild and continue improving.",
    recommendedAction: educationMessage,
    disclaimer: DEFAULT_SAFETY_NET
  }
};

export function evaluateTriage(answer: TriageAnswer): TriageResult {
  const emergency = collectEmergency(answer);
  const urgent = collectUrgent(answer);
  const routine = collectRoutine(answer);
  const education = collectEducation(answer);

  let category: TriageCategory = "routine";
  let matchedCriteria = routine.length ? routine : ["Incomplete or uncertain information"];

  if (emergency.length) {
    category = "emergency";
    matchedCriteria = emergency;
  } else if (urgent.length) {
    category = "urgent";
    matchedCriteria = urgent;
  } else if (routine.length) {
    category = "routine";
    matchedCriteria = routine;
  } else if (education.length) {
    category = "education";
    matchedCriteria = education;
  }

  return {
    category,
    matchedCriteria,
    clinicianSummary: buildTriageSummary(answer, category),
    ...meta[category]
  };
}
