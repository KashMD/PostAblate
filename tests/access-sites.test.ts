import { describe, expect, it } from "vitest";
import { accessSiteOptions } from "@/lib/access-sites";

describe("accessSiteOptions", () => {
  it("limits PostAblate access-site choices to the AF ablation MVP options", () => {
    expect(accessSiteOptions).toEqual(["Groin", "Neck", "More than one site", "Not sure"]);
    expect(accessSiteOptions).not.toContain("Wrist");
    expect(accessSiteOptions).not.toContain("Arm");
  });
});
