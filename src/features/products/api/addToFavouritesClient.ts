import {
  ensureCsrfCookie,
  sanctumFetch,
} from "@/src/features/auth/lib/sanctumClient";
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

    const response = await sanctumFetch(`/api/${type}/${slug}/favourites`, {
      method: "POST",
    });

    const json = (await response.json()) as {
      success?: boolean;
      message?: string;
    };

    if (response.status === 401 || response.status === 403) {
      return {
        success: false,
        message: "يرجى تسجيل الدخول أولاً",
      };
    }

    if (!response.ok || !json.success) {
      return {
        success: false,
        message: json.message ?? "تعذر الإضافة للمفضلة",
      };
    }

    return {
      success: true,
      message: json.message ?? "تمت الإضافة للمفضلة",
    };
  } catch {
    return {
      success: false,
      message: "تعذر الإضافة للمفضلة",
    };
  }
}
