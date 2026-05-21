"use client";

import { motion } from "framer-motion";

import ServiceRequestForm from "@/src/features/services/components/ServiceRequestForm";
import { SERVICE_REQUEST_STATS } from "@/src/features/services/data/serviceRequestOptions";
import {
  fadeUp,
  motionViewport,
  staggerContainer,
} from "@/src/lib/motion";

export default function RequestServiceIntro() {
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
            ابدأ طلب خدمتك التعليمية
          </h2>
          <p className="mt-3 text-sm leading-[1.9] text-[#717171] md:text-base">
            أخبرنا باحتياجك وسنعمل على تقديم الحل أو الخدمة التعليمية المناسبة
            لك، بكل احترافية وسرعة.
          </p>
        </motion.div>

        <motion.ul
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-14"
        >
          {SERVICE_REQUEST_STATS.map((stat) => (
            <li key={stat.id} className="flex items-center gap-3">
              <span className="text-2xl md:text-3xl" aria-hidden>
                {stat.icon}
              </span>
              <div className="flex flex-col gap-0.5 text-right">
                <span className="text-lg font-bold text-primary md:text-xl">
                  {stat.value}
                </span>
                <span className="text-sm text-[#454545] md:text-base">
                  {stat.label}
                </span>
              </div>
            </li>
          ))}
        </motion.ul>

        <motion.div variants={fadeUp} className="mt-10 md:mt-12">
          <ServiceRequestForm />
        </motion.div>
      </motion.div>
    </section>
  );
}
