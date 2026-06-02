import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "PostAblate",
  description: "Guided recovery after AF ablation."
};

const nav = [
  ["Triage", "/triage"],
  ["Follow-up", "/follow-up"],
  ["Education", "/education"],
  ["Clinician Review Queue", "/admin"],
  ["About", "/about"]
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
          <nav className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <Link href="/" className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-navy text-sm font-bold text-white">PA</span>
              <span>
                <span className="block text-lg font-semibold text-navy">PostAblate</span>
                <span className="block text-xs text-slate-500">Guided recovery after AF ablation</span>
              </span>
            </Link>
            <div className="flex flex-wrap gap-2">
              {nav.map(([label, href]) => (
                <Link key={href} href={href} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-clinical hover:text-navy">
                  {label}
                </Link>
              ))}
            </div>
          </nav>
          <div className="border-t border-slate-200 bg-red-50 px-4 py-2 text-center text-xs font-medium text-red-950">
            MVP demonstration only. Not monitored in real time. Not for real patient care. If you have emergency symptoms, call 911 or seek emergency care now.
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
