"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import type { ServicePageSection } from "@/src/features/services/types/servicePage";
import {
  fadeUp,
  motionViewport,
  staggerContainer,
} from "@/src/lib/motion";

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
        <motion.div
          className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center"
          dir="rtl"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={staggerContainer(0.1, 0.05)}
        >
          {section.icon ? (
            <motion.div variants={fadeUp} className="relative size-16 md:size-20">
              <Image
                src={section.icon}
                alt=""
                fill
                className="object-contain"
                sizes="80px"
                unoptimized
              />
            </motion.div>
          ) : null}

          {section.title ? (
            <motion.h2
              variants={fadeUp}
              className="text-2xl font-bold leading-snug text-white md:text-3xl lg:text-[32px]"
            >
              {section.title}
            </motion.h2>
          ) : null}

          {section.content ? (
            <motion.p
              variants={fadeUp}
              className="max-w-2xl text-sm leading-[1.9] text-white/85 md:text-base"
            >
              {section.content}
            </motion.p>
          ) : null}

          <motion.div
            variants={fadeUp}
            className="mt-2 flex flex-wrap items-center justify-center gap-4"
          >
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
