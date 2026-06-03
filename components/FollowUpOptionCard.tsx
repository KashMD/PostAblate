import Link from "next/link";

export function FollowUpOptionCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <Link href={href} className="rounded-lg border border-slate-200/80 bg-white/95 p-6 shadow-card transition hover:-translate-y-0.5 hover:border-teal/30 hover:shadow-soft focus:outline-none focus:ring-4 focus:ring-teal/15">
      <div className="mb-4 h-1.5 w-12 rounded-full bg-teal" />
      <h2 className="text-xl font-semibold tracking-tight text-navy">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
      <span className="mt-5 inline-flex min-h-11 items-center rounded-lg bg-teal px-4 py-2 text-sm font-semibold text-white shadow-sm">Start check</span>
    </Link>
  );
}
