export function EducationCard({ title, body, category }: { title: string; body: string; category?: string }) {
  return (
    <article className="rounded-lg border border-slate-200/80 bg-white/95 p-5 shadow-card">
      {category ? <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-teal">{category}</p> : null}
      <h2 className="text-lg font-semibold tracking-tight text-navy">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
    </article>
  );
}
