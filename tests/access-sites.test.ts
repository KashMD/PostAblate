import { describe, expect, it } from "vitest";
import { accessSiteOptions } from "@/lib/access-sites";
import { buildFollowUpSummary, buildTriageSummary } from "@/lib/triage/summary";

describe("accessSiteOptions", () => {
  it("limits PostAblate access-site choices to the AF ablation MVP options", () => {
    expect(accessSiteOptions).toEqual(["Groin", "Neck", "More than one site", "Not sure"]);
    expect(accessSiteOptions).not.toContain("Wrist");
    expect(accessSiteOptions).not.toContain("Arm");
  });

  it("uses the updated clinician summary labels", () => {
    expect(buildTriageSummary({}, "routine")).toContain("PostAblate Symptom Triage Summary");
    expect(buildFollowUpSummary("PostAblate Next-Day Safety Check Summary", {}, "routine")).toContain("PostAblate Next-Day Safety Check Summary");
    expect(buildFollowUpSummary("PostAblate 1-Week Recovery Check Summary", {}, "routine")).toContain("PostAblate 1-Week Recovery Check Summary");
    expect(buildFollowUpSummary("PostAblate 30-Day Recovery Follow-Up Summary", {}, "routine")).toContain("PostAblate 30-Day Recovery Follow-Up Summary");
  });
});
