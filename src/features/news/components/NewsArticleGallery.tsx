"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperInstance } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

type NewsArticleGalleryProps = {
  images: string[];
};

function isValidImageSrc(src: string): boolean {
  return (
    src.startsWith("/") ||
    src.startsWith("http://") ||
    src.startsWith("https://")
  );
}

export default function NewsArticleGallery({ images }: NewsArticleGalleryProps) {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const galleryImages = useMemo(
    () => images.filter((src) => isValidImageSrc(src)),
    [images],
  );

  if (galleryImages.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <Swiper
          onSwiper={setSwiper}
          onSlideChange={(instance) => setActiveIndex(instance.activeIndex)}
          speed={400}
          className="overflow-hidden rounded-2xl"
        >
          {galleryImages.map((src, index) => (
            <SwiperSlide key={`${src}-${index}`}>
              <div className="relative aspect-4/3 w-full bg-[#F5F5F5]">
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

        {galleryImages.length > 1 ? (
          <>
            <button
              type="button"
              onClick={() => swiper?.slidePrev()}
              className="absolute top-1/2 inset-s-3 z-10 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-[#454545] shadow-md transition-colors hover:bg-white"
              aria-label="الصورة السابقة"
            >
              <ChevronRight className="size-5" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => swiper?.slideNext()}
              className="absolute top-1/2 inset-e-3 z-10 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-[#454545] shadow-md transition-colors hover:bg-white"
              aria-label="الصورة التالية"
            >
              <ChevronLeft className="size-5" strokeWidth={2} />
            </button>
          </>
        ) : null}
      </div>

      {galleryImages.length > 1 ? (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {galleryImages.map((src, index) => (
            <button
              key={`thumb-${src}-${index}`}
              type="button"
              onClick={() => swiper?.slideTo(index)}
              className={`relative size-20 shrink-0 cursor-pointer overflow-hidden rounded-xl transition-opacity sm:size-24 ${
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
                sizes="96px"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
