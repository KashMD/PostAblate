"use client";

import { useMemo, useState } from "react";
import { FormSection } from "@/components/FormSection";
import { SelectField, TextArea, TextField } from "@/components/FormControls";
import { PageHeader } from "@/components/PageHeader";
import { SafetyBanner } from "@/components/SafetyBanner";
import { TriageResultCard } from "@/components/TriageResultCard";
import { accessSiteOptions } from "@/lib/access-sites";
import { evaluateTriage } from "@/lib/triage/rules";
import { buildFollowUpSummary } from "@/lib/triage/summary";
import type { TriageAnswer, TriageResult } from "@/lib/triage/types";

const bloodThinners = ["Warfarin/Coumadin", "Apixaban/Eliquis", "Rivaroxaban/Xarelto", "Dabigatran/Pradaxa", "Edoxaban/Savaysa", "Aspirin", "Clopidogrel/Plavix", "Ticagrelor/Brilinta", "Prasugrel/Effient", "Other", "Not sure"];

export default function ThirtyDayPage() {
  const [values, setValues] = useState<TriageAnswer>({});
  const [submitted, setSubmitted] = useState(false);
  const setValue = (name: string, value: string) => setValues((current) => ({ ...current, [name]: value }));
  const result: TriageResult = useMemo(() => {
    const evaluated = evaluateTriage(values);
    return {
      ...evaluated,
      clinicianSummary: buildFollowUpSummary("PostAblate 30-Day Recovery Follow-Up Summary", values, evaluated.category)
    };
  }, [values]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="30-Day Recovery Follow-Up"
        title="30-Day Recovery Follow-Up"
        description="Rhythm symptoms, healthcare use, medication adherence, quality of life, and recovery trajectory after AF ablation."
      />
      <div className="mb-6"><SafetyBanner /></div>
      <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <form className="grid gap-5" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
          <FormSection title="Procedure details">
            <TextField label="Date of AF ablation" name="ablationDate" type="date" value={values.ablationDate} onChange={setValue} />
            <SelectField label="Access site" name="accessSite" value={values.accessSite} options={accessSiteOptions} onChange={setValue} />
          </FormSection>
          <FormSection title="Healthcare use since ablation">
            <SelectField label="Since your ablation, have you gone to the emergency room?" name="erVisit" value={String(values.erVisit ?? "")} options={["Yes", "No"]} onChange={setValue} />
            <SelectField label="Have you been hospitalized?" name="hospitalized" value={String(values.hospitalized ?? "")} options={["Yes", "No"]} onChange={setValue} />
            <SelectField label="Have you called your EP office, cardiology office, or on-call team for symptoms?" name="calledTeam" value={String(values.calledTeam ?? "")} options={["Yes", "No"]} onChange={setValue} />
            <TextArea label="Reason, instructions received, and medication changes if any" name="healthcareUseDetails" value={String(values.healthcareUseDetails ?? "")} onChange={setValue} />
          </FormSection>
          <FormSection title="Rhythm symptoms">
            <SelectField label="Palpitations, skipped beats, fluttering, racing, or prior-AF-like symptoms?" name="palpitations" value={values.palpitations} options={["No", "Yes", "Mild/intermittent", "Sustained", "Lasting longer than 24 hours", "Associated with dizziness", "Associated with chest pain", "Associated with shortness of breath"]} onChange={setValue} />
            <TextField label="When did symptoms start?" name="symptomOnset" value={values.symptomOnset} onChange={setValue} />
            <TextField label="How often and how long do episodes last?" name="rhythmDuration" value={values.rhythmDuration} onChange={setValue} />
            <TextField label="Heart rate noticed, if known" name="heartRate" value={String(values.heartRate ?? "")} onChange={setValue} />
            <SelectField label="ECG/rhythm recording available?" name="rhythmRecording" value={String(values.rhythmRecording ?? "")} options={["No", "Apple Watch", "Kardia", "Monitor", "Pacemaker", "Defibrillator/ICD", "S-ICD", "Loop recorder", "Not sure"]} onChange={setValue} />
            <SelectField label="Current rhythm symptoms" name="currentRhythm" value={String(values.currentRhythm ?? "")} options={["None", "Improved", "Intermittent episodes", "Unchanged", "Worse", "Not sure"]} onChange={setValue} />
          </FormSection>
          <FormSection title="Safety screening">
            <SelectField label="Chest pain or pressure" name="chestPain" value={values.chestPain} options={["No", "Mild", "Moderate", "Severe", "Worsening"]} onChange={setValue} />
            <SelectField label="New or worsening shortness of breath" name="shortnessOfBreath" value={values.shortnessOfBreath} options={["No", "Mild", "Moderate", "Severe", "Worsening"]} onChange={setValue} />
            <SelectField label="Trouble swallowing or painful swallowing" name="swallowing" value={values.swallowing} options={["No", "Mild", "Painful swallowing", "Trouble swallowing", "Severe"]} onChange={setValue} />
            <SelectField label="Coughed up blood or vomited blood" name="coughingOrVomitingBlood" value={values.coughingOrVomitingBlood} options={["No", "Coughed blood", "Vomited blood"]} onChange={setValue} />
            <SelectField label="Fever, chills, confusion, or new neurologic symptoms" name="fever" value={values.fever} options={["No", "Fever/chills", "Confusion", "New neurologic symptoms"]} onChange={setValue} />
          </FormSection>
          <FormSection title="Access site and medications">
            <SelectField label="Is the catheter site healed?" name="siteHealing" value={String(values.siteHealing ?? "")} options={["Yes", "Mostly", "No", "Not sure"]} onChange={setValue} />
            <SelectField label="Access-site symptoms" name="accessSiteFindings" value={String(values.accessSiteFindings ?? "")} options={["Pain", "Bruising", "Swelling", "Lump", "Bleeding", "Drainage", "Redness or warmth", "Red streaks", "None"]} onChange={setValue} />
            <SelectField label="If symptoms are present, are they improving, stable, or worsening?" name="accessSiteTrend" value={values.accessSiteTrend} options={["Improving", "Stable", "Worsening", "Lump growing", "Bleeding", "Not sure"]} onChange={setValue} />
            <SelectField label="Limb symptoms" name="limbSymptoms" value={String(values.limbSymptoms ?? "")} options={["No", "Cold", "Pale", "Blue", "Numb", "Tingly", "Painful", "Weak"]} onChange={setValue} />
            <SelectField label="Taking a blood thinner?" name="anticoagulantUse" value={values.anticoagulantUse} options={["Yes", "No", "Not sure"]} onChange={setValue} />
            <SelectField label="Blood thinner/antiplatelet, if known" name="anticoagulantName" value={String(values.anticoagulantName ?? "")} options={bloodThinners} onChange={setValue} />
            <SelectField label="Missed any blood thinner doses since ablation?" name="missedBloodThinner" value={values.missedBloodThinner} options={["Yes", "No", "Not sure"]} onChange={setValue} />
            <SelectField label="Taking an antiarrhythmic or heart rhythm medicine?" name="antiarrhythmicUse" value={values.antiarrhythmicUse} options={["Yes", "No", "Not sure"]} onChange={setValue} />
            <SelectField label="Stopped or changed any heart medicine since ablation?" name="medicationChanges" value={values.medicationChanges} options={["Yes", "No", "Not sure", "Yes, directed by EP team", "Yes, not directed by EP team"]} onChange={setValue} />
          </FormSection>
          <FormSection title="Functional recovery and quality of life">
            <SelectField label="Back to usual daily activities?" name="functionalRecovery" value={String(values.functionalRecovery ?? "")} options={["Yes", "Partly", "No"]} onChange={setValue} />
            <SelectField label="Back to work?" name="backToWork" value={String(values.backToWork ?? "")} options={["Yes", "No", "Not applicable"]} onChange={setValue} />
            <SelectField label="Exercising or walking?" name="walking" value={String(values.walking ?? "")} options={["Yes", "No"]} onChange={setValue} />
            <SelectField label="Fatigue limiting recovery?" name="fatigue" value={String(values.fatigue ?? "")} options={["Yes", "No"]} onChange={setValue} />
            <SelectField label="Compared with before ablation, do you feel:" name="overallConcern" value={values.overallConcern} options={["Much better", "Somewhat better", "About the same", "Worse"]} onChange={setValue} />
            <SelectField label="Overall recovery from 0 to 10" name="overallRecoveryScore" value={String(values.overallRecoveryScore ?? "")} options={["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]} onChange={setValue} />
            <SelectField label="Heart rhythm worry from 0 to 10" name="rhythmWorryScore" value={String(values.rhythmWorryScore ?? "")} options={["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]} onChange={setValue} />
            <TextArea label="Biggest concern or question for your EP team" name="questionsForTeam" value={values.questionsForTeam} onChange={setValue} />
          </FormSection>
          <button className="rounded-lg bg-navy px-5 py-3 text-sm font-semibold text-white shadow-sm" type="submit">Submit 30-Day Recovery Follow-Up</button>
        </form>
        <aside className="lg:sticky lg:top-28 lg:self-start">{submitted ? <TriageResultCard result={result} /> : <div className="rounded-lg border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-600 shadow-soft">Your 30-day safety category and clinician summary will appear here after submission.</div>}</aside>
      </div>
    </div>
  );
}
