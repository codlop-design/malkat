import Image from "next/image";
import Link from "next/link";
import { cn } from "@/src/lib/utils";
import type { HomeDiscoverItem } from "../types";

type ServiceCardProps = HomeDiscoverItem & {
  featured?: boolean;
  href: string;
};

export default function ServiceCard({
  title,
  description,
  image,
  featured = false,
  href,
}: ServiceCardProps) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col items-center justify-center gap-4 rounded-2xl px-5 py-8 text-center transition-colors md:rounded-3xl",
        featured
          ? "bg-primary px-6 py-10 text-white hover:bg-primary/90 md:py-12"
          : "bg-[#E0F7FA] text-[#1F1F1F] hover:bg-[#D4F1F6]",
      )}
    >
      <Link
        href={href}
        className="absolute inset-0 z-0 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:rounded-3xl"
        aria-label={title}
      />

      <div
        className={cn(
          "relative z-1 flex items-center justify-center rounded-full transition-transform group-hover:scale-105",
          featured
            ? "size-20 bg-white md:size-24"
            : "size-14 bg-primary",
        )}
      >
        <Image
          src={image}
          alt=""
          width={featured ? 40 : 28}
          height={featured ? 40 : 28}
          className={cn(
            "object-contain",
            featured ? "size-10 md:size-11" : "size-7 brightness-0 invert",
          )}
          aria-hidden
        />
      </div>

      <div className="relative z-1 flex flex-col gap-2">
        <h3
          className={cn(
            "text-lg font-bold leading-snug",
            featured ? "text-white" : "text-black",
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "text-sm leading-relaxed",
            featured ? "text-white/85" : "text-[#666666]",
          )}
        >
          {description}
        </p>
      </div>
    </article>
  );
}
