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

const accessSiteSymptomOptions = [
  "None",
  "Pain",
  "Bruising",
  "Swelling",
  "Lump",
  "Bleeding",
  "Drainage",
  "Redness or warmth",
  "Red streaks",
  "Severe pain",
  "Rapidly expanding swelling",
  "Fast-growing painful lump",
  "Other / not sure"
];

function parseSelections(value: unknown) {
  if (Array.isArray(value)) return value.map(String);
  return String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function AccessSiteSymptomsField({
  value,
  onChange
}: {
  value: unknown;
  onChange: (name: string, value: string) => void;
}) {
  const selected = parseSelections(value);

  const toggle = (option: string) => {
    let next: string[];

    if (option === "None") {
      next = selected.includes("None") ? [] : ["None"];
    } else {
      const withoutNone = selected.filter((item) => item !== "None");
      next = withoutNone.includes(option)
        ? withoutNone.filter((item) => item !== option)
        : [...withoutNone, option];
    }

    if (!next.length || next.includes("None")) onChange("accessSiteSymptomTrend", "");
    onChange("accessSiteFindings", next.join(", "));
  };

  return (
    <fieldset className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4">
      <legend className="px-1 text-sm font-semibold text-navy">Access-site symptoms</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {accessSiteSymptomOptions.map((option) => (
          <label key={option} className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-navy">
            <input
              name="accessSiteFindings"
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => toggle(option)}
              className="h-4 w-4 rounded border-slate-300 text-teal focus:ring-teal"
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function OneWeekPage() {
  const [values, setValues] = useState<TriageAnswer>({});
  const [submitted, setSubmitted] = useState(false);
  const setValue = (name: string, value: string) => setValues((current) => ({ ...current, [name]: value }));
  const accessSiteSymptoms = parseSelections(values.accessSiteFindings);
  const showAccessSiteTrend = accessSiteSymptoms.length > 0 && !accessSiteSymptoms.includes("None");
  const result: TriageResult = useMemo(() => {
    const evaluated = evaluateTriage(values);
    return {
      ...evaluated,
      clinicianSummary: buildFollowUpSummary("PostAblate 1-Week Recovery Check Summary", values, evaluated.category)
    };
  }, [values]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader eyebrow="1-Week Recovery Check" title="1-Week Recovery Check" description="A short check on healing, activity, symptoms, and medication questions about one week after AF ablation." />
      <div className="mb-6"><SafetyBanner /></div>
      <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <form className="grid gap-5" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
          <FormSection title="Procedure and access site">
            <TextField label="Date of AF ablation" name="ablationDate" type="date" value={values.ablationDate} onChange={setValue} />
            <TextField label="Today's date" name="todayDate" type="date" value={String(values.todayDate ?? "")} onChange={setValue} />
            <AccessSiteField value={values.accessSite} otherValue={String(values.otherAccessSite ?? "")} onChange={setValue} />
            <SelectField label="Is the catheter site healing?" name="siteHealing" value={String(values.siteHealing ?? "")} options={["Yes", "Mostly", "No", "Not sure"]} onChange={setValue} />
          </FormSection>
          <FormSection title="Access-site safety">
            <AccessSiteSymptomsField value={values.accessSiteFindings} onChange={setValue} />
            {showAccessSiteTrend ? (
              <SelectField label="Are access-site symptoms improving, stable, or worsening?" name="accessSiteSymptomTrend" value={String(values.accessSiteSymptomTrend ?? "")} options={["Improving", "Stable", "Worsening", "Not sure"]} onChange={setValue} />
            ) : null}
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
          <button className="rounded-lg bg-navy px-5 py-3 text-sm font-semibold text-white shadow-sm" type="submit">Submit 1-Week Recovery Check</button>
        </form>
        <aside className="lg:sticky lg:top-28 lg:self-start">{submitted ? <TriageResultCard result={result} /> : <div className="rounded-lg border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-600 shadow-soft">Your 1-week recovery category and clinician summary will appear here after submission.</div>}</aside>
      </div>
    </div>
  );
}
