import ProductBundleCard from "@/src/features/products/components/bundle-products/ProductBundleCard";
import type { ProductBundleDetails } from "@/src/features/products/types/bundleProduct";

type BundleProductsPageContentProps = {
  bundles: ProductBundleDetails[];
};

export default function BundleProductsPageContent({
  bundles,
}: BundleProductsPageContentProps) {
  return (
    <section className="pb-14 pt-8 md:pb-20 md:pt-12">
      <div className="container">
        {bundles.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {bundles.map((bundle) => (
              <ProductBundleCard key={bundle.slug} bundle={bundle} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl bg-[#FAFAFA] p-8 text-center text-sm text-[#717171]">
            لا توجد منتجات مجمعة متاحة حالياً.
          </p>
        )}
      </div>
    </section>
  );
}
