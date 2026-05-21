import ResetPasswordForm from "@/src/features/auth/components/ResetPasswordForm";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "إعادة تعيين كلمة المرور",
};

type PageProps = {
  searchParams: Promise<{ token?: string; email?: string }>;
};

export default async function ResetPasswordPage({ searchParams }: PageProps) {
  const { token } = await searchParams;

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

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3 text-center">
            <p className="text-2xl font-medium">إعادة تعيين كلمة المرور</p>
            <p className="text-base text-[#454545]">
              أدخل كلمة المرور الجديدة لحسابك.
            </p>
          </div>

          <ResetPasswordForm token={token} />
        </div>
      </div>
    </div>
  );
}
