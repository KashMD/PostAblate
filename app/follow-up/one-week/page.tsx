"use client";

import { useMemo, useState } from "react";
import { FormSection } from "@/components/FormSection";
import { SelectField, TextArea, TextField } from "@/components/FormControls";
import { PageHeader } from "@/components/PageHeader";
import { SafetyBanner } from "@/components/SafetyBanner";
import { TriageResultCard } from "@/components/TriageResultCard";
import { evaluateTriage } from "@/lib/triage/rules";
import { buildFollowUpSummary } from "@/lib/triage/summary";
import type { TriageAnswer, TriageResult } from "@/lib/triage/types";

const accessSites = ["Groin", "Wrist", "Arm", "Neck", "More than one site", "Not sure"];

export default function OneWeekPage() {
  const [values, setValues] = useState<TriageAnswer>({});
  const [submitted, setSubmitted] = useState(false);
  const setValue = (name: string, value: string) => setValues((current) => ({ ...current, [name]: value }));
  const result: TriageResult = useMemo(() => {
    const evaluated = evaluateTriage(values);
    return {
      ...evaluated,
      clinicianSummary: buildFollowUpSummary("PostAblate One-Week AF Ablation Summary", values, evaluated.category)
    };
  }, [values]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader eyebrow="One-week check" title="One-week AF ablation recovery and safety check" description="This form captures early post-AF-ablation safety concerns and common recovery issues." />
      <div className="mb-6"><SafetyBanner /></div>
      <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <form className="grid gap-5" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
          <FormSection title="Procedure and access site">
            <TextField label="Date of AF ablation" name="ablationDate" type="date" value={values.ablationDate} onChange={setValue} />
            <TextField label="Today's date" name="todayDate" type="date" value={String(values.todayDate ?? "")} onChange={setValue} />
            <SelectField label="Access site" name="accessSite" value={values.accessSite} options={accessSites} onChange={setValue} />
            <SelectField label="Is the catheter site healing?" name="siteHealing" value={String(values.siteHealing ?? "")} options={["Yes", "Mostly", "No", "Not sure"]} onChange={setValue} />
          </FormSection>
          <FormSection title="Access-site safety">
            <SelectField label="Any bleeding from access site?" name="bleeding" value={values.bleeding} options={["No", "Small spot on bandage", "Yes, stopped quickly", "Yes, ongoing", "Yes, soaking through bandage", "Yes, did not stop after 10-15 minutes of firm pressure"]} onChange={setValue} />
            <SelectField label="Any groin/access-site swelling or lump?" name="accessSiteTrend" value={values.accessSiteTrend} options={["No", "Small and stable", "Worsening", "Rapidly expanding", "Fast-growing and painful"]} onChange={setValue} />
            <SelectField label="Access-site symptoms" name="accessSiteFindings" value={String(values.accessSiteFindings ?? "")} options={["Pain", "Bruising", "Swelling", "Lump", "Bleeding", "Drainage", "Redness or warmth", "Red streaks", "None"]} onChange={setValue} />
            <SelectField label="Are access-site symptoms improving, stable, or worsening?" name="accessSiteTrend" value={values.accessSiteTrend} options={["Improving", "Stable", "Worsening", "Not sure"]} onChange={setValue} />
            <SelectField label="Any limb symptoms on the access side?" name="limbSymptoms" value={String(values.limbSymptoms ?? "")} options={["No", "Cold limb", "Pale or blue color", "Numbness", "Tingling", "Weakness", "Severe pain", "Not sure"]} onChange={setValue} />
          </FormSection>
          <FormSection title="Symptoms and medicines">
            <SelectField label="Any fever or chills?" name="fever" value={values.fever} options={["No", "Chills without measured fever", "Temperature below 100.4 F / 38 C", "Temperature >= 100.4 F / 38 C", "Temperature over 101.5 F"]} onChange={setValue} />
            <SelectField label="Any chest pain or chest pressure?" name="chestPain" value={values.chestPain} options={["No", "Mild", "Persistent", "Worsening", "Severe"]} onChange={setValue} />
            <SelectField label="Any shortness of breath?" name="shortnessOfBreath" value={values.shortnessOfBreath} options={["No", "Mild", "New or worsening", "Severe"]} onChange={setValue} />
            <SelectField label="Any fainting or near-fainting?" name="fainting" value={values.fainting} options={["No", "Near-fainting", "Fainting/loss of consciousness"]} onChange={setValue} />
            <SelectField label="Any stroke-like symptoms?" name="strokeSymptoms" value={String(values.strokeSymptoms ?? "")} options={["No", "Face droop", "Arm or leg weakness", "Trouble speaking", "Sudden confusion", "New vision loss", "Sudden trouble walking or loss of balance", "Sudden severe headache"]} onChange={setValue} />
            <SelectField label="Palpitations or AF-like symptoms?" name="palpitations" value={values.palpitations} options={["No", "Mild/intermittent", "Brief racing episodes", "Sustained", "Lasting longer than 24 hours", "Associated with dizziness", "Associated with chest pain", "Associated with shortness of breath"]} onChange={setValue} />
            <SelectField label="Any swallowing symptoms?" name="swallowing" value={values.swallowing} options={["No", "Mild sore throat only", "Painful swallowing", "Trouble swallowing", "Severe swallowing pain"]} onChange={setValue} />
            <SelectField label="Any severe reflux-like chest discomfort?" name="reflux" value={values.reflux} options={["No", "Mild", "Worsening", "Severe"]} onChange={setValue} />
            <SelectField label="Any coughing blood or vomiting blood?" name="coughingOrVomitingBlood" value={values.coughingOrVomitingBlood} options={["No", "Coughing blood", "Vomiting blood"]} onChange={setValue} />
            <SelectField label="Any new back pain after ablation?" name="newBackPain" value={values.newBackPain} options={["No", "Yes"]} onChange={setValue} />
            <SelectField label="Any trouble urinating or blood in urine?" name="urinary" value={values.urinary} options={["No", "Trouble urinating", "Painful urination", "Blood in urine"]} onChange={setValue} />
            <SelectField label="Any fluid retention symptoms?" name="fluidRetention" value={String(values.fluidRetention ?? "")} options={["No", "Sudden weight gain >3 lb overnight or over a few days", "New leg/ankle/abdominal swelling", "Trouble lying flat because of breathing"]} onChange={setValue} />
            <SelectField label="Taking anticoagulant/blood thinner as prescribed?" name="missedBloodThinner" value={values.missedBloodThinner} options={["Yes", "No", "Missed dose", "Stopped on my own", "Not sure", "Not prescribed"]} onChange={setValue} />
            <SelectField label="Any medication questions?" name="medicationChanges" value={values.medicationChanges} options={["No", "Yes"]} onChange={setValue} />
            <SelectField label="Any activity, driving, work, lifting, exercise, sex, or travel questions?" name="activityQuestions" value={String(values.activityQuestions ?? "")} options={["No", "Yes"]} onChange={setValue} />
            <SelectField label="Overall recovery" name="overallConcern" value={values.overallConcern} options={["Better than expected", "As expected", "Worse than expected", "Not sure"]} onChange={setValue} />
            <TextArea label="Optional message to care team" name="questionsForTeam" value={values.questionsForTeam} onChange={setValue} />
          </FormSection>
          <button className="rounded-lg bg-navy px-5 py-3 text-sm font-semibold text-white shadow-sm" type="submit">Submit one-week check</button>
        </form>
        <aside className="lg:sticky lg:top-28 lg:self-start">{submitted ? <TriageResultCard result={result} /> : <div className="rounded-lg border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-600 shadow-soft">Your one-week safety category and clinician summary will appear here after submission.</div>}</aside>
      </div>
    </div>
  );
}
