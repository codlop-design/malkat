"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import type { ServiceRequestSection } from "@/src/features/request-service/types";
import {
  fadeUp,
  motionViewport,
  staggerContainer,
} from "@/src/lib/motion";

type RequestServiceWhyUsProps = {
  section: ServiceRequestSection;
};

export default function RequestServiceWhyUs({ section }: RequestServiceWhyUsProps) {
  return (
    <section className="bg-[#F5F0E8] py-14 md:py-20">
      <motion.div
        className="container"
        dir="rtl"
        initial="hidden"
        whileInView="visible"
        viewport={motionViewport}
        variants={staggerContainer(0.08, 0.05)}
      >
        <motion.div variants={fadeUp} className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary md:text-base">لماذا نحن</p>
          <h2 className="mt-2 text-2xl font-bold text-black md:text-[28px]">
            {section.title}
          </h2>
          {section.content ? (
            <p className="mt-3 text-sm leading-[1.85] text-[#717171] md:text-base">
              {section.content}
            </p>
          ) : null}
        </motion.div>

        {section.items.length > 0 ? (
          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {section.items.map((item, index) => (
              <motion.li
                key={item.title}
                variants={fadeUp}
                className="flex flex-col items-center text-center"
              >
                <div className="relative size-[72px] overflow-hidden rounded-full bg-white md:size-20">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="80px"
                    unoptimized
                  />
                </div>
                <span className="mt-5 text-xl font-bold text-[#9CA3AF] md:text-2xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-base font-bold text-black md:text-lg">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-[240px] text-sm leading-relaxed text-[#717171] md:text-[15px]">
                  {item.content}
                </p>
              </motion.li>
            ))}
          </ol>
        ) : null}
      </motion.div>
    </section>
  );
}
