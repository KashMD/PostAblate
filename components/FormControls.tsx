"use client";

import { useId } from "react";
import { accessSiteOptions, formatAccessSites, parseAccessSites } from "@/lib/access-sites";

type FieldProps = {
  label: string;
  name: string;
  value?: string;
  options?: ReadonlyArray<string | { label: string; value: string }>;
  type?: string;
  onChange: (name: string, value: string) => void;
};

export function TextField({ label, name, value = "", type = "text", onChange }: FieldProps) {
  const id = useId();

  return (
    <label htmlFor={id} className="grid min-w-0 gap-2 text-sm font-semibold text-navy">
      {label}
      <input
        id={id}
        name={name}
        className="min-h-12 w-full min-w-0 rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-teal focus:ring-4 focus:ring-teal/15 sm:text-sm"
        type={type}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
      />
    </label>
  );
}

export function TextArea({ label, name, value = "", onChange }: FieldProps) {
  const id = useId();

  return (
    <label htmlFor={id} className="grid min-w-0 gap-2 text-sm font-semibold text-navy">
      {label}
      <textarea
        id={id}
        name={name}
        className="min-h-28 w-full min-w-0 rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-teal focus:ring-4 focus:ring-teal/15 sm:text-sm"
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
      />
    </label>
  );
}

export function SelectField({ label, name, value = "", options = [], onChange }: FieldProps) {
  const id = useId();

  return (
    <label htmlFor={id} className="grid min-w-0 gap-2 text-sm font-semibold text-navy">
      {label}
      <select
        id={id}
        name={name}
        className="min-h-12 w-full min-w-0 rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-800 outline-none transition focus:border-teal focus:ring-4 focus:ring-teal/15 sm:text-sm"
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
      >
        <option value="">Select one</option>
        {options.map((option) => {
          const value = typeof option === "string" ? option : option.value;
          const label = typeof option === "string" ? option : option.label;

          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>
    </label>
  );
}

export function AccessSiteField({
  value = "",
  otherValue = "",
  onChange
}: {
  value?: string;
  otherValue?: string;
  onChange: (name: string, value: string) => void;
}) {
  const groupId = useId();
  const otherId = useId();
  const selected = parseAccessSites(value);

  const toggle = (option: string) => {
    let next: string[];

    if (option === "Not sure") {
      next = selected.includes("Not sure") ? [] : ["Not sure"];
      onChange("otherAccessSite", "");
    } else {
      const withoutNotSure = selected.filter((item) => item !== "Not sure");
      next = withoutNotSure.includes(option)
        ? withoutNotSure.filter((item) => item !== option)
        : [...withoutNotSure, option];
      if (option === "Other" && selected.includes("Other")) onChange("otherAccessSite", "");
    }

    onChange("accessSite", formatAccessSites(next));
  };

  return (
    <fieldset className="grid gap-3 rounded-lg border border-slate-200 bg-clinical/70 p-4">
      <legend className="px-1 text-sm font-semibold text-navy">Where were your catheter insertion sites?</legend>
      <p id={`${groupId}-hint`} className="text-sm text-slate-600">Select all that apply.</p>
      <div className="grid gap-2 sm:grid-cols-2" aria-describedby={`${groupId}-hint`}>
        {accessSiteOptions.map((option) => {
          const id = `${groupId}-${option.toLowerCase().replaceAll(" ", "-")}`;

          return (
            <label key={option} htmlFor={id} className="flex min-h-12 min-w-0 items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-navy transition hover:border-teal/40 hover:bg-sky/30">
              <input
                id={id}
                name="accessSite"
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggle(option)}
                className="h-5 w-5 rounded border-slate-300 text-teal focus:ring-teal"
              />
              {option}
            </label>
          );
        })}
      </div>
      {selected.includes("Other") ? (
        <label htmlFor={otherId} className="grid min-w-0 gap-2 text-sm font-semibold text-navy">
          Other access site, if known
          <input
            id={otherId}
            name="otherAccessSite"
            className="min-h-12 w-full min-w-0 rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-800 outline-none transition focus:border-teal focus:ring-4 focus:ring-teal/15 sm:text-sm"
            value={otherValue}
            onChange={(event) => onChange("otherAccessSite", event.target.value)}
          />
        </label>
      ) : null}
    </fieldset>
  );
}
