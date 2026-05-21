"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperInstance } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

type NewsArticleGalleryProps = {
  images: string[];
};

export default function NewsArticleGallery({ images }: NewsArticleGalleryProps) {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <Swiper
          onSwiper={setSwiper}
          onSlideChange={(instance) => setActiveIndex(instance.activeIndex)}
          speed={400}
          className="overflow-hidden rounded-2xl"
        >
          {images.map((src, index) => (
            <SwiperSlide key={`${src}-${index}`}>
              <div className="relative aspect-4/3 w-full">
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={index === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {images.length > 1 ? (
          <>
            <button
              type="button"
              onClick={() => swiper?.slidePrev()}
              className="absolute top-1/2 inset-s-3 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#454545] shadow-md transition-colors hover:bg-white"
              aria-label="الصورة السابقة"
            >
              <ChevronRight className="size-5" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => swiper?.slideNext()}
              className="absolute top-1/2 inset-e-3 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#454545] shadow-md transition-colors hover:bg-white"
              aria-label="الصورة التالية"
            >
              <ChevronLeft className="size-5" strokeWidth={2} />
            </button>
          </>
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="grid grid-cols-3 gap-3">
          {images.map((src, index) => (
            <button
              key={`thumb-${src}-${index}`}
              type="button"
              onClick={() => swiper?.slideTo(index)}
              className={`relative aspect-square overflow-hidden rounded-xl transition-opacity ${
                index === activeIndex
                  ? "ring-2 ring-primary ring-offset-2"
                  : "opacity-70 hover:opacity-100"
              }`}
              aria-label={`عرض الصورة ${index + 1}`}
              aria-current={index === activeIndex ? true : undefined}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="120px"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
