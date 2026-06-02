import Link from "next/link";

export function FollowUpOptionCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <Link href={href} className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg">
      <h2 className="text-xl font-semibold text-navy">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
      <span className="mt-5 inline-flex rounded-lg bg-teal px-4 py-2 text-sm font-semibold text-white">Start check</span>
    </Link>
  );
}
