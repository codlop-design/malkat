"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import type { PartnershipSection } from "@/src/features/partnership-request/types";
import { fadeUp, motionViewport, staggerContainer } from "@/src/lib/motion";

type PartnershipBenefitsProps = {
  section: PartnershipSection;
};

export default function PartnershipBenefits({
  section,
}: PartnershipBenefitsProps) {
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
          <h2 className="text-2xl font-bold text-black md:text-3xl">
            {section.title}
          </h2>
          {section.content ? (
            <p className="mt-3 text-sm leading-[1.9] text-[#454545] md:text-base">
              {section.content}
            </p>
          ) : null}
        </motion.div>

        {section.items.length > 0 ? (
          <motion.ul
            className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {section.items.map((item, index) => (
              <motion.li
                key={item.title}
                variants={fadeUp}
                className="flex flex-col items-center text-center"
              >
                <span className="text-sm font-bold text-primary/60">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="relative mt-3 size-20 overflow-hidden rounded-full bg-white md:size-24">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="96px"
                    unoptimized
                  />
                </div>
                <h3 className="mt-4 text-base font-bold text-black md:text-lg">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-[1.85] text-[#717171]">
                  {item.content}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        ) : null}
      </motion.div>
    </section>
  );
}
