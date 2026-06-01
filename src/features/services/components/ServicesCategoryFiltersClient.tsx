"use client";

import CategoryFilters, {
  type CategoryFilterItem,
} from "@/src/components/CategoryFilters";
import {
  serviceCategoryHref,
  type ServiceCategoryId,
} from "@/src/features/services/types";

type ServicesCategoryFiltersClientProps = {
  active: ServiceCategoryId;
  categories: CategoryFilterItem<string>[];
};

export default function ServicesCategoryFiltersClient({
  active,
  categories,
}: ServicesCategoryFiltersClientProps) {
  return (
    <CategoryFilters
      active={active}
      categories={categories}
      getHref={serviceCategoryHref}
      ariaLabel="تصفية الخدمات"
    />
  );
}
