"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import InterestForm from "@/src/features/register-interest/components/InterestForm";
import { fadeUp, motionViewport, staggerContainer } from "@/src/lib/motion";

export default function RegisterInterestPageContent() {
  return (
    <section className="bg-[#FFFBF7] pb-14 pt-8 md:pb-20 md:pt-10">
      <motion.div
        className="container"
        initial="hidden"
        whileInView="visible"
        viewport={motionViewport}
        variants={staggerContainer(0.1, 0.05)}
      >
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-12">
          <motion.div variants={fadeUp} className="flex-2">
            <InterestForm />
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex flex-1 items-center justify-center"
            aria-hidden
          >
            <Image
              src="/interest.svg"
              alt=""
              width={400}
              height={390}
              className="h-auto w-full max-w-[400px]"
              priority
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
