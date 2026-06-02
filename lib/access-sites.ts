export const accessSiteOptions = ["Left groin", "Right groin", "Left neck", "Right neck", "Other", "Not sure"] as const;

export type AccessSiteOption = (typeof accessSiteOptions)[number];

export function parseAccessSites(value?: string) {
  return value
    ? value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];
}

export function formatAccessSites(values: readonly string[]) {
  return values.join(", ");
}
