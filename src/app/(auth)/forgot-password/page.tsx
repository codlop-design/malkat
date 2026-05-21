import ForgotPasswordForm from "@/src/features/auth/components/ForgotPasswordForm";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "نسيت كلمة المرور",
};

export default function ForgotPasswordPage() {
  return (
    <div className="h-auto overflow-y-auto px-4 py-10 md:h-screen md:p-10">
      <div className="mx-auto flex h-full max-w-2xl flex-col gap-10 md:gap-40">
        <p className="text-center text-sm text-[#454545]">
          <Link
            href="/"
            className="flex items-center gap-3 text-xl text-[#454545]"
          >
            <Image
              src="/arrow-left-01-round.svg"
              alt="العودة للرئيسية"
              width={24}
              height={24}
            />
            العودة للرئيسية
          </Link>
        </p>

        <ForgotPasswordForm />
      </div>
    </div>
  );
}
