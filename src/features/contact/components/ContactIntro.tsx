"use client";

import { motion } from "framer-motion";
import {
  fadeUp,
  motionViewport,
  staggerContainer,
} from "@/src/lib/motion";

export default function ContactIntro() {
  return (
    <section className="bg-white py-10 md:py-14">
      <motion.div
        className="container max-w-3xl text-center"
        dir="rtl"
        initial="hidden"
        whileInView="visible"
        viewport={motionViewport}
        variants={staggerContainer()}
      >
        <motion.h2
          variants={fadeUp}
          className="text-2xl font-bold text-black md:text-3xl"
        >
          يسعدنا تواصلك معنا
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mt-4 text-base leading-[1.9] text-[#454545] md:text-lg"
        >
          نحن مستعدون لاستقبال استفساراتكم واقتراحاتكم لدعم رحلة تعليمية ممتعة
          وآمنة لأطفالكم. املأ النموذج أو تواصل معنا عبر البيانات أدناه.
        </motion.p>
      </motion.div>
    </section>
  );
}
