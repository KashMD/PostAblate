import type { Metadata } from "next";
import Link from "next/link";
import { NavLinks } from "@/components/NavLinks";
import "./globals.css";

export const metadata: Metadata = {
  title: "PostAblate",
  description: "Guided recovery after AF ablation."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-clinical font-sans antialiased">
        <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-clinical/90 backdrop-blur-xl">
          <nav className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <Link href="/" className="flex items-center gap-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal/30">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-[linear-gradient(135deg,#0f2742,#0e9488)] text-sm font-bold text-white shadow-soft">PA</span>
              <span>
                <span className="block text-lg font-semibold tracking-tight text-navy">PostAblate</span>
                <span className="block text-xs text-slate-500">Guided recovery after AF ablation</span>
              </span>
            </Link>
            <NavLinks />
          </nav>
          <div className="border-t border-coral/15 bg-red-50/80 px-4 py-2 text-center text-xs font-medium text-red-950">
            MVP demonstration only. Not monitored in real time. Not for real patient care. If you have emergency symptoms, call 911 or seek emergency care now.
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
