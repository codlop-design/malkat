import { ServicesListResult } from "@/src/features/services/api/getServicesList";
import ServicesGridClient from "@/src/features/services/components/ServicesGridClient";
import { parseServiceCategory } from "@/src/features/services/types";

type ServicesGridProps = {
  category?: string | null;
  page?: string | null;
  result: ServicesListResult;
};

const EMPTY_PAGINATION = {
  current_page: 1,
  last_page: 1,
  per_page: 4,
  total: 0,
  from: 0,
  to: 0,
};

export default function ServicesGrid({ category, result }: ServicesGridProps) {
  const active = parseServiceCategory(category);

  return (
    <ServicesGridClient
      items={result?.items ?? []}
      pagination={result?.pagination ?? EMPTY_PAGINATION}
      category={active}
    />
  );
}
