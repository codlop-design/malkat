"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import VisionCard from "@/src/features/about/components/VisionCard";
import {
  fadeUp,
  motionViewport,
  staggerContainer,
} from "@/src/lib/motion";
import type { VisionMessage } from "@/src/features/about/types";

type VisionSectionProps = {
  messages: VisionMessage[];
};

export default function VisionSection({ messages }: VisionSectionProps) {
  if (!messages.length) {
    return null;
  }

  return (
    <section className="bg-[#006d6d] py-14 md:py-8 lg:py-14">
      <div className="container">
        <motion.header
          className="mb-12 text-center md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={staggerContainer()}
        >
          <motion.p
            variants={fadeUp}
            className="text-sm text-white/90 md:text-base"
          >
            رؤيتنا ورسالتنا
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-3 text-2xl font-bold leading-tight text-white md:text-3xl lg:text-[32px]"
          >
            ما الذي نؤمن به ونسعى إليه
          </motion.h2>
        </motion.header>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={staggerContainer(0.15)}
        >
          {messages.map((message) => (
            <motion.div key={message.title} variants={fadeUp}>
              <VisionCard
                label={message.title}
                lead={message.content}
                bullets={message.items}
                icon={
                  <Image
                    src={message.icon}
                    alt=""
                    width={40}
                    height={40}
                    className="size-10 object-contain"
                  />
                }
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
