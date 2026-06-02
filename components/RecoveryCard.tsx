import Link from "next/link";

type RecoveryCardProps = {
  title: string;
  description: string;
  href: string;
  tone?: "default" | "urgent";
};

export function RecoveryCard({ title, description, href, tone = "default" }: RecoveryCardProps) {
  return (
    <Link href={href} className="block rounded-lg border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className={tone === "urgent" ? "mb-4 h-1.5 w-14 rounded-full bg-coral" : "mb-4 h-1.5 w-14 rounded-full bg-teal"} />
      <h3 className="text-lg font-semibold text-navy">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </Link>
  );
}
