import { getServicesList } from "@/src/features/services/api/getServicesList";
import ServicesGridClient from "@/src/features/services/components/ServicesGridClient";
import {
  parseServiceCategory,
  parseServicePage,
} from "@/src/features/services/types";

type ServicesGridProps = {
  category?: string | null;
  page?: string | null;
};

const EMPTY_PAGINATION = {
  current_page: 1,
  last_page: 1,
  per_page: 4,
  total: 0,
  from: 0,
  to: 0,
};

export default async function ServicesGrid({
  category,
  page: pageParam,
}: ServicesGridProps) {
  const active = parseServiceCategory(category);
  const page = parseServicePage(pageParam);
  const result = await getServicesList(active, page);

  return (
    <ServicesGridClient
      items={result?.items ?? []}
      pagination={result?.pagination ?? EMPTY_PAGINATION}
      category={active}
    />
  );
}
