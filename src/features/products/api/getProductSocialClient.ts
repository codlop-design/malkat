import { CATALOG_API_ENDPOINTS } from "@/src/features/products/api/catalogEndpoints";
import type { CatalogSectionKey } from "@/src/features/products/types";
import type { ProductDetailsApiPayload } from "@/src/features/products/types/catalogApi";
import { apiClient } from "@/src/lib/apiClient";

type ProductDetailsApiResponse = {
  success?: boolean;
  message?: string;
  data?: ProductDetailsApiPayload;
};

function readIsFavourite(
  category: CatalogSectionKey,
  payload: ProductDetailsApiPayload,
): boolean {
  switch (category) {
    case "books":
      return "book_details" in payload
        ? (payload.book_details.is_favourite ?? false)
        : false;
    case "courses":
      return "course_details" in payload
        ? (payload.course_details.is_favourite ?? false)
        : false;
    case "services":
      return "service_details" in payload
        ? (payload.service_details.is_favourite ?? false)
        : false;
    case "activities":
      return "activity_details" in payload
        ? (payload.activity_details.is_favourite ?? false)
        : false;
    case "guides":
      return "evidence_details" in payload
        ? (payload.evidence_details.is_favourite ?? false)
        : false;
    default:
      return false;
  }
}

export async function getProductIsFavouriteClient(
  category: CatalogSectionKey,
  slug: string,
): Promise<boolean | null> {
  const endpoint = CATALOG_API_ENDPOINTS[category];

  const { data, status } = await apiClient.get<ProductDetailsApiResponse>(
    `${endpoint}/${slug}/details`,
    { validateStatus: () => true },
  );

  if (status >= 400 || !data?.success || !data.data) {
    return null;
  }

  return readIsFavourite(category, data.data);
}
