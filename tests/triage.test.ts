import { describe, expect, it } from "vitest";
import { evaluateTriage } from "@/lib/triage/rules";

describe("evaluateTriage", () => {
  it("lets emergency criteria override routine features", () => {
    const result = evaluateTriage({
      symptomCategory: "bruising",
      bleeding: "Yes, did not stop after 10-15 minutes of firm pressure",
      accessSiteFindings: ["Bruising"]
    });

    expect(result.category).toBe("emergency");
  });

  it("escalates missed blood thinner uncertainty to urgent review", () => {
    const result = evaluateTriage({
      symptomCategory: "blood-thinner-question",
      missedBloodThinner: "Missed dose"
    });

    expect(result.category).toBe("urgent");
  });

  it("keeps mild stable symptoms in education when no red flags are present", () => {
    const result = evaluateTriage({
      symptomCategory: "sore-throat",
      severity: "mild",
      accessSiteTrend: "Improving"
    });

    expect(result.category).toBe("education");
  });
});
