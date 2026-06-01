import { apiClient, ensureCsrfCookie } from "@/src/lib/apiClient";
import { CATALOG_API_ENDPOINTS } from "@/src/features/products/api/catalogEndpoints";
import type { CatalogSectionKey } from "@/src/features/products/types";

export type FavouriteActionResult = {
  success: boolean;
  message: string;
};

export async function addToFavourites(
  category: CatalogSectionKey,
  slug: string,
): Promise<FavouriteActionResult> {
  const type = CATALOG_API_ENDPOINTS[category].replace(/^\//, "");

  try {
    await ensureCsrfCookie();

    const { data, status } = await apiClient.post<{
      success?: boolean;
      message?: string;
    }>(`/api/${type}/${slug}/favourites`);

    if (status === 401 || status === 403) {
      return {
        success: false,
        message: "يرجى تسجيل الدخول أولاً",
      };
    }

    if (status >= 400 || !data.success) {
      return {
        success: false,
        message: data.message ?? "تعذر الإضافة للمفضلة",
      };
    }

    return {
      success: true,
      message: data.message ?? "تمت الإضافة للمفضلة",
    };
  } catch {
    return {
      success: false,
      message: "تعذر الإضافة للمفضلة",
    };
  }
}
