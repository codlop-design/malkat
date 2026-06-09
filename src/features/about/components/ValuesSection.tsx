"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";

import ValueCard from "@/src/features/about/components/ValueCard";
import {
  fadeUp,
  motionViewport,
  staggerContainer,
} from "@/src/lib/motion";
import type { AboutValuesBlock } from "@/src/features/about/types";

import "swiper/css";

type ValuesSectionProps = {
  valuesBlock?: AboutValuesBlock | null;
};

export default function ValuesSection({ valuesBlock }: ValuesSectionProps) {
  if (!valuesBlock?.items?.length) {
    return null;
  }

  return (
    <section className="bg-[#FAFAFA] py-14 md:py-8 lg:py-14">
      <div className="container">
        <motion.header
          className="mx-auto mb-12 max-w-3xl text-center md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={staggerContainer()}
        >
          <motion.div variants={fadeUp} className="mb-4 flex justify-center">
            <Image
              src={valuesBlock.icon || "/vallues.svg"}
              alt=""
              width={48}
              height={50}
              className="h-auto w-12 object-contain"
            />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-2xl font-bold text-black md:text-3xl lg:text-[32px]"
          >
            {valuesBlock.title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-base leading-[1.85] text-[#454545] md:text-lg"
          >
            {valuesBlock.content}
          </motion.p>
        </motion.header>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={fadeUp}
          className="-mx-5 overflow-hidden ps-5 md:mx-0 md:ps-0"
        >
          <Swiper
            speed={500}
            spaceBetween={16}
            slidesPerView={1.25}
            breakpoints={{
              480: { slidesPerView: 1.5, spaceBetween: 16 },
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
              1280: { slidesPerView: 4, spaceBetween: 32 },
            }}
            className="values-swiper overflow-visible!"
          >
            {valuesBlock.items.map((value) => (
              <SwiperSlide key={value.title} className="h-auto!">
                <ValueCard
                  title={value.title}
                  description={value.content}
                  iconSrc={value.icon}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
