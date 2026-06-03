import type { ReactNode } from "react";

export function FormSection({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="rounded-lg border border-slate-200/80 bg-white/95 p-5 shadow-card sm:p-6">
      <h2 className="text-lg font-semibold tracking-tight text-navy">{title}</h2>
      {description ? <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p> : null}
      <div className="mt-5 grid gap-5">{children}</div>
    </section>
  );
}
