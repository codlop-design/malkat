"use client";

import { GoogleLogin, useGoogleOAuth } from "@react-oauth/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { completeLoginSuccess } from "@/src/features/auth/completeLoginSuccess";
import { useAuth } from "@/src/features/auth/context/AuthProvider";
import { loginWithGoogle } from "@/src/features/auth/login";

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

function GoogleAuthButton() {
  const router = useRouter();
  const auth = useAuth();
  const { scriptLoadedSuccessfully } = useGoogleOAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const [buttonWidth, setButtonWidth] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) {
      return;
    }

    const updateWidth = () => {
      setButtonWidth(element.offsetWidth);
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

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
    <div ref={containerRef} className="relative h-14 w-full">
      <div
        className="pointer-events-none flex h-14 w-full items-center justify-center gap-2 rounded-xl border border-primary text-base font-medium text-[#000000]"
        aria-hidden
      >
        <Image src="/google.svg" alt="" width={24} height={24} />
        <span>{loading ? "جاري تسجيل الدخول..." : "متابعة باستخدام جوجل"}</span>
      </div>

      {buttonWidth > 0 && scriptLoadedSuccessfully && !loading ? (
        <div className="absolute inset-0 z-10 overflow-hidden opacity-[0.01]">
          <GoogleLogin
            width={buttonWidth}
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
            theme="outline"
          />
        </div>
      ) : null}
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
