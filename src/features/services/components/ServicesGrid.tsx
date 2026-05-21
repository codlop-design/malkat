"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

import CategoryFilters from "@/src/components/CategoryFilters";
import { SERVICE_CATEGORIES } from "@/src/features/services/data/categories";
import ServiceListingCard from "@/src/features/services/components/ServiceListingCard";
import { filterServicesByCategory } from "@/src/features/services/data/services";
import {
  parseServiceCategory,
  serviceCategoryHref,
} from "@/src/features/services/types";
import { fadeUp, motionViewport, staggerContainer } from "@/src/lib/motion";

export default function ServicesGrid() {
  const searchParams = useSearchParams();
  const category = parseServiceCategory(searchParams.get("category"));

  // مؤقت: دائماً كل الخدمات — الفلتر يحدّث الرابط فقط
  const displayItems = useMemo(
    () => filterServicesByCategory(category),
    [category],
  );

  return (
    <section className="bg-[#FAFAFA] pb-14 md:pb-20">
      <div className="container">
        <motion.div
          className="overflow-visible rounded-2xl bg-white p-4 shadow-[0_2px_16px_rgba(0,0,0,0.04)] md:p-5"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={fadeUp}
        >
          <CategoryFilters
            active={category}
            categories={SERVICE_CATEGORIES}
            getHref={serviceCategoryHref}
            ariaLabel="تصفية الخدمات"
          />
        </motion.div>

        <motion.ul
          className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.06, 0.04)}
        >
          {displayItems.map((service) => (
            <motion.li key={service.id} variants={fadeUp} className="h-full">
              <ServiceListingCard service={service} />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
