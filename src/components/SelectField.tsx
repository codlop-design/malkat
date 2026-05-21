"use client";

import { forwardRef, type SelectHTMLAttributes } from "react";

type SelectFieldProps = {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "id" | "className" | "children"> & {
    id?: string;
  };

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  function SelectField(
    {
      label,
      error,
      options,
      placeholder = "اختر",
      id,
      disabled,
      ...selectProps
    },
    ref,
  ) {
    const selectId = id ?? label.replace(/\s+/g, "-");

    return (
      <div>
        <label
          htmlFor={selectId}
          className="mb-2 block text-sm font-medium text-black"
        >
          {label}
        </label>

        <select
          ref={ref}
          id={selectId}
          disabled={disabled}
          className={`h-14 w-full appearance-none rounded-xl border bg-white bg-size-[16px] bg-position-[left_1rem_center] bg-no-repeat p-3 text-sm text-[#717171] outline-none transition-colors focus:border-primary disabled:cursor-not-allowed disabled:opacity-60${
            error ? " border-red-600" : " border-[#E5E5E5]"
          }`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23454545' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
          }}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${selectId}-error` : undefined}
          {...selectProps}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {error ? (
          <p id={`${selectId}-error`} className="mt-1.5 text-sm text-red-600">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
