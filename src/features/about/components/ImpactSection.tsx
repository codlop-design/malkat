"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";

import ImpactStatCard from "@/src/features/about/components/ImpactStatCard";
import type { ImpactBlock } from "@/src/features/about/types";
import {
  fadeUp,
  motionViewport,
  staggerContainer,
} from "@/src/lib/motion";

import "swiper/css";

type ImpactSectionProps = {
  impact?: ImpactBlock | null;
};

export default function ImpactSection({ impact }: ImpactSectionProps) {
  if (!impact?.items?.length) {
    return null;
  }

  return (
    <section className="bg-[#F5F5F5] py-14 md:py-16 lg:py-20">
      <div className="container">
        <motion.header
          className="mx-auto mb-12 max-w-3xl text-center md:mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={staggerContainer()}
        >
          <motion.h2
            variants={fadeUp}
            className="text-2xl font-bold text-black md:text-3xl lg:text-[32px]"
          >
            {impact.title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-base leading-[1.85] text-[#666666] md:text-lg"
          >
            {impact.content}
          </motion.p>
        </motion.header>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={fadeUp}
          className="-mx-5 overflow-hidden ps-5 lg:hidden"
        >
          <Swiper
            speed={500}
            spaceBetween={16}
            slidesPerView={1.25}
            breakpoints={{
              480: { slidesPerView: 1.5, spaceBetween: 16 },
              640: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 2.5, spaceBetween: 20 },
            }}
            className="impact-swiper overflow-visible!"
          >
            {impact.items.map((item, index) => (
              <SwiperSlide key={item.title} className="h-auto!">
                <ImpactStatCard {...item} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <motion.div
          className="hidden gap-5 lg:grid lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={staggerContainer(0.1, 0.15)}
        >
          {impact.items.map((item, index) => (
            <motion.div key={item.title} variants={fadeUp}>
              <ImpactStatCard {...item} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
