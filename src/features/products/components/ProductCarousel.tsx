"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

type ProductCarouselProps<T extends { id?: string }> = {
  title: string;
  viewAllHref?: string;
  items: T[];
  renderSlide: (item: T) => ReactNode;
  getKey?: (item: T, index: number) => string;
};

export default function ProductCarousel<T extends { id?: string }>({
  title,
  viewAllHref = "#",
  items,
  renderSlide,
  getKey = (item, index) => item.id ?? String(index),
}: ProductCarouselProps<T>) {
  return (
    <section className="overflow-hidden">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-black md:text-2xl">{title}</h2>
        <Link
          href={viewAllHref}
          className="shrink-0 text-sm font-medium text-(--primary) hover:underline md:text-base"
        >
          عرض الكل
        </Link>
      </div>

      <div className="-mx-5 overflow-visible ps-5 md:mx-0 md:ps-0 pb-4">
        <Swiper
          
          speed={500}
          spaceBetween={16}
          slidesPerView={1.35}
          breakpoints={{
            480: { slidesPerView: 1, spaceBetween: 16 },
            640: { slidesPerView: 2.5, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1280: { slidesPerView: 4, spaceBetween: 24 },
          }}
          className="products-swiper overflow-visible!"
        >
          {items.map((item, index) => (
            <SwiperSlide key={getKey(item, index)} className="h-auto!">
              {renderSlide(item)}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
