export type SymptomCategory =
  | "chest-pain"
  | "shortness-of-breath"
  | "fainting"
  | "stroke-like-symptoms"
  | "access-site-bleeding"
  | "access-site-swelling"
  | "limb-symptoms"
  | "fever-chills"
  | "palpitations"
  | "mild-chest-discomfort"
  | "fatigue"
  | "sore-throat"
  | "bruising"
  | "swallowing"
  | "severe-reflux"
  | "coughing-blood"
  | "vomiting-blood"
  | "new-back-pain"
  | "medication-question"
  | "blood-thinner-question"
  | "activity-question"
  | "urination"
  | "fluid-retention"
  | "defibrillator-shock"
  | "other";

export type TriageCategory =
  | "emergency"
  | "urgent"
  | "routine"
  | "education";

export type TriageAnswer = {
  ablationDate?: string;
  accessSite?: string;
  symptomCategory?: SymptomCategory;
  mainConcern?: string;
  symptomOnset?: string;
  severity?: "none" | "mild" | "moderate" | "severe" | "worsening" | "not-sure";
  chestPain?: string;
  shortnessOfBreath?: string;
  strokeSymptoms?: string[];
  fainting?: string;
  bleeding?: string;
  accessSiteFindings?: string[];
  accessSiteTrend?: string;
  limbSymptoms?: string[];
  fever?: string;
  palpitations?: string;
  rhythmDuration?: string;
  dizzinessWithRhythm?: boolean;
  swallowing?: string;
  reflux?: string;
  coughingOrVomitingBlood?: string;
  newBackPain?: string;
  urinary?: string;
  fluidRetention?: string[];
  anticoagulantUse?: string;
  missedBloodThinner?: string;
  medicationChanges?: string;
  antiarrhythmicUse?: string;
  defibrillatorShock?: string;
  overallConcern?: string;
  questionsForTeam?: string;
  [key: string]: unknown;
};

export type TriageResult = {
  category: TriageCategory;
  label: string;
  explanation: string;
  recommendedAction: string;
  disclaimer: string;
  clinicianSummary: string;
  matchedCriteria: string[];
};
