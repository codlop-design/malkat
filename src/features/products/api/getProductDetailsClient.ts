import { CATALOG_API_ENDPOINTS } from "@/src/features/products/api/catalogEndpoints";
import {
  mapProductDetailResponse,
  type ProductDetailView,
} from "@/src/features/products/mapProductDetail";
import type { CatalogSectionKey } from "@/src/features/products/types";
import type { ProductDetailsApiPayload } from "@/src/features/products/types/catalogApi";
import { apiClient } from "@/src/lib/apiClient";

type ProductDetailsApiResponse = {
  success?: boolean;
  message?: string;
  data?: ProductDetailsApiPayload;
};

export async function getProductDetailsClient(
  category: CatalogSectionKey,
  slug: string,
): Promise<ProductDetailView | null> {
  const endpoint = CATALOG_API_ENDPOINTS[category];

  const { data, status } = await apiClient.get<ProductDetailsApiResponse>(
    `${endpoint}/${slug}/details`,
    { validateStatus: () => true },
  );

  if (status >= 400 || !data?.success || !data.data) {
    return null;
  }

  return mapProductDetailResponse(category, slug, data.data);
}
