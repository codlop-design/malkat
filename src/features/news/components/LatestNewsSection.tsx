"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import NewsCard from "@/src/features/news/components/NewsCard";
import {
  fadeUp,
  motionViewport,
  staggerContainer,
} from "@/src/lib/motion";
import type { NewsArticle } from "@/src/features/news/types";

type LatestNewsSectionProps = {
  articles: NewsArticle[];
};

export default function LatestNewsSection({ articles }: LatestNewsSectionProps) {
  if (!articles.length) {
    return null;
  }

  return (
    <section className="bg-[#FAFAFA] py-12 md:py-16">
      <div className="container">
        <motion.div
          dir="rtl"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={staggerContainer(0.08, 0.05)}
        >
          <motion.div
            variants={fadeUp}
            className="mb-8 flex items-center justify-between gap-4"
          >
            <h2 className="text-xl font-bold text-black md:text-2xl">
              آخر الأخبار
            </h2>
            <Link
              href="/news/all"
              className="shrink-0 text-sm font-medium text-primary hover:underline md:text-base"
            >
              عرض الكل
            </Link>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {articles.map((article) => (
              <motion.div key={article.id} variants={fadeUp} className="h-full">
                <NewsCard article={article} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
