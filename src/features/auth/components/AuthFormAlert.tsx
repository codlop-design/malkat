import Link from "next/link";

import { isInactiveAccountMessage } from "@/src/features/auth/utils/authErrors";

type AuthFormAlertProps = {
  message: string | null;
};

export default function AuthFormAlert({ message }: AuthFormAlertProps) {
  if (!message) return null;

  const inactive = isInactiveAccountMessage(message);

  return (
    <div
      role="alert"
      className={`rounded-xl border px-4 py-3 text-sm leading-relaxed ${
        inactive
          ? "border-amber-200 bg-amber-50 text-amber-950"
          : "border-red-200 bg-red-50 text-red-800"
      }`}
    >
      <p>{message}</p>
      {inactive ? (
        <Link
          href="/contact"
          className="mt-2 inline-block font-medium text-primary hover:underline"
        >
          تواصل مع الدعم
        </Link>
      ) : null}
    </div>
  );
}
