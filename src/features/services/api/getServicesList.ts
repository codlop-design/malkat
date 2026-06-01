import { mapServiceItem } from "@/src/features/products/mapCatalogItems";
import type { ServiceCardProps } from "@/src/features/products/components/cards/ServiceCard";
import type {
  CatalogPagination,
  ServiceApiItem,
} from "@/src/features/products/types/catalogApi";
import { SERVICE_TYPES_REVALIDATE_SECONDS } from "@/src/features/services/api/getServiceTypes";
import type { ServiceCategoryId } from "@/src/features/services/types";
import { fetcher } from "@/src/lib/fetch";
import type { ApiResponse } from "@/src/types/types";

type ServicesListApiResponse = ApiResponse<ServiceApiItem[]> & {
  pagination: CatalogPagination;
};

export type ServicesListResult = {
  items: ServiceCardProps[];
  pagination: CatalogPagination;
};

export async function getServicesList(
  category: ServiceCategoryId,
  page = 1,
): Promise<ServicesListResult | null> {
  const params = new URLSearchParams({
    page: String(page),
    per_page: "8",
  });

  if (category !== "all") {
    params.set("type_id", category);
  }

  const response = (await fetcher<ServiceApiItem[]>(`/services?${params}`, {
    next: { revalidate: SERVICE_TYPES_REVALIDATE_SECONDS },
  })) as ServicesListApiResponse | null;

  if (!response?.success) {
    return null;
  }

  return {
    items: (response.data ?? []).map(mapServiceItem),
    pagination: response.pagination,
  };
}
