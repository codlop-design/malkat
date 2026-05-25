"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, motionViewport, staggerContainer } from "@/src/lib/motion";
import type { HomeContentMediaSection } from "../types";

type AboutSectionProps = {
  content?: HomeContentMediaSection | null;
};

export default function AboutSection({ content }: AboutSectionProps) {
  if (!content) {
    return null;
  }

  return (
    <section className="py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0">
          <motion.div
            className="max-w-[500px] flex flex-col gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={motionViewport}
            variants={staggerContainer()}
          >
            <motion.span
              variants={fadeUp}
              className="text-xl font-medium leading-[64px] text-black"
            >
              من نحن
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="text-2xl font-bold text-black"
            >
              {content.title}
            </motion.h2>

            <motion.p variants={fadeUp} className="text-base text-[#1F1F1F]">
              {content.description}
            </motion.p>

            <motion.div variants={fadeUp}>
              <Link
                href="/about"
                className="flex w-fit items-center gap-6 rounded-full border border-[#000000B2] px-4 py-2"
              >
                اعرف المزيد
                <Image
                  src="/arrow-left-round.svg"
                  alt=""
                  width={20}
                  height={20}
                  aria-hidden
                />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={motionViewport}
            transition={{
              duration: 0.55,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Image src={content.image} alt="About" width={500} height={500} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
