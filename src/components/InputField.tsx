"use client";

import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState, type InputHTMLAttributes } from "react";

type InputFieldProps = {
  label: string;
  error?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "className"> & {
    id?: string;
  };

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField(
    { label, error, id, type = "text", disabled, ...inputProps },
    ref,
  ) {
    const inputId = id ?? label.replace(/\s+/g, "-");
    const isPassword = type === "password";
    const [showPassword, setShowPassword] = useState(false);
    const inputType = isPassword && showPassword ? "text" : type;

    return (
      <div>
        <label
          htmlFor={inputId}
          className="mb-2 block text-sm font-medium text-black"
        >
          {label}
        </label>

        <div className={isPassword ? "relative" : undefined}>
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            disabled={disabled}
            className={`w-full h-14 rounded-xl border text-[#717171] border-[#E5E5E5] p-3 text-sm outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60${isPassword ? " pe-12" : ""}`}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...inputProps}
          />

          {isPassword && (
            <button
              type="button"
              disabled={disabled}
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute cursor-pointer inset-e-3 top-1/2 -translate-y-1/2 text-[#454545] disabled:cursor-not-allowed disabled:opacity-60"
              aria-label={
                showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"
              }
            >
              {showPassword ? (
                <EyeOff className="size-5" strokeWidth={1.75} />
              ) : (
                <Eye className="size-5" strokeWidth={1.75} />
              )}
            </button>
          )}
        </div>

        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  },
);
