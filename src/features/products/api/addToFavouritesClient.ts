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

type FavouriteApiBody = {
  success?: boolean;
  message?: string;
};

function isUnauthorizedStatus(status: number | undefined): boolean {
  return status === 401 || status === 419;
}

function parseFavouriteResponse(
  status: number,
  data: FavouriteApiBody | undefined,
  fallbackSuccessMessage: string,
  fallbackErrorMessage: string,
): FavouriteActionResult {
  if (isUnauthorizedStatus(status)) {
    return { success: false, message: LOGIN_REQUIRED_MESSAGE };
  }

  if (status >= 400) {
    return {
      success: false,
      message: data?.message ?? fallbackErrorMessage,
    };
  }

  if (data?.success === false) {
    return {
      success: false,
      message: data.message ?? fallbackErrorMessage,
    };
  }

  return {
    success: true,
    message: data?.message ?? fallbackSuccessMessage,
  };
}

function parseFavouriteError(
  error: unknown,
  fallback: string,
): FavouriteActionResult {
  if (axios.isAxiosError(error) && isUnauthorizedStatus(error.response?.status)) {
    return { success: false, message: LOGIN_REQUIRED_MESSAGE };
  }

  const apiMessage =
    axios.isAxiosError(error) &&
    typeof error.response?.data?.message === "string"
      ? error.response.data.message
      : undefined;

  return {
    success: false,
    message: apiMessage ?? fallback,
  };
}

async function postFavouriteToggle(
  category: CatalogSectionKey,
  slug: string,
  wasFavourite: boolean,
): Promise<FavouriteActionResult> {
  const formData = new FormData();
  formData.append("type", toOrderType(category));
  formData.append("slug", slug);

  try {
    await ensureCsrfCookie();

    const { data, status } = await apiClient.post<FavouriteApiBody>(
      "/favourites/toggle",
      formData,
      { validateStatus: () => true },
    );

    return parseFavouriteResponse(
      status,
      data,
      wasFavourite ? "تمت الإزالة من المفضلة" : "تمت الإضافة للمفضلة",
      wasFavourite
        ? "تعذر الإزالة من المفضلة، حاول مرة أخرى"
        : "تعذر الإضافة للمفضلة، حاول مرة أخرى",
    );
  } catch (error) {
    return parseFavouriteError(
      error,
      wasFavourite
        ? "تعذر الإزالة من المفضلة، حاول مرة أخرى"
        : "تعذر الإضافة للمفضلة، حاول مرة أخرى",
    );
  }
}

export async function toggleFavourite(
  category: CatalogSectionKey,
  slug: string,
  isFavourite = false,
): Promise<FavouriteActionResult> {
  return postFavouriteToggle(category, slug, isFavourite);
}

export const addToFavourites = (
  category: CatalogSectionKey,
  slug: string,
) => toggleFavourite(category, slug, false);

export const removeFromFavourites = (
  category: CatalogSectionKey,
  slug: string,
) => toggleFavourite(category, slug, true);
