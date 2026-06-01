import { fetcher } from "@/src/lib/fetch";
import type { ServiceTypeApiItem } from "@/src/features/services/types";

export const SERVICE_TYPES_REVALIDATE_SECONDS = 60;

export async function getServiceTypes(): Promise<ServiceTypeApiItem[]> {
  const response = await fetcher<ServiceTypeApiItem[]>("/services-types", {
    next: { revalidate: SERVICE_TYPES_REVALIDATE_SECONDS },
  });

  if (!response?.success) {
    return [];
  }

  return response.data ?? [];
}
