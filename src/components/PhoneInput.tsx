"use client";

import Image from "next/image";
import { forwardRef, useId, type ComponentPropsWithoutRef } from "react";

type PhoneInputProps = {
  label?: string;
  error?: string;
} & Omit<ComponentPropsWithoutRef<"input">, "id" | "className" | "type"> & {
    id?: string;
  };

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  function PhoneInput(
    { label = "رقم الجوال", error, id, disabled, ...inputProps },
    ref,
  ) {
    const fallbackId = useId().replace(/:/g, "");
    const inputId = id ?? `phone-${fallbackId}`;

    return (
      <div>
        <label
          htmlFor={inputId}
          className="mb-2 block text-sm font-medium text-black"
        >
          {label}
        </label>

        <div
          className={`flex h-14 items-stretch overflow-hidden rounded-xl border text-sm outline-none focus-within:border-primary${
            error ? " border-red-600" : " border-[#E5E5E5]"
          }`}
        >
          <input
            ref={ref}
            id={inputId}
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            disabled={disabled}
            placeholder="501234567"
            className="min-w-0 flex-1 border-0 bg-transparent p-3 text-[#717171] outline-none placeholder:text-[#717171] disabled:cursor-not-allowed disabled:opacity-60 dir-ltr"
            dir="ltr"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...inputProps}
          />
          <div className="flex shrink-0 items-center gap-2 border-s border-[#E5E5E5] bg-[#FAFAFA] px-3">
            <span
              className="dir-ltr select-none text-sm font-medium text-black"
              dir="ltr"
            >
              +966
            </span>
            <Image
              src="/sa.svg"
              alt=""
              width={28}
              height={19}
              className="rounded-full object-cover"
              unoptimized
            />
          </div>
        </div>

        {error ? (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-600">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

PhoneInput.displayName = "PhoneInput";

export default PhoneInput;
