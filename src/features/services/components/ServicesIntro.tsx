"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import type { ServicePageSection } from "@/src/features/services/types/servicePage";
import { fadeUp, motionViewport, staggerContainer } from "@/src/lib/motion";

type ServicesIntroProps = {
  section: ServicePageSection;
};

export default function ServicesIntro({ section }: ServicesIntroProps) {
  return (
    <section className="py-10 md:py-14">
      <motion.div
        className="container flex flex-col items-center gap-6"
        dir="rtl"
        initial="hidden"
        whileInView="visible"
        viewport={motionViewport}
        variants={staggerContainer()}
      >
        <motion.div variants={fadeUp} className="mx-auto max-w-3xl text-center">
          {section.title ? (
            <h2 className="text-2xl font-bold text-black md:text-[28px]">
              {section.title}
            </h2>
          ) : null}
          {section.content ? (
            <p className="mt-3 text-sm leading-[1.9] text-[#717171] md:text-base">
              {section.content}
            </p>
          ) : null}
        </motion.div>

        {section.items.length > 0 ? (
          <motion.ul
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-12"
          >
            {section.items.map((item) => (
              <li
                key={`${item.title}-${item.content}`}
                className="flex items-center gap-4 text-center"
              >
                {item.image ? (
                  <div className="relative hidden size-12 shrink-0 md:block md:size-14">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      className="object-contain"
                      sizes="56px"
                      unoptimized
                    />
                  </div>
                ) : null}

                <div className="flex flex-col items-center gap-1">
                  <span className="text-lg font-bold text-primary md:text-xl">
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
