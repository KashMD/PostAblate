"use client";

import { useMemo, useState } from "react";
import { FormSection } from "@/components/FormSection";
import { AccessSiteField, SelectField, TextArea, TextField } from "@/components/FormControls";
import { PageHeader } from "@/components/PageHeader";
import { SafetyBanner } from "@/components/SafetyBanner";
import { TriageResultCard } from "@/components/TriageResultCard";
import { evaluateTriage } from "@/lib/triage/rules";
import { buildFollowUpSummary } from "@/lib/triage/summary";
import type { TriageAnswer, TriageResult } from "@/lib/triage/types";

export default function NextDayPage() {
  const [values, setValues] = useState<TriageAnswer>({});
  const [submitted, setSubmitted] = useState(false);
  const setValue = (name: string, value: string) => setValues((current) => ({ ...current, [name]: value }));
  const result: TriageResult = useMemo(() => {
    const evaluated = evaluateTriage(values);
    return {
      ...evaluated,
      clinicianSummary: buildFollowUpSummary("PostAblate Next-Day Safety Check Summary", values, evaluated.category)
    };
  }, [values]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Next-Day Safety Check"
        title="Next-Day Safety Check"
        description="Recommended the day after AF ablation. This short check focuses on immediate post-discharge safety after same-day or overnight discharge."
      />
      <div className="mb-6"><SafetyBanner /></div>
      <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <form className="grid gap-5" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
          <FormSection title="Procedure and access site">
            <TextField label="Date of AF ablation" name="ablationDate" type="date" value={values.ablationDate} onChange={setValue} />
            <AccessSiteField value={values.accessSite} otherValue={String(values.otherAccessSite ?? "")} onChange={setValue} />
          </FormSection>
          <FormSection title="Immediate safety screen">
            <SelectField label="Any bleeding from access site?" name="bleeding" value={values.bleeding} options={["No", "Small spot on bandage", "Yes, stopped quickly", "Yes, ongoing", "Yes, soaking through bandage", "Yes, did not stop after 10-15 minutes of firm pressure"]} onChange={setValue} />
            <SelectField label="Any access-site swelling or lump?" name="accessSiteTrend" value={values.accessSiteTrend} options={["No", "Small and stable", "Worsening", "Rapidly expanding", "Fast-growing and painful"]} onChange={setValue} />
            <SelectField label="Any limb symptoms on the access side?" name="limbSymptoms" value={String(values.limbSymptoms ?? "")} options={["No", "Cold limb", "Pale or blue color", "Numbness", "Tingling", "Weakness", "Severe pain", "Not sure"]} onChange={setValue} />
            <SelectField label="Any chest pain or chest pressure?" name="chestPain" value={values.chestPain} options={["No", "Mild", "Persistent", "Worsening", "Severe"]} onChange={setValue} />
            <SelectField label="Any shortness of breath?" name="shortnessOfBreath" value={values.shortnessOfBreath} options={["No", "Mild", "New or worsening", "Severe"]} onChange={setValue} />
            <SelectField label="Any fainting or near-fainting?" name="fainting" value={values.fainting} options={["No", "Near-fainting", "Near-fainting with instability or severe symptoms", "Fainting/loss of consciousness"]} onChange={setValue} />
            <SelectField label="Any stroke-like symptoms?" name="strokeSymptoms" value={String(values.strokeSymptoms ?? "")} options={["No", "Face droop", "Arm or leg weakness", "Trouble speaking", "Sudden confusion", "New vision loss", "Sudden trouble walking or loss of balance", "Sudden severe headache"]} onChange={setValue} />
            <SelectField label="Any trouble swallowing or painful swallowing?" name="swallowing" value={values.swallowing} options={["No", "Mild sore throat only", "Painful swallowing", "Trouble swallowing", "Severe swallowing pain"]} onChange={setValue} />
            <SelectField label="Any coughing blood or vomiting blood?" name="coughingOrVomitingBlood" value={values.coughingOrVomitingBlood} options={["No", "Coughing blood", "Vomiting blood"]} onChange={setValue} />
            <SelectField label="Any fever or chills?" name="fever" value={values.fever} options={["No", "Chills without measured fever", "Temperature below 100.4 F / 38 C", "Temperature >= 100.4 F / 38 C", "Temperature over 101.5 F"]} onChange={setValue} />
          </FormSection>
          <FormSection title="Medicines, sedation, and safety at home">
            <SelectField label="Taking anticoagulant/blood thinner as prescribed?" name="missedBloodThinner" value={values.missedBloodThinner} options={["Yes", "No", "Missed dose", "Stopped on my own", "Not sure", "Not prescribed"]} onChange={setValue} />
            <SelectField label="Any medication confusion?" name="medicationChanges" value={values.medicationChanges} options={["No", "Yes", "Stopped on my own", "Not sure"]} onChange={setValue} />
            <SelectField label="Any sedation or anesthesia recovery concern?" name="sedationRecovery" value={String(values.sedationRecovery ?? "")} options={["No", "Nausea", "Dizziness", "Severe weakness", "Confusion", "Not sure"]} onChange={setValue} />
            <SelectField label="Any driving or activity questions?" name="activityQuestions" value={String(values.activityQuestions ?? "")} options={["No", "Yes"]} onChange={setValue} />
            <SelectField label="Do you feel safe at home?" name="overallConcern" value={values.overallConcern} options={["Yes", "Not sure", "No, I feel unsafe at home"]} onChange={setValue} />
            <TextArea label="Optional message to care team" name="questionsForTeam" value={values.questionsForTeam} onChange={setValue} />
          </FormSection>
          <button className="rounded-lg bg-navy px-5 py-3 text-sm font-semibold text-white shadow-sm" type="submit">Submit Next-Day Safety Check</button>
        </form>
        <aside className="lg:sticky lg:top-28 lg:self-start">{submitted ? <TriageResultCard result={result} /> : <div className="rounded-lg border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-600 shadow-soft">Your next-day safety category and clinician summary will appear here after submission.</div>}</aside>
      </div>
    </div>
  );
}
