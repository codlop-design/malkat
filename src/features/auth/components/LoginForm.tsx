"use client";

import { useState } from "react";
import EmailLogin from "@/src/features/auth/components/EmailLogin";
import PhoneLogin from "@/src/features/auth/components/PhoneLogin";
import Link from "next/link";

export default function LoginForm() {
  const [mode, setMode] = useState<"email" | "phone">("email");

  return (
    <div className="flex flex-col gap-4">
      {mode === "email" ? (
        <EmailLogin onContinueWithPhone={() => setMode("phone")} />
      ) : (
        <PhoneLogin onContinueWithEmail={() => setMode("email")} />
      )}

      <div className="flex items-center justify-center gap-2">
        <span className="text-sm text-[#454545]">ليس لديك حساب؟</span>
        <Link
          href="/register"
          className="text-sm text-[#454545] hover:underline"
        >
          انشئ حساب
        </Link>
      </div>
    </div>
  );
}
