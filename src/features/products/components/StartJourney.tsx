"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { fadeUp, motionViewport, staggerContainer } from "@/src/lib/motion";

export default function StartJourney() {
  return (
    <section className="bg-linear-to-r from-[#2C3E50] to-[#1A252F] py-14 md:py-8 lg:py-14">
      <div className="container">
        <motion.div
          className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center md:gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={staggerContainer()}
        >
          <motion.p
            variants={fadeUp}
            className="text-sm font-medium text-white/70 md:text-base"
          >
            ابدأ رحلتك التعليمية اليوم
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="text-2xl font-bold text-white md:text-3xl lg:text-[32px]"
          >
            نبني معاً مستقبلاً أفضل
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-base leading-[1.85] text-white/70 md:text-lg"
          >
            انضم إلى أكثر من 1300 أسرة تثق في نبضة لتعليم أطفالها بطريقة ممتعة
            وآمنة ومؤثرة.
          </motion.p>

          <motion.div variants={fadeUp}>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-3 rounded-full justify-center bg-(--primary) w-[300px] px-8 py-3.5 text-base font-medium text-white transition-opacity hover:opacity-90"
            >
              <span>سجل اهتمامك</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
