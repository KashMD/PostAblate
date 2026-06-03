"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormSection } from "@/components/FormSection";
import { AccessSiteField, SelectField, TextField } from "@/components/FormControls";
import { PageHeader } from "@/components/PageHeader";
import { SafetyBanner } from "@/components/SafetyBanner";

const yesNoSure = ["Yes", "No", "Not sure"];
const bloodThinners = ["Warfarin/Coumadin", "Apixaban/Eliquis", "Rivaroxaban/Xarelto", "Dabigatran/Pradaxa", "Edoxaban/Savaysa", "Aspirin", "Clopidogrel/Plavix", "Ticagrelor/Brilinta", "Prasugrel/Effient", "Other", "Not sure"];

export default function IntakePage() {
  const [values, setValues] = useState<Record<string, string>>({ procedureType: "AF ablation" });
  const router = useRouter();
  const setValue = (name: string, value: string) => setValues((current) => ({ ...current, [name]: value }));

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader eyebrow="Intake" title="AF ablation recovery intake" description="This intake captures structured procedure details for the PostAblate AF ablation recovery pathway." />
      <div className="mb-6 grid gap-3">
        <SafetyBanner />
        <p className="rounded-lg border border-slate-200/80 bg-white/95 p-4 text-sm leading-6 text-slate-600 shadow-sm">This intake does not replace your discharge instructions or EP team&apos;s advice.</p>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          router.push("/triage");
        }}
      >
        <FormSection title="Procedure details" description="AF ablation is fixed for this MVP. Other EP procedure pathways are not active.">
          <TextField label="Procedure type" name="procedureType" value={values.procedureType} onChange={setValue} />
          <TextField label="Date of AF ablation" name="procedureDate" type="date" value={values.procedureDate} onChange={setValue} />
          <AccessSiteField value={values.accessSite} otherValue={String(values.otherAccessSite ?? "")} onChange={setValue} />
          <SelectField label="Discharge type" name="dischargeType" value={values.dischargeType} options={["Same day", "Overnight", "Longer hospitalization", "Not sure"]} onChange={setValue} />
        </FormSection>
        <div className="mt-5">
          <FormSection title="Medication and complication context">
            <SelectField label="On blood thinner" name="anticoagulantStatus" value={values.anticoagulantStatus} options={yesNoSure} onChange={setValue} />
            <SelectField label="Blood thinner/antiplatelet, if known" name="anticoagulantName" value={values.anticoagulantName} options={bloodThinners} onChange={setValue} />
            <SelectField label="Antiarrhythmic or rhythm medication" name="antiarrhythmicStatus" value={values.antiarrhythmicStatus} options={yesNoSure} onChange={setValue} />
            <SelectField label="Known complications" name="knownComplications" value={values.knownComplications} options={["None", "Bleeding", "Pericardial effusion", "Stroke/TIA", "Vascular complication", "Other", "Not sure"]} onChange={setValue} />
          </FormSection>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button type="submit" className="min-h-12 rounded-lg bg-navy px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-navy/20">Continue to symptom triage</button>
          <Link href="/follow-up" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-teal/30 bg-white px-5 py-3 text-sm font-semibold text-teal shadow-sm transition hover:bg-teal hover:text-white focus:outline-none focus:ring-4 focus:ring-teal/15">Go to recovery overview</Link>
        </div>
      </form>
    </div>
  );
}
