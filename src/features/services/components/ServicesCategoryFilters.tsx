import ServicesCategoryFiltersClient from "@/src/features/services/components/ServicesCategoryFiltersClient";
import { mapServiceTypesToFilterCategories } from "@/src/features/services/lib/mapServiceTypeCategories";
import {
  parseServiceCategory,
  ServiceTypeApiItem,
} from "@/src/features/services/types";

type ServicesCategoryFiltersProps = {
  category?: string | null;
  types: ServiceTypeApiItem[];
  allTotalCount: number;
};

export default function ServicesCategoryFilters({
  category,
  types,
  allTotalCount,
}: ServicesCategoryFiltersProps) {
  const categories = mapServiceTypesToFilterCategories(types, allTotalCount);
  const active = parseServiceCategory(category);

  return (
    <section className="bg-[#FAFAFA]">
      <div className="container">
        <div className="mt-10 overflow-hidden rounded-2xl bg-[#F5F5F5] p-4 md:mt-12 lg:mt-14">
          <ServicesCategoryFiltersClient
            active={active}
            categories={categories}
          />
        </div>
      </div>
    </section>
  );
}
