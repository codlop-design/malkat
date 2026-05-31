"use client";

import Link from "next/link";
import { Star } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import type { ProductDetailMeta } from "@/src/features/products/data/productDetail";

type ProductReviewsSectionProps = {
  detail: ProductDetailMeta;
  title?: string;
};

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} من 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`size-4 ${
            i < rating
              ? "fill-[#F5B800] text-[#F5B800]"
              : "fill-[#E5E5E5] text-[#E5E5E5]"
          }`}
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

export default function ProductReviewsSection({
  detail,
  title = "آراء القراء",
}: ProductReviewsSectionProps) {
  const maxCount = Math.max(...detail.ratingDistribution, 1);

  return (
    <section className="mt-12">
      <h2 className="mb-6 text-xl font-bold text-black md:text-2xl">{title}</h2>
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        <div className="flex flex-1 flex-col gap-5">
          {detail.reviews.map((review) => (
            <article
              key={review.id}
              className="rounded-2xl border border-[#E8E8E8] bg-white p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <StarRow rating={review.rating} />
                <span className="text-xs text-[#717171]">{review.date}</span>
              </div>
              <p className="mt-2 text-sm font-medium text-black">{review.author}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#454545]">
                {review.text}
              </p>
            </article>
          ))}
          <Link
            href="#"
            className="text-center text-sm font-medium text-primary hover:underline"
          >
            عرض الكل
          </Link>
        </div>

        <div className="flex w-full shrink-0 flex-col items-center gap-5 rounded-2xl border border-[#E8E8E8] bg-[#FAFAFA] p-6 lg:w-[280px]">
          <div className="text-center">
            <p className="text-4xl font-bold text-black">{detail.averageRating}</p>
            <p className="mt-1 text-sm text-[#717171]">{detail.ratingLabel}</p>
            <p className="text-sm text-[#717171]">{detail.reviewCount} تقييم</p>
          </div>

          <div className="flex w-full flex-col gap-2">
            {detail.ratingDistribution.map((count, index) => {
              const stars = 5 - index;
              const width = `${(count / maxCount) * 100}%`;
              return (
                <div
                  key={stars}
                  className="flex items-center gap-2 text-xs text-[#454545]"
                >
                  <span className="w-3 shrink-0">{stars}</span>
                  <Star
                    className="size-3 shrink-0 fill-[#F5B800] text-[#F5B800]"
                    strokeWidth={0}
                  />
                  <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-[#E5E5E5]">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <Button
            className="w-full bg-primary text-white hover:bg-primary/90"
            disabled={detail.isRated}
          >
            {detail.isRated ? "تم التقييم" : "أضف تعليقاً"}
          </Button>
        </div>
      </div>
    </section>
  );
}
