"use server";

import { cookies } from "next/headers";

import { CATALOG_API_ENDPOINTS } from "./catalogEndpoints";
import type { CatalogSectionKey } from "@/src/features/products/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type FavouriteActionResult = {
  success: boolean;
  message: string;
};

export async function addToFavouritesAction(
  category: CatalogSectionKey,
  slug: string,
): Promise<FavouriteActionResult> {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return {
      success: false,
      message: "يرجى تسجيل الدخول أولاً",
    };
  }

  const type = CATALOG_API_ENDPOINTS[category].replace(/^\//, "");

  try {
    const response = await fetch(`${API_URL}/${type}/${slug}/favourites`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const json = (await response.json()) as {
      success?: boolean;
      message?: string;
    };

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
