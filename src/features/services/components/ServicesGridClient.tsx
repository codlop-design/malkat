"use client";

import { useEffect } from "react";

import Pagination from "@/src/components/Pagination";
import { useAuth } from "@/src/features/auth/context/AuthProvider";
import type { ServiceCardProps } from "@/src/features/products/components/cards/ServiceCard";
import { useFavourites } from "@/src/features/products/context/FavouritesProvider";
import type { CatalogPagination } from "@/src/features/products/types/catalogApi";
import ServiceListingCard from "@/src/features/services/components/ServiceListingCard";
import {
  servicesPaginationSearchParams,
  type ServiceCategoryId,
} from "@/src/features/services/types";

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
  const { isAuthenticated, isAuthReady } = useAuth();
  const { syncCatalogList } = useFavourites();
  const currentPage = pagination.current_page;
  const totalPages = Math.max(1, pagination.last_page);

  useEffect(() => {
    if (!isAuthReady) return;

    void syncCatalogList("services", currentPage);
  }, [currentPage, isAuthReady, isAuthenticated, syncCatalogList]);

  return (
    <section className="bg-[#FAFAFA] pb-14 md:pb-20">
      <div className="container">
        {items.length === 0 ? (
          <p className="mt-8 py-10 text-center text-sm text-[#717171]">
            لا توجد خدمات في هذا التصنيف.
          </p>
        ) : (
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {items.map((service) => (
              <li key={service.id} className="h-full">
                <ServiceListingCard service={service} />
              </li>
            ))}
          </ul>
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
