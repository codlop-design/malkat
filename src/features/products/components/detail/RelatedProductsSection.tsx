"use client";

import type { CatalogProduct } from "@/src/features/products/data/catalogAccess";
import { renderCatalogCard } from "@/src/features/products/data/catalogRegistry";

type RelatedProductsSectionProps = {
  products: CatalogProduct[];
};

export default function RelatedProductsSection({
  products,
}: RelatedProductsSectionProps) {
  if (products.length === 0) return null;

  return (
    <section className="mt-14 border-t border-[#E8E8E8] pt-12">
      <h2 className="mb-8 text-xl font-bold text-black md:text-2xl">
        قد يعجبك أيضاً
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div key={product.data.slug} className="h-full">
            {renderCatalogCard(product.category, product.data)}
          </div>
        ))}
      </div>
    </section>
  );
}
