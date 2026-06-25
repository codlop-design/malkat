"use client";

import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/src/components/ui/button";
import { useAuth } from "@/src/features/auth/context/AuthProvider";
import { fetchProductDetailRatingUpdate } from "@/src/features/products/api/fetchProductDetailRating";
import { submitProductRate } from "@/src/features/products/api/submitProductRateClient";
import ProductRatingModal from "@/src/features/products/components/detail/ProductRatingModal";
import type { ProductDetailMeta } from "@/src/features/products/data/productDetail";
import type { CatalogSectionKey } from "@/src/features/products/types";

type ProductReviewsSectionProps = {
  detail: ProductDetailMeta;
  title?: string;
  category: CatalogSectionKey;
  slug: string;
  onDetailUpdated?: (detail: ProductDetailMeta) => void;
};

const RATING_MODAL_TITLE: Record<CatalogSectionKey, string> = {
  books: "تقييم الكتاب",
  activities: "تقييم النشاط",
  courses: "تقييم الدورة",
  services: "تقييم الخدمة",
  guides: "تقييم الدليل",
};

const RATING_QUESTION: Record<CatalogSectionKey, string> = {
  books: "ما مدى رضاك عن الكتاب المقدم؟",
  activities: "ما مدى رضاك عن النشاط المقدم؟",
  courses: "ما مدى رضاك عن الدورة المقدمة؟",
  services: "ما مدى رضاك عن الخدمة المقدمة؟",
  guides: "ما مدى رضاك عن الدليل المقدم؟",
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

function formatAverageRating(value: number): string {
  if (value <= 0) return "0";
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

export default function ProductReviewsSection({
  detail,
  title = "آراء القراء",
  category,
  slug,
  onDetailUpdated,
}: ProductReviewsSectionProps) {
  const router = useRouter();
  const { isAuthenticated, isAuthReady } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ratedLocally, setRatedLocally] = useState(false);
  const [trackedSlug, setTrackedSlug] = useState(slug);
  const [isPending, startTransition] = useTransition();

  if (trackedSlug !== slug) {
    setTrackedSlug(slug);
    setRatedLocally(false);
  }

  const isRated = Boolean(detail.isRated) || ratedLocally;

  async function refreshDetailFromApi() {
    const next = await fetchProductDetailRatingUpdate(category, slug, detail);
    if (next) {
      onDetailUpdated?.(next);
    }
  }

  const maxCount = Math.max(...detail.ratingDistribution, 1);
  const hasReviews = detail.reviews.length > 0;

  function handleOpenRating() {
    if (!isAuthReady) return;

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (isRated) return;
    setIsModalOpen(true);
  }

  function handleSubmitRating({
    rate,
    comment,
  }: {
    rate: number;
    comment: string;
  }) {
    startTransition(async () => {
      const result = await submitProductRate({
        category,
        slug,
        rate,
        comment,
      });

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      setRatedLocally(true);
      setIsModalOpen(false);
      await refreshDetailFromApi();
      router.refresh();
    });
  }

  return (
    <>
      <section className="mt-12">
        <h2 className="mb-6 text-xl font-bold text-black md:text-2xl">{title}</h2>
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          <div className="flex flex-1 flex-col gap-5">
            {hasReviews ? (
              detail.reviews.map((review) => (
                <article
                  key={review.id}
                  className="rounded-2xl border border-[#E8E8E8] bg-white p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <StarRow rating={review.rating} />
                    <span className="text-xs text-[#717171]">{review.date}</span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-black">
                    {review.author}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#454545]">
                    {review.text}
                  </p>
                </article>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-[#E8E8E8] bg-white p-6 text-center text-sm text-[#717171]">
                لا توجد تقييمات بعد. كن أول من يقيّم هذا المنتج.
              </div>
            )}
          </div>

          <div className="flex w-full shrink-0 flex-col items-center gap-5 rounded-2xl border border-[#E8E8E8] bg-[#FAFAFA] p-6 lg:w-[280px]">
            <div className="text-center">
              <p className="text-4xl font-bold text-black">
                {formatAverageRating(detail.averageRating)}
              </p>
              <p className="mt-1 text-sm text-[#717171]">
                {detail.averageRating > 0
                  ? detail.ratingLabel || "تقييم المستخدمين"
                  : "لا يوجد تقييم بعد"}
              </p>
              <p className="text-sm text-[#717171]">{detail.reviewCount} تقييم</p>
            </div>

            {detail.averageRating > 0 ? (
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
            ) : null}

            <Button
              type="button"
              className="w-full bg-primary text-white hover:bg-primary/90"
              disabled={isRated || isPending}
              onClick={handleOpenRating}
            >
              {isRated ? "تم التقييم" : "أضف تعليقاً"}
            </Button>
          </div>
        </div>
      </section>

      <ProductRatingModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={RATING_MODAL_TITLE[category]}
        question={RATING_QUESTION[category]}
        isSubmitting={isPending}
        onSubmit={handleSubmitRating}
      />
    </>
  );
}
