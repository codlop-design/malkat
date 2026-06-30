import { CATALOG_API_ENDPOINTS } from "@/src/features/products/api/catalogEndpoints";
import type { CatalogSectionKey } from "@/src/features/products/types";
import type { ProductDetailsApiPayload } from "@/src/features/products/types/catalogApi";
import { apiClient } from "@/src/lib/apiClient";

type ProductDetailsApiResponse = {
  success?: boolean;
  message?: string;
  data?: ProductDetailsApiPayload;
};

export type ProductSocialClientState = {
  isFavourite: boolean;
  isBought: boolean;
};

function readDetailSocialFields(
  category: CatalogSectionKey,
  payload: ProductDetailsApiPayload,
): { is_favourite?: boolean; is_bought?: boolean } | null {
  switch (category) {
    case "books":
      return "book_details" in payload ? payload.book_details : null;
    case "courses":
      return "course_details" in payload ? payload.course_details : null;
    case "services":
      return "service_details" in payload ? payload.service_details : null;
    case "activities":
      return "activity_details" in payload ? payload.activity_details : null;
    case "guides":
      return "evidence_details" in payload ? payload.evidence_details : null;
    default:
      return null;
  }
}

export async function getProductSocialClient(
  category: CatalogSectionKey,
  slug: string,
): Promise<ProductSocialClientState | null> {
  const endpoint = CATALOG_API_ENDPOINTS[category];

  const { data, status } = await apiClient.get<ProductDetailsApiResponse>(
    `${endpoint}/${slug}/details`,
    { validateStatus: () => true },
  );

  if (status >= 400 || !data?.success || !data.data) {
    return null;
  }

  const fields = readDetailSocialFields(category, data.data);
  if (!fields) {
    return null;
  }

  return {
    isFavourite: fields.is_favourite ?? false,
    isBought: fields.is_bought === true,
  };
}

export async function getProductIsFavouriteClient(
  category: CatalogSectionKey,
  slug: string,
): Promise<boolean | null> {
  const social = await getProductSocialClient(category, slug);
  return social?.isFavourite ?? null;
}
