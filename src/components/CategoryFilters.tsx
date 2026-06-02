import dynamic from "next/dynamic";
import type React from "react";

export type CategoryFilterItem<T extends string = string> = {
  id: T;
  icon: string;
  label: string;
  count: number;
};

export type CategoryFiltersProps<T extends string> = {
  active: T;
  categories: readonly CategoryFilterItem<T>[];
  getHref: (id: T) => string;
  ariaLabel?: string;
};

const CategoryFiltersClient = dynamic(
  () => import("@/src/components/CategoryFiltersClient"),
  { ssr: false },
);

export default function CategoryFilters<T extends string>(
  props: CategoryFiltersProps<T>,
) {
  const Client = CategoryFiltersClient as unknown as React.ComponentType<
    CategoryFiltersProps<T>
  >;
  return <Client {...props} />;
}
