"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import ValueCard from "@/src/features/about/ValueCard";
import {
  fadeUp,
  motionViewport,
  staggerContainer,
} from "@/src/lib/motion";
import type { AboutValuesBlock } from "@/src/features/about/types";

type ValuesSectionProps = {
  valuesBlock?: AboutValuesBlock | null;
};

export default function ValuesSection({ valuesBlock }: ValuesSectionProps) {
  if (!valuesBlock?.items?.length) {
    return null;
  }

  return (
    <section className="bg-[#FAFAFA] py-14 md:py-8 lg:py-14">
      <div className="container">
        <motion.header
          className="mx-auto mb-12 max-w-3xl text-center md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={staggerContainer()}
        >
          <motion.div variants={fadeUp} className="mb-4 flex justify-center">
            <Image
              src={valuesBlock.icon || "/vallues.svg"}
              alt=""
              width={48}
              height={50}
              className="h-auto w-12 object-contain"
            />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-2xl font-bold text-black md:text-3xl lg:text-[32px]"
          >
            {valuesBlock.title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-base leading-[1.85] text-[#454545] md:text-lg"
          >
            {valuesBlock.content}
          </motion.p>
        </motion.header>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={staggerContainer(0.1)}
        >
          {valuesBlock.items.map((value) => (
            <motion.div key={value.title} variants={fadeUp}>
              <ValueCard
                title={value.title}
                description={value.content}
                iconSrc={value.icon}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
