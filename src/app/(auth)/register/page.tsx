import RegisterForm from "@/src/features/auth/components/RegisterForm";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <div className="md:h-screen h-auto overflow-y-auto px-4 py-10 md:p-10">
      <div className="max-w-2xl mx-auto flex flex-col h-full">
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
            <p className="text-2xl font-medium text-center">أهلا بك فى أزر</p>
            <p className="text-base text-[#454545] text-center">
              مرحباً، يرجى إدخال تفاصيل الدخول الخاصة بك.
            </p>
          </div>

          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
