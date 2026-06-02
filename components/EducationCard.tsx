export function EducationCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <h2 className="text-lg font-semibold text-navy">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
    </article>
  );
}
