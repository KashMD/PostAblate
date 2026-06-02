export const accessSiteOptions = ["Groin", "Neck", "More than one site", "Not sure"] as const;

export type AccessSiteOption = (typeof accessSiteOptions)[number];
