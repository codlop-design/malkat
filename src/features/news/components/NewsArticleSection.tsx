"use client";

import { motion } from "framer-motion";

import NewsArticleGallery from "@/src/features/news/components/NewsArticleGallery";
import {
  fadeUp,
  motionViewport,
  staggerContainer,
} from "@/src/lib/motion";
import type { NewsArticle, NewsArticleDetail } from "@/src/features/news/types";

type NewsArticleSectionProps = {
  article: NewsArticle;
  detail: NewsArticleDetail;
};

export default function NewsArticleSection({
  article,
  detail,
}: NewsArticleSectionProps) {
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
            {article.date ? (
              <time className="text-sm text-[#717171]">{article.date}</time>
            ) : null}

            {detail.video ? (
              <div className="mt-6 overflow-hidden rounded-2xl">
                <video
                  src={detail.video}
                  controls
                  playsInline
                  className="aspect-video w-full bg-black object-cover"
                />
              </div>
            ) : null}

            <div
              className="prose prose-sm mt-5 max-w-none text-[#454545] md:prose-base [&_a]:text-primary [&_strong]:text-black"
              dangerouslySetInnerHTML={{ __html: detail.contentHtml }}
            />
          </motion.article>

          {detail.gallery.length > 0 ? (
            <motion.div
              variants={fadeUp}
              className="min-w-0 flex-1 lg:max-w-[540px]"
            >
              <NewsArticleGallery images={detail.gallery} />
            </motion.div>
          ) : null}
        </div>
      </motion.div>
    </section>
  );
}
