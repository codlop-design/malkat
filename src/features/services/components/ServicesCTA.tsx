"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  fadeUp,
  motionViewport,
  staggerContainer,
} from "@/src/lib/motion";

export default function ServicesCTA() {
  return (
    <section className="relative overflow-hidden py-14 md:py-16 lg:py-20">
      <Image
        src="/services-bg.png"
        alt=""
        fill
        className="h-full w-full object-cover object-center"
        priority={false}
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
          <motion.p
            variants={fadeUp}
            className="text-sm font-medium text-white/80 md:text-base"
          >
            خدمة مخصصة
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="text-2xl font-bold leading-snug text-white md:text-3xl lg:text-[32px]"
          >
            هل تحتاج إلى خدمة تعليمية مخصصة؟
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="max-w-2xl text-sm leading-[1.9] text-white/85 md:text-base"
          >
            فريقنا المتخصص جاهز لتصميم حل تعليمي يناسب احتياجاتك تماماً، لا تتردد
            في التواصل معنا الآن
          </motion.p>

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
