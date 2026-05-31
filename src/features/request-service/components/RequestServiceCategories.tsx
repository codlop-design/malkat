"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import type { ServiceRequestSection } from "@/src/features/request-service/types";
import {
  fadeUp,
  motionViewport,
  staggerContainer,
} from "@/src/lib/motion";

type RequestServiceCategoriesProps = {
  section: ServiceRequestSection;
};

export default function RequestServiceCategories({
  section,
}: RequestServiceCategoriesProps) {
  return (
    <section className="bg-white py-14 md:py-20">
      <motion.div
        className="container"
        dir="rtl"
        initial="hidden"
        whileInView="visible"
        viewport={motionViewport}
        variants={staggerContainer(0.08, 0.05)}
      >
        <motion.div variants={fadeUp} className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-black md:text-[28px]">
            {section.title}
          </h2>
          {section.content ? (
            <p className="mt-3 text-sm leading-[1.85] text-[#717171] md:text-base">
              {section.content}
            </p>
          ) : null}
        </motion.div>

        {section.items.length > 0 ? (
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:gap-4">
            {section.items.map((item) => (
              <motion.li key={item.title} variants={fadeUp}>
                <article className="flex h-full flex-col items-center rounded-2xl bg-[#E8F6F4] px-4 py-8 text-center md:px-5 md:py-10">
                  <div className="relative mb-5 size-14 overflow-hidden rounded-full bg-white shadow-sm">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="56px"
                      unoptimized
                    />
                  </div>
                  <h3 className="text-base font-bold text-black">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#717171]">
                    {item.content}
                  </p>
                </article>
              </motion.li>
            ))}
          </ul>
        ) : null}
      </motion.div>
    </section>
  );
}
