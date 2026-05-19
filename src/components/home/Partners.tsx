"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import {
  fadeUp,
  motionViewport,
  staggerContainer,
} from "@/src/lib/motion";

const partners = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  src: `/p${(i % 4) + 1}.jpg`,
  alt: `شريك ${i + 1}`,
}));

export default function Partners() {
  return (
    <section className="bg-[#FAFAFA] py-16">
      <div className="container">
        <motion.div
          className="mx-auto mb-12 flex max-w-3xl flex-col items-center gap-3 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={staggerContainer()}
        >
          <motion.span
            variants={fadeUp}
            className="text-base font-medium text-(--primary)"
          >
            شركاؤنا
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-bold text-black md:text-4xl"
          >
            نبني المستقبل معاً
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-base text-[#454545] md:text-lg"
          >
            نتعاون مع أبرز المؤسسات التعليمية والمجتمعية في المملكة
          </motion.p>
        </motion.div>

        <motion.ul
          className="flex flex-wrap items-center justify-center gap-6 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={staggerContainer(0.08, 0.1)}
        >
          {partners.map((partner) => (
            <motion.li
              key={partner.id}
              variants={fadeUp}
              className="flex size-[120px] shrink-0 items-center justify-center rounded-full bg-white p-4 md:size-[140px]"
            >
              <Image
                src={partner.src}
                alt={partner.alt}
                width={80}
                height={80}
                className="h-auto w-full max-h-16 object-contain md:max-h-20"
              />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
