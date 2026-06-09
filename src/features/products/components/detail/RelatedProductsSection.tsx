"use client";

import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { useAuth } from "@/src/features/auth/context/AuthProvider";
import { useFavourites } from "@/src/features/products/context/FavouritesProvider";

import type { CatalogProduct } from "@/src/features/products/data/catalogAccess";
import { renderCatalogCard } from "@/src/features/products/data/catalogRegistry";

import "swiper/css";

type RelatedProductsSectionProps = {
  products: CatalogProduct[];
};

export default function RelatedProductsSection({
  products,
}: RelatedProductsSectionProps) {
  const { isAuthenticated, isAuthReady } = useAuth();
  const { syncProductFavourite } = useFavourites();

  useEffect(() => {
    if (!isAuthReady || !isAuthenticated) return;

    for (const product of products) {
      void syncProductFavourite(product.category, product.data.slug);
    }
  }, [products, isAuthReady, isAuthenticated, syncProductFavourite]);

  if (products.length === 0) return null;

  return (
    <section className="mt-14 border-t border-[#E8E8E8] pt-12" dir="rtl">
      <h2 className="mb-6 text-xl font-bold text-black md:mb-8 md:text-2xl">
        قد يعجبك أيضاً
      </h2>

      <div className="-mx-5 overflow-visible ps-5 md:mx-0 md:ps-0 pb-4">
        <Swiper
          speed={500}
          spaceBetween={16}
          slidesPerView={1.15}
          breakpoints={{
            480: { slidesPerView: 2, spaceBetween: 16 },
            640: { slidesPerView: 2.5, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 24 },
            1280: { slidesPerView: 5, spaceBetween: 24 },
          }}
          className="related-products-swiper overflow-hidden!"
        >
          {products.map((product) => (
            <SwiperSlide key={product.data.slug} className="h-auto!">
              {renderCatalogCard(product.category, product.data)}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
