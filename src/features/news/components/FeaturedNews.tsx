"use client";

import Image from "next/image";
import ReadMoreLink from "@/src/features/news/components/ReadMoreLink";
import { motion } from "framer-motion";
import { FEATURED_NEWS } from "@/src/features/news/data/news";
import { fadeUp, motionViewport, staggerContainer } from "@/src/lib/motion";

export default function FeaturedNews() {
  const { slug, title, excerpt, date, imageSrc } = FEATURED_NEWS;

  return (
    <section className="bg-white py-10 md:py-14">
      <div className="container">
        <motion.div
          className="flex flex-col items-stretch gap-6 lg:flex-row lg:items-center"
          dir="rtl"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={staggerContainer()}
        >
          <motion.div
            variants={fadeUp}
            className="relative aspect-4/3 w-full min-w-0 shrink-0 overflow-hidden lg:aspect-auto lg:h-[420px] lg:flex-2 lg:basis-0"
          >
            <Image
              src={imageSrc}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
              priority
            />
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="min-w-0 flex-1 text-right lg:flex-1 lg:basis-0"
          >
            <time className="block text-sm text-[#717171] md:text-base">
              {date}
            </time>

            <h2 className="mt-4 text-2xl font-bold leading-snug text-black md:mt-5 md:text-3xl lg:text-[32px] lg:leading-[1.45]">
              {title}
            </h2>

            <p className="mt-5 text-sm leading-[1.95] text-[#454545] md:mt-6 md:text-base">
              {excerpt}
            </p>

            <div className="mt-8 md:mt-10">
              <ReadMoreLink href={`/news/all/${slug}`} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
