import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type ReadMoreLinkProps = {
  href: string;
  variant?: "text" | "pill";
  className?: string;
};

export default function ReadMoreLink({
  href,
  variant = "text",
  className = "",
}: ReadMoreLinkProps) {
  if (variant === "pill") {
    return (
      <Link
        href={href}
        className={`inline-flex items-center w-full justify-center gap-2 rounded-full border border-[#1F1F1F] px-6 py-2.5 text-sm font-medium text-black transition-colors hover:bg-[#FAFAFA] ${className}`}
      >
        <span>قراءة المزيد</span>
        <ArrowLeft className="size-4" strokeWidth={2} aria-hidden />
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 text-sm font-medium text-(--primary) transition-colors hover:underline md:text-base ${className}`}
    >
      <span>قراءة المزيد</span>
      <ArrowLeft className="size-4" strokeWidth={2} aria-hidden />
    </Link>
  );
}
