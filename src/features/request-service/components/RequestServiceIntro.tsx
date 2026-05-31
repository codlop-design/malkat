"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import ServiceRequestForm from "@/src/features/services/components/ServiceRequestForm";
import type {
  ServiceRequestFormOptions,
  ServiceRequestSection,
} from "@/src/features/request-service/types";
import {
  fadeUp,
  motionViewport,
  staggerContainer,
} from "@/src/lib/motion";

type RequestServiceIntroProps = {
  section: ServiceRequestSection;
  formOptions: ServiceRequestFormOptions;
};

export default function RequestServiceIntro({
  section,
  formOptions,
}: RequestServiceIntroProps) {
  return (
    <section className="bg-white py-10 md:py-14">
      <motion.div
        className="container"
        dir="rtl"
        initial="hidden"
        whileInView="visible"
        viewport={motionViewport}
        variants={staggerContainer(0.08, 0.05)}
      >
        <motion.div variants={fadeUp} className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-black md:text-[28px]">
            {section.title}
          </h2>
          {section.content ? (
            <p className="mt-3 text-sm leading-[1.9] text-[#717171] md:text-base">
              {section.content}
            </p>
          ) : null}
        </motion.div>

        {section.items.length > 0 ? (
          <motion.ul
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-start justify-center gap-x-10 gap-y-8 md:gap-x-14"
          >
            {section.items.map((item) => (
              <li
                key={item.title}
                className="flex max-w-xs flex-col items-center gap-3 text-center sm:flex-row sm:text-right"
              >
                <div className="relative size-14 shrink-0 overflow-hidden rounded-full bg-[#E8F6F4]">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="56px"
                    unoptimized
                  />
                </div>
                <div>
                  <p className="text-base font-bold text-black">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[#717171]">
                    {item.content}
                  </p>
                </div>
              </li>
            ))}
          </motion.ul>
        ) : null}

        <motion.div variants={fadeUp} className="mt-10 md:mt-12">
          <ServiceRequestForm formOptions={formOptions} />
        </motion.div>
      </motion.div>
    </section>
  );
}
