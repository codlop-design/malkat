import LoginForm from "@/src/features/auth/components/LoginForm";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "تسجيل الدخول",
};

export default function LoginPage() {
  return (
    <div className="md:h-screen h-auto overflow-y-auto px-4 py-10 md:p-10">
      <div className="max-w-2xl mx-auto flex flex-col md:gap-40 gap-10">
        <p className="text-center text-sm text-[#454545]">
          <Link
            href="/"
            className="text-[#454545] flex items-center text-xl gap-3"
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

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <p className="text-2xl font-medium text-center">مرحباً بعودتك</p>
            <p className="text-base text-[#454545] text-center">
              يرجى إدخال تفاصيل الدخول الخاصة بك.
            </p>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
