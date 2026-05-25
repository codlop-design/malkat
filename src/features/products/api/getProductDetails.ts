import { CATALOG_API_ENDPOINTS } from "@/src/features/products/api/catalogEndpoints";
import {
  mapProductDetailResponse,
  type ProductDetailView,
} from "@/src/features/products/mapProductDetail";
import type { CatalogSectionKey } from "@/src/features/products/types";
import type { ProductDetailsApiPayload } from "@/src/features/products/types/catalogApi";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type ProductDetailsApiResponse = {
  success: boolean;
  message: string;
  data: ProductDetailsApiPayload;
};

export async function getProductDetails(
  category: CatalogSectionKey,
  slug: string,
): Promise<ProductDetailView | null> {
  const endpoint = CATALOG_API_ENDPOINTS[category];

  try {
    const response = await fetch(`${API_URL}${endpoint}/${slug}/details`, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`Fetch error: ${response.status} ${response.statusText}`);
      return null;
    }

    const json = (await response.json()) as ProductDetailsApiResponse;

    if (!json.success) {
      return null;
    }

    return mapProductDetailResponse(category, slug, json.data);
  } catch (error) {
    console.error("Fetch exception:", error);
    return null;
  }
}
