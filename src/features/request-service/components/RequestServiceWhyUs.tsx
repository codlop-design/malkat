"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { REQUEST_SERVICE_WHY_US } from "@/src/features/request-service/data/requestServicePage";
import {
  fadeUp,
  motionViewport,
  staggerContainer,
} from "@/src/lib/motion";

export default function RequestServiceWhyUs() {
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
            خدمات تعليمية بمعايير احترافية
          </h2>
        </motion.div>

        <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {REQUEST_SERVICE_WHY_US.map((item) => (
            <motion.li
              key={item.number}
              variants={fadeUp}
              className="flex flex-col items-center text-center"
            >
              <Image
                src={item.iconSrc}
                alt=""
                width={72}
                height={72}
                className="h-[72px] w-[72px] object-contain md:h-20 md:w-20"
                unoptimized
              />
              <span className="mt-5 text-xl font-bold text-[#9CA3AF] md:text-2xl">
                {item.number}
              </span>
              <h3 className="mt-2 text-base font-bold text-black md:text-lg">
                {item.title}
              </h3>
              <p className="mt-2 max-w-[240px] text-sm leading-relaxed text-[#717171] md:text-[15px]">
                {item.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </motion.div>
    </section>
  );
}
