"use client";

import { useMemo, useState } from "react";
import { FormSection } from "@/components/FormSection";
import { AccessSiteField, SelectField, TextArea, TextField } from "@/components/FormControls";
import { PageHeader } from "@/components/PageHeader";
import { SafetyBanner } from "@/components/SafetyBanner";
import { TriageResultCard } from "@/components/TriageResultCard";
import { evaluateTriage } from "@/lib/triage/rules";
import type { SymptomCategory, TriageAnswer } from "@/lib/triage/types";

const symptomOptions: { label: string; value: SymptomCategory }[] = [
  ["Chest pain or chest pressure", "chest-pain"],
  ["Shortness of breath", "shortness-of-breath"],
  ["Fainting or near-fainting", "fainting"],
  ["Stroke-like symptoms", "stroke-like-symptoms"],
  ["Bleeding from access site", "access-site-bleeding"],
  ["Access-site swelling or lump", "access-site-swelling"],
  ["Limb coldness, numbness, tingling, weakness, pain, or color change", "limb-symptoms"],
  ["Fever or chills", "fever-chills"],
  ["Palpitations or possible AF recurrence", "palpitations"],
  ["Mild chest discomfort", "mild-chest-discomfort"],
  ["Fatigue", "fatigue"],
  ["Sore throat", "sore-throat"],
  ["Bruising", "bruising"],
  ["Trouble swallowing or painful swallowing", "swallowing"],
  ["Severe reflux-like chest discomfort", "severe-reflux"],
  ["Coughing blood", "coughing-blood"],
  ["Vomiting blood", "vomiting-blood"],
  ["New back pain after AF ablation", "new-back-pain"],
  ["Medication question", "medication-question"],
  ["Blood thinner question", "blood-thinner-question"],
  ["Activity, driving, work, lifting, exercise, sex, or travel question", "activity-question"],
  ["Urination problem or blood in urine", "urination"],
  ["Fluid retention symptoms", "fluid-retention"],
  ["Defibrillator/ICD/S-ICD shock safety note", "defibrillator-shock"],
  ["Other or not sure", "other"]
].map(([label, value]) => ({ label, value: value as SymptomCategory }));

const triageSteps = ["Context", "Symptoms", "Result"];

export default function TriagePage() {
  const [values, setValues] = useState<TriageAnswer>({});
  const [submitted, setSubmitted] = useState(false);
  const setValue = (name: string, value: string) => setValues((current) => ({ ...current, [name]: value }));
  const result = useMemo(() => evaluateTriage(values), [values]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader eyebrow="Anytime Symptom Triage" title="Structured AF ablation symptom triage" description="Available anytime after AF ablation. Answer fixed safety questions. Red flags always override routine recovery education." />
      <div className="mb-6">
        <SafetyBanner />
      </div>
      <div className="mb-6 grid gap-3 rounded-lg border border-slate-200/80 bg-white/90 p-3 shadow-card sm:grid-cols-3">
        {triageSteps.map((step, index) => (
          <div key={step} className="flex items-center gap-3 rounded-lg bg-clinical px-3 py-3">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-sky text-sm font-semibold text-navy ring-1 ring-teal/15">{index + 1}</span>
            <span className="text-sm font-semibold text-navy">{step}</span>
          </div>
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <form
          className="grid gap-5"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <FormSection title="Opening questions">
            <TextField label="When was your AF ablation?" name="ablationDate" type="date" value={values.ablationDate} onChange={setValue} />
            <AccessSiteField value={values.accessSite} otherValue={String(values.otherAccessSite ?? "")} onChange={setValue} />
            <SelectField label="What symptom or concern are you having now?" name="symptomCategory" value={values.symptomCategory} options={symptomOptions} onChange={setValue} />
            <TextArea label="Main concern, in your words" name="mainConcern" value={values.mainConcern} onChange={setValue} />
          </FormSection>
          <FormSection title="Safety screening" description="Choose the closest match. If you are unsure and symptoms concern you, contact your EP team or seek urgent care.">
            <SelectField label="Severity" name="severity" value={values.severity} options={["mild", "moderate", "severe", "worsening", "not-sure"]} onChange={setValue} />
            <SelectField label="Chest pain or pressure" name="chestPain" value={values.chestPain} options={["No", "Mild", "Persistent", "Worsening", "Severe", "Spreading with sweating, nausea, vomiting, fainting, severe dizziness, or weakness"]} onChange={setValue} />
            <SelectField label="Shortness of breath" name="shortnessOfBreath" value={values.shortnessOfBreath} options={["No", "Mild", "New or worsening", "Severe"]} onChange={setValue} />
            <SelectField label="Fainting or near-fainting" name="fainting" value={values.fainting} options={["No", "Near-fainting", "Near-fainting with instability or severe symptoms", "Fainting/loss of consciousness"]} onChange={setValue} />
            <SelectField label="Stroke-like symptoms" name="strokeSymptoms" value={String(values.strokeSymptoms ?? "")} options={["No", "Face droop", "Arm or leg weakness", "Sudden numbness or tingling", "Trouble speaking", "New severe confusion", "New vision loss", "Sudden trouble walking or loss of balance", "Sudden severe headache"]} onChange={setValue} />
            <SelectField label="Bleeding from access site" name="bleeding" value={values.bleeding} options={["No", "Small spot on bandage", "Yes, stopped quickly", "Ongoing", "Heavy", "Bright red blood soaking through dressing", "Did not stop after 10-15 minutes of firm pressure"]} onChange={setValue} />
            <SelectField label="Access-site trend" name="accessSiteTrend" value={values.accessSiteTrend} options={["Improving", "Stable", "Worsening", "Enlarging", "Rapidly expanding", "Fast-growing and painful", "Not sure"]} onChange={setValue} />
            <SelectField label="Limb symptoms on access side" name="limbSymptoms" value={String(values.limbSymptoms ?? "")} options={["No", "Cold limb", "Pale or blue color", "Numbness", "Tingling", "Weakness", "Severe pain", "Not sure"]} onChange={setValue} />
            <SelectField label="Fever or chills" name="fever" value={values.fever} options={["No", "Chills", "Temperature below 100.4 F / 38 C", "Temperature >= 100.4 F / 38 C", "Temperature over 101.5 F"]} onChange={setValue} />
            <SelectField label="Palpitations/rhythm symptoms" name="palpitations" value={values.palpitations} options={["No", "Mild/intermittent", "Brief racing episodes", "Sustained", "Lasting longer than 24 hours", "Associated with dizziness", "Associated with chest pain", "Associated with shortness of breath"]} onChange={setValue} />
            <SelectField label="Swallowing symptoms" name="swallowing" value={values.swallowing} options={["No", "Mild sore throat only", "Painful swallowing", "Trouble swallowing", "Severe swallowing pain"]} onChange={setValue} />
            <SelectField label="Coughing or vomiting blood" name="coughingOrVomitingBlood" value={values.coughingOrVomitingBlood} options={["No", "Coughing blood", "Vomiting blood"]} onChange={setValue} />
            <SelectField label="Medication or blood thinner concern" name="missedBloodThinner" value={values.missedBloodThinner} options={["No", "Missed dose", "Stopped on my own", "Not sure", "Question without missed doses"]} onChange={setValue} />
            <TextArea label="Questions for EP team" name="questionsForTeam" value={values.questionsForTeam} onChange={setValue} />
          </FormSection>
          <button className="min-h-12 rounded-lg bg-navy px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-navy/20" type="submit">
            Show triage result
          </button>
        </form>
        <aside className="lg:sticky lg:top-28 lg:self-start">{submitted ? <TriageResultCard result={result} /> : <div className="rounded-lg border border-slate-200/80 bg-white/95 p-5 text-sm leading-6 text-slate-600 shadow-card">Your protocol-driven result will appear here after you submit the structured triage form.</div>}</aside>
      </div>
    </div>
  );
}
