"use client";

import {
  BookOpen,
  FileText,
  GraduationCap,
  Sparkles,
  UsersRound,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import ProductBundleModal from "@/src/features/products/components/bundle-products/ProductBundleModal";
import { PRODUCT_BUNDLE_META } from "@/src/features/products/components/bundle-products/productBundleMeta";
import type { ProductBundleDetails } from "@/src/features/products/types/bundleProduct";

type ProductBundleCardProps = {
  bundle: ProductBundleDetails;
};

export default function ProductBundleCard({ bundle }: ProductBundleCardProps) {
  const [open, setOpen] = useState(false);
  const meta = PRODUCT_BUNDLE_META[bundle.productType];
  const productsCount = bundle.productsCount;
  const displayCount = productsCount ?? bundle.products.length;
  const hasProducts = productsCount == null ? true : productsCount > 0;
  const hasAgeGroup = Boolean(bundle.ageGroup);

  function handleOpen() {
    if (!hasProducts) return;
    setOpen(true);
  }

  return (
    <>
      <article
        className={`relative flex h-full min-h-[395px] flex-col overflow-hidden rounded-2xl bg-[#0E3F3A] text-white shadow-[0_18px_42px_rgba(0,128,117,0.18)] transition duration-300 ${
          hasProducts
            ? "hover:-translate-y-1"
            : "cursor-not-allowed opacity-55 grayscale"
        }`}
      >
        <button
          type="button"
          onClick={handleOpen}
          disabled={!hasProducts}
          className={`absolute inset-0 z-10 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
            hasProducts ? "cursor-pointer" : "cursor-not-allowed"
          }`}
          aria-label={bundle.title}
          aria-disabled={!hasProducts}
        />

        <div className="relative h-56 shrink-0 overflow-hidden bg-[#EAF4F2]">
          <Image
            src={bundle.imageSrc}
            alt=""
            fill
            className="object-cover object-top"
            sizes="(min-width: 1024px) 31vw, (min-width: 768px) 45vw, 92vw"
            unoptimized={bundle.imageSrc.startsWith("http")}
          />
          <div
            className={`absolute inset-0 bg-linear-to-t ${meta.overlayClassName}`}
          />
          <div
            className={`absolute top-4 inset-e-4 inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-bold ${meta.chipClassName}`}
          >
            <BundleChipIcon productType={bundle.productType} />
            {meta.chip}
          </div>
        </div>

        <div className="relative flex flex-1 flex-col p-5 text-right">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {hasAgeGroup ? (
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${meta.ageClassName}`}
              >
                <UsersRound className="size-3.5" strokeWidth={1.8} />
                {bundle.ageGroup}
              </span>
            ) : null}
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                hasProducts ? meta.countClassName : "bg-white/14 text-white/78"
              }`}
            >
              <BookOpen className="size-3.5" strokeWidth={1.8} />
              {meta.countLabel(displayCount)}
            </span>
          </div>

          <h3 className="text-xl font-bold leading-snug">{bundle.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/78">
            {bundle.subtitle}
          </p>

          <div className="mt-auto pt-5">
            <span
              className={`pointer-events-none inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-bold shadow-[0_10px_24px_rgba(0,0,0,0.16)] ${
                hasProducts
                  ? meta.actionClassName
                  : "bg-white/45 text-[#454545]"
              }`}
            >
              <Sparkles className="size-4" strokeWidth={1.9} />
              {meta.action}
            </span>
          </div>
        </div>
      </article>

      <ProductBundleModal
        bundle={bundle}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

function BundleChipIcon({
  productType,
}: {
  productType: ProductBundleDetails["productType"];
}) {
  if (productType === "book") {
    return <BookOpen className="size-3.5" strokeWidth={1.7} />;
  }

  if (productType === "evidence") {
    return <FileText className="size-3.5" strokeWidth={1.7} />;
  }

  return <GraduationCap className="size-3.5" strokeWidth={1.7} />;
}
