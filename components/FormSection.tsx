import type { ReactNode } from "react";

export function FormSection({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <h2 className="text-lg font-semibold text-navy">{title}</h2>
      {description ? <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p> : null}
      <div className="mt-5 grid gap-4">{children}</div>
    </section>
  );
}
