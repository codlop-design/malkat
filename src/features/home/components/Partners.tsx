"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { HomePartnersSection } from "../types";

import { fadeUp, motionViewport, staggerContainer } from "@/src/lib/motion";

import "swiper/css";

type PartnersProps = {
  content?: HomePartnersSection | null;
};

export default function Partners({ content }: PartnersProps) {
  if (!content) {
    return null;
  }

  const hasPartnerLogos = content.items.length > 0;

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
            شركاؤنا
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

        {hasPartnerLogos ? (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={motionViewport}
            variants={fadeUp}
            className="-mx-5 overflow-visible ps-5 md:mx-0 md:ps-0"
          >
            <Swiper
              modules={[Autoplay]}
              loop
              speed={600}
              spaceBetween={16}
              slidesPerView={3.5}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                768: { slidesPerView: 4, spaceBetween: 28 },
                1024: { slidesPerView: 5, spaceBetween: 32 },
                1280: { slidesPerView: 8, spaceBetween: 32 },
              }}
              className="partners-swiper overflow-visible!"
            >
              {content.items.map((partner, index) => (
                <SwiperSlide
                  key={`${partner.image}-${index}`}
                  className="h-auto!"
                >
                  <div className="mx-auto flex size-[100px] items-center justify-center rounded-full bg-white p-4 md:size-[140px]">
                    <Image
                      src={partner.image}
                      width={80}
                      height={80}
                      alt={`Partner ${index + 1}`}
                      className="h-auto max-h-16 w-full object-contain md:max-h-20"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
