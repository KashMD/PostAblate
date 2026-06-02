import { describe, expect, it } from "vitest";
import { accessSiteOptions, formatAccessSites, parseAccessSites } from "@/lib/access-sites";
import { buildFollowUpSummary, buildTriageSummary } from "@/lib/triage/summary";

describe("accessSiteOptions", () => {
  it("limits PostAblate access-site choices to the AF ablation MVP options", () => {
    expect(accessSiteOptions).toEqual(["Left groin", "Right groin", "Left neck", "Right neck", "Other", "Not sure"]);
    expect(accessSiteOptions).not.toContain("Groin");
    expect(accessSiteOptions).not.toContain("Neck");
    expect(accessSiteOptions).not.toContain("More than one site");
    expect(accessSiteOptions).not.toContain("Wrist");
    expect(accessSiteOptions).not.toContain("Arm");
  });

  it("formats and parses multiple selected access sites without changing safety rules", () => {
    const displayValue = formatAccessSites(["Left groin", "Right neck", "Other"]);

    expect(displayValue).toBe("Left groin, Right neck, Other");
    expect(parseAccessSites(displayValue)).toEqual(["Left groin", "Right neck", "Other"]);
  });

  it("uses the updated clinician summary labels", () => {
    expect(buildTriageSummary({}, "routine")).toContain("PostAblate Symptom Triage Summary");
    expect(buildFollowUpSummary("PostAblate Next-Day Safety Check Summary", {}, "routine")).toContain("PostAblate Next-Day Safety Check Summary");
    expect(buildFollowUpSummary("PostAblate 1-Week Recovery Check Summary", {}, "routine")).toContain("PostAblate 1-Week Recovery Check Summary");
    expect(buildFollowUpSummary("PostAblate 30-Day Recovery Follow-Up Summary", {}, "routine")).toContain("PostAblate 30-Day Recovery Follow-Up Summary");
  });
});
