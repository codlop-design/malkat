import Image from "next/image";
import Link from "next/link";

import type { ServicePageSection } from "@/src/features/services/types/servicePage";

type ServicesCTAProps = {
  section: ServicePageSection;
};

export default function ServicesCTA({ section }: ServicesCTAProps) {
  const backgroundSrc = section.image ?? "/services-bg.png";

  return (
    <section className="relative overflow-hidden py-14 md:py-16 lg:py-20">
      <Image
        src={backgroundSrc}
        alt=""
        fill
        className="h-full w-full object-cover object-center"
        priority={false}
        unoptimized={backgroundSrc.startsWith("http")}
      />

      <div className="container relative z-10">
        <div
          className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center"
          dir="rtl"
        >
          {section.icon ? (
            <div className="relative size-16 md:size-20">
              <Image
                src={section.icon}
                alt=""
                fill
                className="object-contain"
                sizes="80px"
                unoptimized
              />
            </div>
          ) : null}

          {section.title ? (
            <h2 className="text-2xl font-bold leading-snug text-white md:text-3xl lg:text-[32px]">
              {section.title}
            </h2>
          ) : null}

          {section.content ? (
            <p className="max-w-2xl text-sm leading-[1.9] text-white/85 md:text-base">
              {section.content}
            </p>
          ) : null}

          <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/request-service"
              className="inline-flex min-w-[160px] items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-medium text-white shadow-[0_4px_16px_rgba(0,128,117,0.35)] transition-opacity hover:opacity-90"
            >
              طلب خدمة
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-w-[160px] items-center justify-center rounded-full border border-white px-8 py-3.5 text-base font-medium text-white transition-colors hover:bg-white/10"
            >
              تواصل معنا
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
