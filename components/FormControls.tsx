"use client";

import { useId } from "react";

type FieldProps = {
  label: string;
  name: string;
  value?: string;
  options?: Array<string | { label: string; value: string }>;
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
