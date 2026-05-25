"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  fadeUp,
  motionViewport,
  staggerContainer,
} from "@/src/lib/motion";
import type { AboutPartnersBlock } from "@/src/features/about/types";

type PartnersSectionProps = {
  partners?: AboutPartnersBlock | null;
};

export default function PartnersSection({ partners }: PartnersSectionProps) {
  if (!partners) {
    return null;
  }

  return (
    <section className="bg-[#F5F0E8] py-14 md:py-8 lg:py-14">
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
            className="text-sm font-medium text-primary md:text-base"
          >
            شركاؤنا
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="text-2xl font-bold text-black md:text-3xl lg:text-[32px]"
          >
            {partners.title}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-base leading-[1.85] text-[#454545] md:text-lg"
          >
            {partners.sub_title}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-2 text-base font-medium text-black md:text-lg"
          >
            {partners.content}
          </motion.p>

          <motion.div variants={fadeUp}>
            <Link
              href="/request-partnership"
              className="mt-4 inline-flex items-center gap-3 rounded-full bg-primary px-8 py-3.5 text-base font-medium text-white transition-opacity hover:opacity-90"
            >
              <span>اطلب شراكة</span>
              <Image
                src="/arrow-left-round.svg"
                alt=""
                width={20}
                height={20}
                className="brightness-0 invert"
                aria-hidden
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
