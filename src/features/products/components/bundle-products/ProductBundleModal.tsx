"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  GraduationCap,
  Loader2,
  UsersRound,
  X,
} from "lucide-react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

import { getBundleProductDetailsClient } from "@/src/features/products/api/getBundleProductDetailsClient";
import BookCard from "@/src/features/products/components/cards/BookCard";
import CourseCard from "@/src/features/products/components/cards/CourseCard";
import GuideCard from "@/src/features/products/components/cards/GuideCard";
import { PRODUCT_BUNDLE_META } from "@/src/features/products/components/bundle-products/productBundleMeta";
import type {
  ProductBundleDetails,
  ProductBundleProduct,
} from "@/src/features/products/types/bundleProduct";

type ProductBundleModalProps = {
  bundle: ProductBundleDetails;
  open: boolean;
  onClose: () => void;
};

export default function ProductBundleModal({
  bundle,
  open,
  onClose,
}: ProductBundleModalProps) {
  const [products, setProducts] = useState<ProductBundleProduct[]>(
    bundle.products,
  );
  const [hasLoaded, setHasLoaded] = useState(bundle.products.length > 0);
  const meta = PRODUCT_BUNDLE_META[bundle.productType];
  const isLoading = open && !hasLoaded;
  const hasAgeGroup = Boolean(bundle.ageGroup);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, handleClose]);

  useEffect(() => {
    if (!open || hasLoaded) return;

    let active = true;

    getBundleProductDetailsClient(bundle.slug)
      .then((detail) => {
        if (!active) return;
        setProducts(detail?.products ?? []);
        setHasLoaded(true);
      })
      .catch(() => {
        if (!active) return;
        setProducts([]);
        setHasLoaded(true);
      });

    return () => {
      active = false;
    };
  }, [bundle.slug, hasLoaded, open]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-200 bg-black/45 backdrop-blur-[4px]"
            onClick={handleClose}
            aria-label="إغلاق"
          />

          <div className="pointer-events-none fixed inset-0 z-201 flex items-center justify-center p-2 lg:p-3">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={`product-bundle-${bundle.id}`}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto grid max-h-[98vh] w-full max-w-[98rem] grid-rows-[230px_auto] overflow-hidden rounded-[24px] bg-white shadow-[0_24px_72px_rgba(0,0,0,0.24)] sm:grid-rows-[280px_auto] lg:max-h-[96vh] lg:grid-cols-[0.82fr_1.88fr] lg:grid-rows-none"
              dir="rtl"
              onClick={(event) => event.stopPropagation()}
            >
              <aside className="relative min-h-0 overflow-hidden bg-[#0E3F3A] text-white">
                <Image
                  src={bundle.imageSrc}
                  alt=""
                  fill
                  className="object-cover object-top"
                  sizes="480px"
                  unoptimized={bundle.imageSrc.startsWith("http")}
                />
                <div
                  className={`absolute inset-0 bg-linear-to-t ${meta.overlayClassName}`}
                />
                <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-7 lg:p-8">
                  <span
                    className={`mb-3 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-bold backdrop-blur-sm lg:mb-4 ${meta.sideChipClassName}`}
                  >
                    <GraduationCap className="size-4" strokeWidth={1.8} />
                    {meta.sideChip}
                  </span>
                  <h2
                    id={`product-bundle-${bundle.id}`}
                    className="max-w-sm text-2xl font-black leading-tight sm:text-3xl lg:text-4xl"
                  >
                    {bundle.title}
                  </h2>
                  <p className="mt-2 max-w-sm text-sm leading-7 text-white/82 lg:mt-3">
                    {bundle.subtitle}
                  </p>
                  <div
                    className={`mt-4 grid gap-3 lg:mt-6 ${
                      hasAgeGroup ? "grid-cols-2" : "grid-cols-1"
                    }`}
                  >
                    {hasAgeGroup ? (
                      <Metric
                        icon={
                          <UsersRound className="size-4" strokeWidth={1.8} />
                        }
                        label={bundle.ageGroup ?? ""}
                        className={meta.ageClassName}
                      />
                    ) : null}
                    <Metric
                      icon={<BookOpen className="size-4" strokeWidth={1.8} />}
                      label={meta.countLabel(products.length)}
                      className={meta.countClassName}
                    />
                  </div>
                </div>
              </aside>

              <div className="flex min-h-0 min-w-0 flex-col">
                <div className="flex shrink-0 items-center justify-between border-b border-[#ECECEC] px-5 py-4 sm:px-6 lg:px-8">
                  <div>
                    <p className="text-xs font-semibold text-primary">
                      {meta.header}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-black">
                      {bundle.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex size-9 items-center justify-center rounded-full bg-[#F5F5F5] text-[#454545] transition-colors hover:bg-[#E9F6F4] hover:text-primary"
                    aria-label="إغلاق"
                  >
                    <X className="size-5" strokeWidth={1.8} />
                  </button>
                </div>

                <div className="min-h-0 bg-[#FAFAFA] p-5 sm:p-6 lg:p-8">
                  {isLoading ? (
                    <div className="flex min-h-[280px] items-center justify-center">
                      <Loader2
                        className="size-8 animate-spin text-primary"
                        strokeWidth={1.8}
                        aria-hidden
                      />
                    </div>
                  ) : products.length > 0 ? (
                    <div className="-mx-5 overflow-x-auto overflow-y-hidden px-5 pb-3 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 [scrollbar-color:#008075_#E7ECEB] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/75 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#E7ECEB]">
                      <div className="flex w-max snap-x snap-mandatory items-stretch gap-5">
                        {products.map((product) => (
                          <BundleProductItem
                            key={`${product.category}-${product.slug}`}
                            product={product}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="rounded-2xl bg-white p-8 text-center text-sm text-[#717171]">
                      {meta.empty}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

function Metric({
  icon,
  label,
  className,
}: {
  icon: ReactNode;
  label: string;
  className: string;
}) {
  return (
    <div
      className={`flex items-center gap-2 rounded-2xl px-3 py-3 text-sm font-bold backdrop-blur ${className}`}
    >
      {icon}
      <span className="min-w-0 truncate">{label}</span>
    </div>
  );
}

function BundleProductItem({ product }: { product: ProductBundleProduct }) {
  return (
    <div className="flex h-[455px] w-[250px] shrink-0 snap-start sm:w-[268px] lg:w-[280px] [&>article]:w-full">
      {product.category === "books" ? <BookCard {...product} /> : null}
      {product.category === "guides" ? <GuideCard {...product} /> : null}
      {product.category === "courses" ? <CourseCard {...product} /> : null}
    </div>
  );
}
