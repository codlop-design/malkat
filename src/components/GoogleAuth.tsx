"use client";

import { GoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { completeLoginSuccess } from "@/src/features/auth/completeLoginSuccess";
import { useAuth } from "@/src/features/auth/context/AuthProvider";
import { loginWithGoogle } from "@/src/features/auth/login";

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

function GoogleAuthButton() {
  const router = useRouter();
  const auth = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleGoogleCredential(credential: string) {
    setLoading(true);
    auth.beginAuthTransition();
    const result = await loginWithGoogle(credential);
    setLoading(false);

    if (!(await completeLoginSuccess(auth, router, result))) {
      toast.error(result.message);
    }
  }

  return (
    <div className="relative w-full h-14">
      <button
        type="button"
        disabled={loading}
        tabIndex={-1}
        aria-hidden
        className="w-full h-14 flex items-center justify-center gap-2 rounded-xl text-base font-medium text-[#000000] border border-primary pointer-events-none disabled:opacity-70"
      >
        <Image src="/google.svg" alt="" width={24} height={24} />
        <span>{loading ? "جاري تسجيل الدخول..." : "متابعة باستخدام جوجل"}</span>
      </button>
      <div className="absolute inset-0 opacity-0 overflow-hidden [&>div]:w-full! [&>div]:h-14! [&_iframe]:w-full! [&_iframe]:h-14!">
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
          width="400"
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
        className="w-full h-14 flex items-center justify-center gap-2 rounded-xl text-base font-medium text-[#000000] border border-primary opacity-70 cursor-not-allowed"
      >
        <Image src="/google.svg" alt="Google" width={24} height={24} />
        <span>متابعة باستخدام جوجل</span>
      </button>
    );
  }

  return <GoogleAuthButton />;
}
