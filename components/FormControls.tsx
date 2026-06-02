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
    <label htmlFor={id} className="grid gap-2 text-sm font-medium text-navy">
      {label}
      <input
        id={id}
        name={name}
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/20"
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
    <label htmlFor={id} className="grid gap-2 text-sm font-medium text-navy">
      {label}
      <textarea
        id={id}
        name={name}
        className="min-h-24 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/20"
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
      />
    </label>
  );
}

export function SelectField({ label, name, value = "", options = [], onChange }: FieldProps) {
  const id = useId();

  return (
    <label htmlFor={id} className="grid gap-2 text-sm font-medium text-navy">
      {label}
      <select
        id={id}
        name={name}
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/20"
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
    <fieldset className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4">
      <legend className="px-1 text-sm font-semibold text-navy">Where were your catheter insertion sites?</legend>
      <p id={`${groupId}-hint`} className="text-sm text-slate-600">Select all that apply.</p>
      <div className="grid gap-2 sm:grid-cols-2" aria-describedby={`${groupId}-hint`}>
        {accessSiteOptions.map((option) => {
          const id = `${groupId}-${option.toLowerCase().replaceAll(" ", "-")}`;

          return (
            <label key={option} htmlFor={id} className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-navy">
              <input
                id={id}
                name="accessSite"
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggle(option)}
                className="h-4 w-4 rounded border-slate-300 text-teal focus:ring-teal"
              />
              {option}
            </label>
          );
        })}
      </div>
      {selected.includes("Other") ? (
        <label htmlFor={otherId} className="grid gap-2 text-sm font-medium text-navy">
          Other access site, if known
          <input
            id={otherId}
            name="otherAccessSite"
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/20"
            value={otherValue}
            onChange={(event) => onChange("otherAccessSite", event.target.value)}
          />
        </label>
      ) : null}
    </fieldset>
  );
}
