import { EducationCard } from "@/components/EducationCard";
import { EmergencyBanner } from "@/components/EmergencyBanner";
import { PageHeader } from "@/components/PageHeader";

const topics = [
  ["Expected recovery", "Your recovery after AF ablation", "Most recovery plans focus on access-site healing, rhythm symptoms, activity limits, medication safety, and knowing when to call the EP team."],
  ["Expected recovery", "Common symptoms after AF ablation", "Mild fatigue, mild chest soreness, mild throat irritation, bruising, and brief palpitations can occur. Symptoms should gradually improve."],
  ["Expected recovery", "What symptoms are expected?", "Mild and improving symptoms may be part of recovery, but worsening, severe, prolonged, unusual, or concerning symptoms should be reported."],
  ["Warning symptoms", "What symptoms are not normal?", "Fainting, severe chest pain, severe shortness of breath, stroke-like symptoms, heavy bleeding, rapidly increasing swelling, cold or weak limbs, trouble swallowing, coughing blood, vomiting blood, or fever with concerning symptoms need urgent attention."],
  ["Expected recovery", "Palpitations during the healing period", "After AF ablation, the heart may be irritated while it heals. Extra beats, skipped beats, fluttering, brief racing episodes, or even episodes of AF can occur during the healing period. These symptoms can occur for weeks and, for some patients, on and off for up to 3 to 6 months. However, prolonged, severe, worsening, or concerning symptoms should be reported to your EP team."],
  ["Access site", "Catheter access-site care", "Follow your discharge instructions for dressing, bathing, movement, and activity limits. Contact your EP team for worsening pain, redness, warmth, drainage, swelling, or bruising."],
  ["Access site", "Bleeding from the catheter site", "If bleeding occurs from the catheter site, lie down and apply firm pressure directly over the site for 10 to 15 minutes. If the bleeding does not stop, call 911 or seek immediate medical care. Keep pressure on the site until help arrives. Do not drive yourself if you feel faint, weak, or unstable."],
  ["Access site", "Bruising, swelling, and small lumps", "Mild bruising or a small stable lump can occur after catheter access. Rapidly expanding swelling, a fast-growing painful lump, or severe access-site pain should be treated as urgent."],
  ["Medications", "Blood thinner safety after AF ablation", "Your EP team will tell you which medicines to continue, stop, restart, or change. Do not stop or restart any blood thinner, antiarrhythmic, heart medication, aspirin, or antiplatelet medicine unless your doctor or EP team tells you to."],
  ["Medications", "Medication safety after ablation", "Use your discharge medication list and call your EP team for uncertainty. This app does not provide medication dosing instructions or medication changes."],
  ["Medications", "Pain control and NSAID caution", "Ask your care team before using NSAIDs such as ibuprofen or naproxen, especially if you take blood thinners or have kidney, stomach, bleeding, or heart failure concerns."],
  ["Activity", "Sedation and anesthesia precautions", "Follow discharge instructions about driving, alcohol, decision-making, and supervision after sedation or anesthesia."],
  ["Activity", "Activity, lifting, driving, work, exercise, sex, and travel", "Activity instructions vary by procedure and patient. Follow your discharge instructions and contact your EP team before resuming activities if symptoms worsen or concern you."],
  ["Warning symptoms", "Chest pain after AF ablation", "Mild chest soreness may occur, but severe, persistent, worsening, or pressure-like pain, especially with shortness of breath, sweating, nausea, weakness, dizziness, or radiation, needs urgent assessment."],
  ["Warning symptoms", "Shortness of breath after AF ablation", "Mild shortness of breath should be monitored. New, worsening, or severe shortness of breath should be reviewed urgently or emergently depending on severity."],
  ["Warning symptoms", "Special warning symptoms after AF/left atrial ablation", "Trouble swallowing, painful swallowing with severe symptoms, coughing blood, vomiting blood, neurologic symptoms, or severe reflux-like chest discomfort should be escalated promptly."],
  ["Warning symptoms", "Fever, chills, confusion, or neurologic symptoms", "Fever, chills, confusion, weakness, speech difficulty, vision loss, severe headache, or balance trouble should not be ignored after AF ablation."],
  ["Warning symptoms", "Fluid retention and heart failure symptoms", "Sudden weight gain, new swelling, or trouble lying flat because of breathing should be reviewed by your care team."],
  ["Follow-up", "When to call the EP team", "Call for same-day review if symptoms are worsening, prolonged, severe, unusual, medication-related, or concerning, even if they do not match emergency criteria."],
  ["Follow-up", "Preparing for follow-up", "Track symptom timing, duration, heart rate if known, rhythm recordings, medication questions, ER visits, hospitalizations, and your biggest concerns for the EP team."]
] as const;

export default function EducationPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader eyebrow="Education" title="AF ablation recovery education" description="Concise, safety-first education focused only on atrial fibrillation ablation recovery." />
      <div className="mb-6"><EmergencyBanner /></div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {topics.map(([category, title, body]) => <EducationCard key={title} category={category} title={title} body={body} />)}
      </div>
    </div>
  );
}
