"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { PARTNERSHIP_BENEFITS } from "@/src/features/partnership-request/data/content";
import { fadeUp, motionViewport, staggerContainer } from "@/src/lib/motion";

export default function PartnershipBenefits() {
  return (
    <section className="bg-[#F5F0E8] py-14 md:py-20">
      <motion.div
        className="container"
        dir="rtl"
        initial="hidden"
        whileInView="visible"
        viewport={motionViewport}
        variants={staggerContainer()}
      >
        <motion.div variants={fadeUp} className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-(--primary) md:text-base">
            لماذا الشراكة معنا
          </p>
          <h2 className="mt-2 text-2xl font-bold text-black md:text-3xl">
            مزايا تصنع فرقاً حقيقياً
          </h2>
          <p className="mt-3 text-sm leading-[1.9] text-[#454545] md:text-base">
            نبني شراكات استراتيجية طويلة الأمد تخلق أثراً تعليمياً مستداماً
            للأطفال والمجتمع.
          </p>
        </motion.div>

        <motion.ul
          className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {PARTNERSHIP_BENEFITS.map(
            ({ id, number, title, description, iconSrc }) => (
              <motion.li
                key={id}
                variants={fadeUp}
                className="flex flex-col items-center text-center"
              >
                <span className="text-sm font-bold text-(--primary)/60">
                  {number}
                </span>
                <div className="mt-3 flex h-24 w-full items-center justify-center">
                  <Image
                    src={iconSrc}
                    alt=""
                    width={96}
                    height={96}
                    className="h-20 w-auto object-contain"
                    aria-hidden
                  />
                </div>
                <h3 className="mt-4 text-base font-bold text-black md:text-lg">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-[1.85] text-[#717171]">
                  {description}
                </p>
              </motion.li>
            ),
          )}
        </motion.ul>
      </motion.div>
    </section>
  );
}
