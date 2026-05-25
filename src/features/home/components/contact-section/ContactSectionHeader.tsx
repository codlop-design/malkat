"use client";

import { motion } from "framer-motion";

import { fadeUp, motionViewport, staggerContainer } from "@/src/lib/motion";

export default function ContactSectionHeader() {
  return (
    <motion.div
      className="mx-auto mb-12 max-w-2xl text-center"
      initial="hidden"
      whileInView="visible"
      viewport={motionViewport}
      variants={staggerContainer(0.1, 0)}
    >
      <motion.h1
        variants={fadeUp}
        className="text-3xl font-bold text-black md:text-4xl"
      >
        تواصل معنا
      </motion.h1>
      <motion.p
        variants={fadeUp}
        className="mt-3 text-base text-[#454545] md:text-lg"
      >
        نحن نحب أن نسمع منك
      </motion.p>
    </motion.div>
  );
}
