"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const nav = [
  ["Triage", "/triage"],
  ["Follow-up", "/follow-up"],
  ["Education", "/education"],
  ["Clinician Review Queue", "/admin"],
  ["About", "/about"]
] as const;

export function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-end sm:overflow-visible sm:pb-0">
      {nav.map(([label, href]) => {
        const isActive = pathname === href || pathname.startsWith(`${href}/`);

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-navy focus:outline-none focus:ring-2 focus:ring-teal/30",
              isActive ? "bg-white text-navy shadow-sm ring-1 ring-slate-200" : ""
            )}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
