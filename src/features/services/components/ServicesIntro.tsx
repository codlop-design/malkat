"use client";

import { motion } from "framer-motion";
import { SERVICE_STATS } from "@/src/features/services/data/services";
import { fadeUp, motionViewport, staggerContainer } from "@/src/lib/motion";

export default function ServicesIntro() {
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
          <h2 className="text-2xl font-bold text-black md:text-[28px]">
            خدمات تعليمية تدعم رحلة التعلم
          </h2>
          <p className="mt-3 text-sm leading-[1.9] text-[#717171] md:text-base">
            نقدّم مجموعة من الخدمات التعليمية التفاعلية للأطفال والأسر، مصممة
            لتنمية المهارات وتعزيز التعلم بطريقة ممتعة وآمنة.
          </p>
        </motion.div>

        <motion.ul
          variants={fadeUp}
          className="flex items-center justify-center gap-12"
        >
          {SERVICE_STATS.map((stat) => (
            <li key={stat.id} className="flex  items-center gap-4 text-center">
              <span className="text-3xl" aria-hidden>
                {stat.icon}
              </span>

              <div className="flex flex-col items-center gap-1">
                <span className="text-lg font-bold text-(--primary) md:text-xl">
                  {stat.value}
                </span>

                <span className="text-sm text-[#454545] md:text-base">
                  {stat.label}
                </span>
              </div>
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
