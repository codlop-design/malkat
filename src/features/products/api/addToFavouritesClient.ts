import { toOrderType } from "@/src/features/cart/lib/mapOrderType";
import { apiClient, ensureCsrfCookie } from "@/src/lib/apiClient";
import type { CatalogSectionKey } from "@/src/features/products/types";

export type FavouriteActionResult = {
  success: boolean;
  message: string;
};

export async function addToFavourites(
  category: CatalogSectionKey,
  slug: string,
): Promise<FavouriteActionResult> {
  const formData = new FormData();
  formData.append("type", toOrderType(category));
  formData.append("slug", slug);

  try {
    await ensureCsrfCookie();

    const { data, status } = await apiClient.post<{
      success?: boolean;
      message?: string;
    }>("/api/favourites/toggle", formData);

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
