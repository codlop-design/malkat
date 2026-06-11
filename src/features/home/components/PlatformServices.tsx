"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { fadeUp, motionViewport, staggerContainer } from "@/src/lib/motion";
import { cn } from "@/src/lib/utils";
import { discoverItemHref } from "../data/discoverLinks";
import type { HomeDiscoverSection } from "../types";
import ServiceCard from "./ServiceCard";
import "swiper/css";

type PlatformServicesProps = {
  content?: HomeDiscoverSection | null;
};

const FEATURED_INDEX = 2;

export default function PlatformServices({ content }: PlatformServicesProps) {
  if (!content?.items?.length) {
    return null;
  }

  const services = content.items;
  const featured = services[FEATURED_INDEX];
  const rightColumn = [services[0], services[1]].filter(Boolean);
  const leftColumn = [services[3], services[4]].filter(Boolean);

  return (
    <section className="bg-[#F5F5F5] py-16 md:py-20">
      <div className="container overflow-hidden">
        <motion.div
          className="mx-auto mb-12 flex max-w-3xl flex-col items-center gap-3 text-center md:mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={staggerContainer()}
        >
          <motion.span
            variants={fadeUp}
            className="text-base font-medium text-[#666666]"
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
            className="text-base text-[#666666] md:text-lg"
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
                <ServiceCard
                  {...service}
                  href={discoverItemHref(index)}
                  featured={index === FEATURED_INDEX}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <motion.div
          className="hidden gap-5 lg:grid lg:grid-cols-3 lg:grid-rows-2"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={staggerContainer(0.1, 0.15)}
        >
          {rightColumn.map((service, index) => (
            <motion.div
              key={service.title}
              variants={fadeUp}
              className={cn(
                "col-start-1",
                index === 0 ? "row-start-1" : "row-start-2",
              )}
            >
              <ServiceCard {...service} href={discoverItemHref(index)} />
            </motion.div>
          ))}

          {featured ? (
            <motion.div
              variants={fadeUp}
              className="col-start-2 row-span-2 row-start-1"
            >
              <ServiceCard
                {...featured}
                href={discoverItemHref(FEATURED_INDEX)}
                featured
              />
            </motion.div>
          ) : null}

          {leftColumn.map((service, index) => (
            <motion.div
              key={service.title}
              variants={fadeUp}
              className={cn(
                "col-start-3",
                index === 0 ? "row-start-1" : "row-start-2",
              )}
            >
              <ServiceCard {...service} href={discoverItemHref(index + 3)} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
