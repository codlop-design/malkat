"use client";

import { motion } from "framer-motion";

import { PARTNERSHIP_STATS } from "@/src/features/partnership-request/data/content";
import { fadeUp, motionViewport, staggerContainer } from "@/src/lib/motion";

export default function PartnershipIntro() {
  return (
    <section className="bg-linear-to-b from-[#F8FAFA] to-[#EEF6F5] py-10 md:py-14">
      <motion.div
        className="container flex flex-col items-center gap-8"
        dir="rtl"
        initial="hidden"
        whileInView="visible"
        viewport={motionViewport}
        variants={staggerContainer()}
      >
        <motion.div variants={fadeUp} className="max-w-3xl text-center">
          <p className="text-lg font-medium text-primary md:text-xl">
            لنصنع أثراً تعليمياً أكبر معاً
          </p>
          <p className="mt-4 text-sm leading-[1.9] text-[#454545] md:text-base">
            نرحب بالتعاون مع المدارس والمؤسسات التعليمية والجهات الداعمة لبناء
            شراكات استراتيجية توسّع الأثر وتقدّم تجارب تعليمية ممتعة وآمنة
            للأطفال والأسر.
          </p>
        </motion.div>

        <motion.ul
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
        >
          {PARTNERSHIP_STATS.map(({ id, value, label, icon: Icon }) => (
            <li key={id} className="flex items-center gap-3">
              <span className="flex size-12 items-center justify-center rounded-full bg-white text-primary shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                <Icon className="size-6" strokeWidth={1.75} aria-hidden />
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-lg font-bold text-primary md:text-xl">
                  {value}
                </span>
                <span className="text-sm text-[#454545] md:text-base">
                  {label}
                </span>
              </div>
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
