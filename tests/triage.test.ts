import { describe, expect, it } from "vitest";
import { evaluateTriage } from "@/lib/triage/rules";
import type { TriageAnswer, TriageCategory } from "@/lib/triage/types";

const labels: Record<TriageCategory, string> = {
  emergency: "Emergency now",
  urgent: "Urgent same-day EP contact",
  routine: "Routine nurse review",
  education: "Expected recovery education"
};

function expectCategory(answer: TriageAnswer, category: TriageCategory) {
  const result = evaluateTriage(answer);

  expect(result.category).toBe(category);
  expect(result.label).toBe(labels[category]);

  return result;
}

describe("evaluateTriage", () => {
  it.each([
    ["stroke-like symptoms", { symptomCategory: "stroke-like-symptoms" }],
    ["fainting or loss of consciousness", { symptomCategory: "fainting", fainting: "Fainting/loss of consciousness" }],
    ["severe chest pain or pressure", { symptomCategory: "chest-pain", severity: "severe" }],
    ["severe shortness of breath", { symptomCategory: "shortness-of-breath", shortnessOfBreath: "Severe" }],
    ["heavy bleeding", { symptomCategory: "access-site-bleeding", bleeding: "Heavy" }],
    ["bleeding that does not stop after firm pressure", { symptomCategory: "access-site-bleeding", bleeding: "Did not stop after 10-15 minutes of firm pressure" }],
    ["rapidly expanding access-site swelling", { symptomCategory: "access-site-swelling", accessSiteTrend: "Rapidly expanding" }],
    ["fast-growing painful access-site lump", { symptomCategory: "access-site-swelling", accessSiteTrend: "Fast-growing and painful" }],
    ["cold, pale, blue, numb, tingly, painful, or weak limb after access", { symptomCategory: "limb-symptoms", limbSymptoms: ["Cold limb"] }],
    ["coughing blood", { symptomCategory: "coughing-blood" }],
    ["vomiting blood", { symptomCategory: "vomiting-blood" }],
    ["trouble swallowing after AF ablation", { symptomCategory: "swallowing", swallowing: "Trouble swallowing" }],
    ["black stools while on anticoagulation", { anticoagulantUse: "Yes", urinary: "Black stools" }],
    ["ICD/S-ICD shock with severe symptoms if reported", { symptomCategory: "defibrillator-shock", defibrillatorShock: "Any ICD shock with severe shortness of breath" }]
  ] satisfies Array<[string, TriageAnswer]>)("returns Emergency now for %s", (_name, answer) => {
    expectCategory(answer, "emergency");
  });

  it.each([
    ["fever or chills", { symptomCategory: "fever-chills" }],
    ["worsening access-site pain", { accessSiteFindings: ["Pain"], accessSiteSymptomTrend: "Worsening" }],
    ["access-site redness", { accessSiteFindings: ["Redness or warmth"] }],
    ["access-site warmth", { accessSiteFindings: ["Warmth"] }],
    ["access-site drainage", { accessSiteFindings: ["Drainage"] }],
    ["access-site swelling", { accessSiteFindings: ["Swelling"] }],
    ["severe access-site pain", { accessSiteFindings: ["Severe pain"] }],
    ["access-site bruising with blood thinner concern", { symptomCategory: "blood-thinner-question", accessSiteFindings: ["Bruising"] }],
    ["growing access-site lump", { accessSiteTrend: "Enlarging" }],
    ["palpitations lasting longer than 24 hours", { symptomCategory: "palpitations", palpitations: "Lasting longer than 24 hours" }],
    ["prolonged palpitations", { symptomCategory: "palpitations", overallConcern: "Prolonged" }],
    ["severe palpitations", { symptomCategory: "palpitations", palpitations: "Severe" }],
    ["frequent palpitations", { symptomCategory: "palpitations", palpitations: "Frequent" }],
    ["worsening palpitations", { symptomCategory: "palpitations", palpitations: "Worsening" }],
    ["palpitations associated with dizziness without emergency features", { symptomCategory: "palpitations", palpitations: "Associated with dizziness" }],
    ["new or worsening shortness of breath that is not severe", { symptomCategory: "shortness-of-breath", shortnessOfBreath: "New or worsening" }],
    ["persistent chest discomfort that is not severe", { symptomCategory: "mild-chest-discomfort", chestPain: "Persistent" }],
    ["worsening chest discomfort that is not severe", { symptomCategory: "mild-chest-discomfort", chestPain: "Worsening" }],
    ["new back pain after AF ablation", { symptomCategory: "new-back-pain" }],
    ["painful swallowing or swallowing concern after AF ablation", { symptomCategory: "swallowing", swallowing: "Painful swallowing" }],
    ["missed blood thinner dose", { symptomCategory: "blood-thinner-question", missedBloodThinner: "Missed dose" }],
    ["patient stopped anticoagulant on their own", { symptomCategory: "blood-thinner-question", missedBloodThinner: "Stopped on my own" }],
    ["patient stopped heart medicine on their own", { symptomCategory: "medication-question", medicationChanges: "Stopped on my own" }],
    ["blood thinner question with bleeding concern", { symptomCategory: "blood-thinner-question", bleeding: "Ongoing bleeding" }],
    ["blood in urine", { symptomCategory: "urination", urinary: "Blood in urine" }],
    ["trouble urinating", { symptomCategory: "urination", urinary: "Trouble urinating" }],
    ["sudden weight gain", { symptomCategory: "fluid-retention", fluidRetention: ["Sudden weight gain >3 lb overnight"] }],
    ["fluid-retention symptoms", { symptomCategory: "fluid-retention", fluidRetention: ["New leg swelling"] }]
  ] satisfies Array<[string, TriageAnswer]>)("returns Urgent same-day EP contact for %s", (_name, answer) => {
    expectCategory(answer, "urgent");
  });

  it.each([
    ["medication question without missed dose or bleeding", { symptomCategory: "medication-question" }],
    ["blood thinner question without missed dose or bleeding", { symptomCategory: "blood-thinner-question" }],
    ["mild palpitations without red flags", { symptomCategory: "palpitations", palpitations: "Mild/intermittent" }],
    ["mild access-site soreness", { accessSiteFindings: ["Soreness"] }],
    ["stable mild bruising", { symptomCategory: "bruising", accessSiteFindings: ["Bruising"], accessSiteTrend: "Stable" }],
    ["activity, driving, work, or exercise question", { symptomCategory: "activity-question" }],
    ["anxiety or uncertainty without red flags", { symptomCategory: "other", overallConcern: "Anxiety about recovery" }]
  ] satisfies Array<[string, TriageAnswer]>)("returns Routine nurse review for %s", (_name, answer) => {
    expectCategory(answer, "routine");
  });

  it.each([
    ["mild sore throat", { symptomCategory: "sore-throat", severity: "mild" }],
    ["mild fatigue", { symptomCategory: "fatigue", severity: "mild" }],
    ["mild improving chest soreness", { symptomCategory: "mild-chest-discomfort", chestPain: "Mild", accessSiteTrend: "Improving" }],
    ["small stable access-site bruise", { accessSiteFindings: ["Small stable bruising"], accessSiteTrend: "Stable" }],
    ["small stable access-site lump", { accessSiteFindings: ["Small stable lump"], accessSiteTrend: "Stable" }],
    ["brief intermittent palpitations without red flags", { symptomCategory: "palpitations", palpitations: "Brief racing episodes" }]
  ] satisfies Array<[string, TriageAnswer]>)("returns Expected recovery education for %s", (_name, answer) => {
    expectCategory(answer, "education");
  });

  it("lets emergency criteria override urgent, routine, and education criteria", () => {
    expectCategory(
      {
        symptomCategory: "blood-thinner-question",
        fever: "Temperature >= 100.4 F / 38 C",
        palpitations: "Mild/intermittent",
        accessSiteTrend: "Stable",
        bleeding: "Did not stop after 10-15 minutes of firm pressure"
      },
      "emergency"
    );
  });

  it("lets urgent criteria override routine and expected recovery education criteria", () => {
    expectCategory(
      {
        symptomCategory: "sore-throat",
        severity: "mild",
        palpitations: "Mild/intermittent",
        fever: "Chills"
      },
      "urgent"
    );
  });

  it("does not return expected recovery education when emergency criteria are present", () => {
    expectCategory(
      {
        symptomCategory: "sore-throat",
        severity: "mild",
        coughingOrVomitingBlood: "Coughing blood"
      },
      "emergency"
    );
  });

  it("does not return expected recovery education when urgent criteria are present", () => {
    expectCategory(
      {
        symptomCategory: "fatigue",
        severity: "mild",
        missedBloodThinner: "Missed dose"
      },
      "urgent"
    );
  });

  it("escalates Next-Day Safety Check red flags through the shared triage engine", () => {
    const result = expectCategory(
      {
        accessSite: "Left groin",
        bleeding: "Yes, did not stop after 10-15 minutes of firm pressure",
        overallConcern: "No, I feel unsafe at home"
      },
      "emergency"
    );

    expect(result.label).toBe("Emergency now");
  });

  it("escalates 1-Week Recovery Check red flags through the shared triage engine", () => {
    expectCategory(
      {
        accessSite: "Right neck",
        accessSiteFindings: ["Bleeding", "Redness or warmth"],
        accessSiteSymptomTrend: "Worsening"
      },
      "urgent"
    );
  });

  it("escalates 1-Week Recovery Check emergency access-site findings through the shared triage engine", () => {
    expectCategory(
      {
        accessSite: "Left groin, Right groin",
        accessSiteFindings: ["Rapidly expanding swelling", "Fast-growing painful lump"]
      },
      "emergency"
    );
  });

  it("escalates 30-Day Recovery Follow-Up red flags through the shared triage engine", () => {
    expectCategory(
      {
        accessSite: "Left groin, Right neck",
        swallowing: "Trouble swallowing",
        chestPain: "Mild"
      },
      "emergency"
    );
  });
});
