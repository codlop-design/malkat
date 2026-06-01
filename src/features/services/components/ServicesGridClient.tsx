"use client";

import { motion } from "framer-motion";

import Pagination from "@/src/components/Pagination";
import type { ServiceCardProps } from "@/src/features/products/components/cards/ServiceCard";
import type { CatalogPagination } from "@/src/features/products/types/catalogApi";
import ServiceListingCard from "@/src/features/services/components/ServiceListingCard";
import {
  servicesPaginationSearchParams,
  type ServiceCategoryId,
} from "@/src/features/services/types";
import { fadeUp, staggerContainer } from "@/src/lib/motion";

type ServicesGridClientProps = {
  items: ServiceCardProps[];
  pagination: CatalogPagination;
  category: ServiceCategoryId;
};

export default function ServicesGridClient({
  items,
  pagination,
  category,
}: ServicesGridClientProps) {
  const currentPage = pagination.current_page;
  const totalPages = Math.max(1, pagination.last_page);
  return (
    <section className="bg-[#FAFAFA] pb-14 md:pb-20">
      <div className="container">
        {items.length === 0 ? (
          <p className="mt-8 py-10 text-center text-sm text-[#717171]">
            لا توجد خدمات في هذا التصنيف.
          </p>
        ) : (
          <motion.ul
            className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            initial="hidden"
            animate="visible"
            variants={staggerContainer(0.06, 0.04)}
          >
            {items.map((service) => (
              <motion.li key={service.id} variants={fadeUp} className="h-full">
                <ServiceListingCard service={service} />
              </motion.li>
            ))}
          </motion.ul>
        )}

        <div className="mt-10">
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            basePath="/services"
            searchParams={servicesPaginationSearchParams(category)}
          />
        </div>
      </div>
    </section>
  );
}
