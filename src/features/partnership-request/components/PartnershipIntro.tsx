"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import type { PartnershipSection } from "@/src/features/partnership-request/types";
import { fadeUp, motionViewport, staggerContainer } from "@/src/lib/motion";

type PartnershipIntroProps = {
  section: PartnershipSection;
};

export default function PartnershipIntro({ section }: PartnershipIntroProps) {
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
            {section.title}
          </p>
          {section.content ? (
            <p className="mt-4 text-sm leading-[1.9] text-[#454545] md:text-base">
              {section.content}
            </p>
          ) : null}
        </motion.div>

        {section.items.length > 0 ? (
          <motion.ul
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
          >
            {section.items.map((item) => (
              <li key={item.title} className="flex max-w-xs items-center gap-3">
                <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="48px"
                    unoptimized
                  />
                </div>
                <div className="flex flex-col gap-0.5 text-right">
                  <span className="text-base font-bold text-primary md:text-lg">
                    {item.title}
                  </span>
                  <span className="text-sm text-[#454545] md:text-base">
                    {item.content}
                  </span>
                </div>
              </li>
            ))}
          </motion.ul>
        ) : null}
      </motion.div>
    </section>
  );
}
