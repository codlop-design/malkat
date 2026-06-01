import { getServiceTypes } from "@/src/features/services/api/getServiceTypes";
import ServicesCategoryFiltersClient from "@/src/features/services/components/ServicesCategoryFiltersClient";
import { mapServiceTypesToFilterCategories } from "@/src/features/services/lib/mapServiceTypeCategories";
import { parseServiceCategory } from "@/src/features/services/types";

type ServicesCategoryFiltersProps = {
  category?: string | null;
};

export default async function ServicesCategoryFilters({
  category,
}: ServicesCategoryFiltersProps) {
  const types = await getServiceTypes();
  const categories = mapServiceTypesToFilterCategories(types);
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
