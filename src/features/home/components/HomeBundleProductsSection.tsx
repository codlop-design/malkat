import { BookOpen, GraduationCap, UsersRound } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

import BookCard from "@/src/features/products/components/cards/BookCard";
import CourseCard from "@/src/features/products/components/cards/CourseCard";
import GuideCard from "@/src/features/products/components/cards/GuideCard";
import { PRODUCT_BUNDLE_META } from "@/src/features/products/components/bundle-products/productBundleMeta";
import type {
  ProductBundleDetails,
  ProductBundleProduct,
} from "@/src/features/products/types/bundleProduct";

type HomeBundleProductsSectionProps = {
  bundles?: ProductBundleDetails[] | null;
};

export default function HomeBundleProductsSection({
  bundles,
}: HomeBundleProductsSectionProps) {
  if (!bundles?.length) {
    return null;
  }

  return (
    <section className="bg-white py-10 md:py-14" dir="rtl">
      <div className="container space-y-8">
        {bundles.map((bundle) => (
          <BundleShowcase
            key={`${bundle.productType}-${bundle.slug}`}
            bundle={bundle}
          />
        ))}
      </div>
    </section>
  );
}

function BundleShowcase({ bundle }: { bundle: ProductBundleDetails }) {
  const meta = PRODUCT_BUNDLE_META[bundle.productType];
  const productsCount = bundle.productsCount ?? bundle.products.length;
  const hasAgeGroup = Boolean(bundle.ageGroup);

  return (
    <article className="grid overflow-hidden rounded-[24px] bg-white shadow-[0_24px_72px_rgba(0,0,0,0.16)] lg:grid-cols-[0.82fr_1.88fr]">
      <aside className="relative min-h-[430px] overflow-hidden bg-[#0E3F3A] text-white lg:min-h-[520px]">
        <Image
          src={bundle.imageSrc}
          alt=""
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 100vw, 34vw"
          unoptimized={bundle.imageSrc.startsWith("http")}
        />
        <div className={`absolute inset-0 bg-linear-to-t ${meta.overlayClassName}`} />
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-9">
          <span
            className={`mb-4 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-bold backdrop-blur-sm ${meta.sideChipClassName}`}
          >
            <GraduationCap className="size-4" strokeWidth={1.8} />
            {meta.sideChip}
          </span>
          <h2 className="max-w-sm text-3xl font-black leading-tight lg:text-4xl">
            {bundle.title}
          </h2>
          <p className="mt-3 max-w-md text-sm leading-7 text-white/82">
            {bundle.subtitle}
          </p>
          <div
            className={`mt-6 grid gap-3 ${
              hasAgeGroup ? "grid-cols-2" : "grid-cols-1"
            }`}
          >
            {hasAgeGroup ? (
              <Metric
                icon={<UsersRound className="size-4" strokeWidth={1.8} />}
                label={bundle.ageGroup ?? ""}
                className={meta.ageClassName}
              />
            ) : null}
            <Metric
              icon={<BookOpen className="size-4" strokeWidth={1.8} />}
              label={meta.countLabel(productsCount)}
              className={meta.countClassName}
            />
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-col">
        <div className="border-b border-[#ECECEC] px-5 py-4 text-right sm:px-6 lg:px-8">
          <p className="text-xs font-semibold text-primary">{meta.header}</p>
          <h3 className="mt-1 text-lg font-bold text-black">{bundle.title}</h3>
        </div>

        <div className="bg-[#FAFAFA] p-5 sm:p-6 lg:p-8">
          {bundle.products.length > 0 ? (
            <div className="-mx-5 overflow-x-auto overflow-y-hidden px-5 pb-3 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 [scrollbar-color:#008075_#E7ECEB] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/75 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#E7ECEB]">
              <div className="flex w-max snap-x snap-mandatory items-stretch gap-5">
                {bundle.products.map((product) => (
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
    </article>
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
