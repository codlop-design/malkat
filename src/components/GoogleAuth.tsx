"use client";

import { GoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { completeLoginSuccess } from "@/src/features/auth/completeLoginSuccess";
import { useAuth } from "@/src/features/auth/context/AuthProvider";
import { loginWithGoogle } from "@/src/features/auth/login";

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

function GoogleAuthButton() {
  const router = useRouter();
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const googleLoginRef = useRef<HTMLDivElement>(null);

  async function handleGoogleCredential(credential: string) {
    setLoading(true);
    auth.beginAuthTransition();
    const result = await loginWithGoogle(credential);
    setLoading(false);

    if (!(await completeLoginSuccess(auth, router, result))) {
      toast.error(result.message);
    }
  }

  function handleGoogleClick() {
    if (loading) return;

    const googleButton = googleLoginRef.current?.querySelector(
      '[role="button"]',
    ) as HTMLElement | null;

    if (!googleButton) {
      toast.error("تعذر تحميل تسجيل الدخول عبر جوجل");
      return;
    }

    googleButton.click();
  }

  return (
    <div className="relative w-full">
      <button
        type="button"
        disabled={loading}
        onClick={handleGoogleClick}
        className="flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-primary text-base font-medium text-[#000000] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <Image src="/google.svg" alt="" width={24} height={24} aria-hidden />
        <span>{loading ? "جاري تسجيل الدخول..." : "متابعة باستخدام جوجل"}</span>
      </button>

      <div
        ref={googleLoginRef}
        className="pointer-events-none fixed top-0 left-[-9999px] opacity-0"
        aria-hidden
      >
        <GoogleLogin
          onSuccess={(response) => {
            if (!response.credential) {
              toast.error("تعذر الحصول على بيانات جوجل");
              return;
            }
            void handleGoogleCredential(response.credential);
          }}
          onError={() => {
            toast.error("تعذر تسجيل الدخول عبر جوجل");
          }}
          useOneTap={false}
          type="standard"
          size="large"
          text="continue_with"
        />
      </div>
    </div>
  );
}

export default function GoogleAuth() {
  if (!googleClientId) {
    return (
      <button
        type="button"
        disabled
        className="flex h-14 w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-primary text-base font-medium text-[#000000] opacity-70"
      >
        <Image src="/google.svg" alt="Google" width={24} height={24} />
        <span>متابعة باستخدام جوجل</span>
      </button>
    );
  }

  return <GoogleAuthButton />;
}
