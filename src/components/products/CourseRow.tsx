"use client";

import CourseCard, { type CourseCardProps } from "@/src/components/products/CourseCard";
import ProductSlider from "@/src/components/products/ProductSlider";

type CourseRowProps = {
  title: string;
  viewAllHref?: string;
  items: CourseCardProps[];
};

export default function CourseRow({
  title,
  viewAllHref = "#",
  items,
}: CourseRowProps) {
  return (
    <ProductSlider
      title={title}
      viewAllHref={viewAllHref}
      items={items}
      getKey={(item) => item.id ?? item.title}
      renderSlide={(item) => <CourseCard {...item} />}
    />
  );
}
