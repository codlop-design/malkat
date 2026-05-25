"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { fadeUp, motionViewport, staggerContainer } from "@/src/lib/motion";
import type { HomeDiscoverSection } from "../types";
import ServiceCard from "./ServiceCard";
import "swiper/css";

type PlatformServicesProps = {
  content?: HomeDiscoverSection | null;
};

export default function PlatformServices({ content }: PlatformServicesProps) {
  if (!content?.items?.length) {
    return null;
  }

  const services = content.items;

  return (
    <section className="py-16">
      <div className="container overflow-hidden">
        <motion.div
          className="mx-auto mb-12 flex max-w-3xl flex-col items-center gap-3 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={staggerContainer()}
        >
          <motion.span
            variants={fadeUp}
            className="text-base font-medium text-primary"
          >
            استكشف المحتوى
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-bold text-black md:text-4xl"
          >
            {content.title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-base text-[#454545] md:text-lg"
          >
            {content.description}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={fadeUp}
          className="overflow-hidden lg:hidden"
        >
          <Swiper
            
            spaceBetween={16}
            slidesPerView={1.5}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
            }}
            className="services-swiper overflow-visible!"
          >
            {services.map((service, index) => (
              <SwiperSlide key={service.title} className="h-auto!">
                <ServiceCard {...service} featured={index === 2} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <motion.div
          className="hidden gap-5 lg:grid lg:grid-cols-5"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={staggerContainer(0.1, 0.15)}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={fadeUp}
              className="h-full"
            >
              <ServiceCard {...service} featured={index === 2} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
