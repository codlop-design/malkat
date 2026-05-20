"use client";

import ProductCard, { type ProductCardProps } from "@/src/components/products/ProductCard";
import ProductSlider from "@/src/components/products/ProductSlider";

type ProductRowProps = {
  title: string;
  viewAllHref?: string;
  items: ProductCardProps[];
};

/** صف كتب/منتجات — سلايدر أفقي */
export default function ProductRow({
  title,
  viewAllHref = "#",
  items,
}: ProductRowProps) {
  return (
    <ProductSlider
      title={title}
      viewAllHref={viewAllHref}
      items={items}
      getKey={(item) => item.id ?? item.title}
      renderSlide={(item) => <ProductCard {...item} />}
    />
  );
}
