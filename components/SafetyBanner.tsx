export function SafetyBanner() {
  return (
    <div className="rounded-lg border border-teal/20 bg-sky px-4 py-3 text-sm text-navy">
      <strong>MVP demonstration only.</strong> Not monitored in real time. Not for real patient care.
      <br />
      <strong>Safety note:</strong> PostAblate is educational and protocol-driven. It does not diagnose symptoms, replace your EP team, or replace emergency care.
    </div>
  );
}
