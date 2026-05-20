"use client";

import { fadeUp, motionViewport, staggerContainer } from "@/src/lib/motion";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import CategoryFilters, {
  type ProductCategoryId,
} from "@/src/components/products/CategoryFilters";
import CourseRow from "@/src/components/products/CourseRow";
import ProductRow from "@/src/components/products/ProductRow";
import {
  ACTIVITIES_ITEMS,
  BOOKS_ITEMS,
  COURSES_ITEMS,
  GUIDES_ITEMS,
  SERVICES_ITEMS,
} from "@/src/components/products/productsData";

const CATEGORY_SECTIONS: Record<
  ProductCategoryId,
  Array<"books" | "activities" | "courses" | "services" | "guides">
> = {
  all: ["books", "activities", "courses", "services", "guides"],
  books: ["books"],
  activities: ["activities"],
  courses: ["courses"],
  services: ["services"],
  guides: ["guides"],
};

export default function DiscoverSection() {
  const [category, setCategory] = useState<ProductCategoryId>("all");

  const visibleSections = useMemo(
    () => CATEGORY_SECTIONS[category],
    [category],
  );

  return (
    <div>
      <section className="overflow-hidden pb-6 pt-6 md:pb-8 md:pt-8 lg:pb-10">
        <div className="container">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <motion.div
              className="order-2 max-w-xl space-y-4 text-right lg:order-1 lg:justify-self-start"
              dir="rtl"
              initial="hidden"
              whileInView="visible"
              viewport={motionViewport}
              variants={staggerContainer()}
            >
              <motion.h1
                variants={fadeUp}
                className="text-2xl font-bold leading-snug text-black md:text-3xl lg:text-[40px] lg:leading-[1.35]"
              >
                اكتشف عالماً من المحتوى التعليمي الممتع
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-base leading-[1.85] text-[#454545] md:text-lg"
              >
                تصفّح الكتب والأنشطة والدورات والمنتجات المصممة لتنمية مهارات
                الأطفال بطريقة عصرية وتفاعلية.
              </motion.p>
            </motion.div>

            {/* صورة — يمين الشاشة */}
            <motion.div
              className="relative order-1 mx-auto w-full max-w-[520px] lg:order-2 lg:max-w-none lg:justify-self-end"
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={motionViewport}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/Group 16.svg"
                alt=""
                width={633}
                height={555}
                className="h-auto w-full"
                priority
                unoptimized
              />
            </motion.div>
          </div>

          <motion.div
            className="mt-10 md:mt-12 lg:mt-14 bg-[#F5F5F5] p-4"
            initial="hidden"
            whileInView="visible"
            viewport={motionViewport}
            variants={fadeUp}
          >
            <CategoryFilters active={category} onChange={setCategory} />
          </motion.div>
        </div>
      </section>

      {/* صفوف السلايدر */}
      <section className="pb-14 md:pb-20">
        <div className="container">
          {visibleSections.includes("books") && (
            <ProductRow
              title="الكتب"
              viewAllHref="/products?category=books"
              items={BOOKS_ITEMS}
            />
          )}

          {visibleSections.includes("activities") && (
            <ProductRow
              title="الأنشطة"
              viewAllHref="/products?category=activities"
              items={ACTIVITIES_ITEMS}
            />
          )}

          {visibleSections.includes("courses") && (
            <CourseRow
              title="الدورات"
              viewAllHref="/products?category=courses"
              items={COURSES_ITEMS}
            />
          )}

          {visibleSections.includes("services") && (
            <ProductRow
              title="الخدمات"
              viewAllHref="/products?category=services"
              items={SERVICES_ITEMS}
            />
          )}

          {visibleSections.includes("guides") && (
            <ProductRow
              title="أدلة إجرائية"
              viewAllHref="/products?category=guides"
              items={GUIDES_ITEMS}
            />
          )}
        </div>
      </section>
    </div>
  );
}
