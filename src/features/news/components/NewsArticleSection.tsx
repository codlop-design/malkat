"use client";

import type { NewsArticle } from "@/src/features/news/types";

import { motion } from "framer-motion";
import { getArticleDetail } from "@/src/features/news/data/articleDetail";
import { fadeUp, motionViewport, staggerContainer } from "@/src/lib/motion";
import NewsArticleGallery from "@/src/features/news/components/NewsArticleGallery";
import Image from "next/image";

type NewsArticleSectionProps = {
  article: NewsArticle;
};

export default function NewsArticleSection({ article }: NewsArticleSectionProps) {
  const detail = getArticleDetail(article);

  return (
    <section className="bg-white py-10 md:py-14">
      <motion.div
        className="container flex flex-col gap-10"
        dir="rtl"
        initial="hidden"
        whileInView="visible"
        viewport={motionViewport}
        variants={staggerContainer(0.08, 0.06)}
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
          <motion.article
            variants={fadeUp}
            className="min-w-0 flex-1 text-right lg:flex-[1.1]"
          >
            <time className="text-sm text-[#717171]">{article.date}</time>

            <p className="mt-5 text-sm leading-[1.95] text-[#454545] md:text-base">
              {detail.intro}
            </p>

            <p className="mt-5 text-sm leading-[1.95] text-[#454545] md:text-base">
              {detail.activitiesIntro}
            </p>
            <ul className="mt-3 list-disc space-y-2 pe-5 text-sm leading-[1.9] text-[#454545] md:text-base">
              {detail.activities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2 className="mt-8 text-lg font-bold text-black md:text-xl">
              {detail.goalsTitle}
            </h2>
            <ul className="mt-3 list-disc space-y-2 pe-5 text-sm leading-[1.9] text-[#454545] md:text-base">
              {detail.goals.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2 className="mt-8 text-lg font-bold text-black md:text-xl">
              {detail.programStartTitle}
            </h2>
            <p className="mt-3 text-sm leading-[1.95] text-[#454545] md:text-base">
              {detail.programStart}
            </p>
          </motion.article>

          <motion.div variants={fadeUp} className="min-w-0 flex-1 lg:max-w-[540px]">
            <NewsArticleGallery images={detail.gallery} />
          </motion.div>
        </div>

        <motion.div
          variants={fadeUp}
          className="relative aspect-21/9 w-full overflow-hidden rounded-2xl md:aspect-[2.4/1]"
        >
          <Image
            src={detail.featuredImage}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
