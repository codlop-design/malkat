"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { REQUEST_SERVICE_CATEGORIES } from "@/src/features/request-service/data/requestServicePage";
import {
  fadeUp,
  motionViewport,
  staggerContainer,
} from "@/src/lib/motion";

export default function RequestServiceCategories() {
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
          <h2 className="text-2xl font-bold text-black md:text-[28px]">خدماتنا</h2>
          <p className="mt-3 text-sm leading-[1.85] text-[#717171] md:text-base">
            استكشف الخدمات التعليمية
          </p>
        </motion.div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {REQUEST_SERVICE_CATEGORIES.map((item) => (
            <motion.li key={item.title} variants={fadeUp}>
              <article className="flex h-full flex-col items-center rounded-2xl bg-[#E8F6F4] px-4 py-8 text-center md:px-5 md:py-10">
                <div className="mb-5 flex size-14 items-center justify-center rounded-full bg-white shadow-sm">
                  <Image
                    src={item.iconSrc}
                    alt=""
                    width={32}
                    height={32}
                    className="size-8 object-contain"
                    unoptimized
                  />
                </div>
                <h3 className="text-base font-bold text-black">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#717171]">
                  {item.description}
                </p>
              </article>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
