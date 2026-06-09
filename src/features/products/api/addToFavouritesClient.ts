import axios from "axios";

import { toOrderType } from "@/src/features/cart/lib/mapOrderType";
import { apiClient, ensureCsrfCookie } from "@/src/lib/apiClient";
import type { CatalogSectionKey } from "@/src/features/products/types";

export type FavouriteActionResult = {
  success: boolean;
  message: string;
};

const LOGIN_REQUIRED_MESSAGE =
  "يجب تسجيل الدخول أولًا لإضافة المنتجات إلى المفضلة";

function isUnauthorizedStatus(status: number | undefined): boolean {
  return status === 401 || status === 403 || status === 419;
}

export async function toggleFavourite(
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
    }>("/favourites/toggle", formData, {
      validateStatus: () => true,
    });

    if (isUnauthorizedStatus(status)) {
      return {
        success: false,
        message: LOGIN_REQUIRED_MESSAGE,
      };
    }

    if (status >= 400 || !data.success) {
      return {
        success: false,
        message: data.message ?? "تعذر الإضافة للمفضلة، حاول مرة أخرى",
      };
    }

    return {
      success: true,
      message: data.message ?? "تمت الإضافة للمفضلة",
    };
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      isUnauthorizedStatus(error.response?.status)
    ) {
      return {
        success: false,
        message: LOGIN_REQUIRED_MESSAGE,
      };
    }

    const apiMessage =
      axios.isAxiosError(error) &&
      typeof error.response?.data?.message === "string"
        ? error.response.data.message
        : undefined;

    return {
      success: false,
      message: apiMessage ?? "تعذر تحديث المفضلة، حاول مرة أخرى",
    };
  }
}

export const addToFavourites = toggleFavourite;
