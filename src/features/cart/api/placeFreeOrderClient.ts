import axios from "axios";

import { apiClient, ensureCsrfCookie } from "@/src/lib/apiClient";
import { toOrderType } from "@/src/features/cart/lib/mapOrderType";
import type {
  AddToCartPayload,
  PlaceOrderResult,
} from "@/src/features/cart/types/cart-types";

type FreeOrderApiResponse = {
  success: boolean;
  message: string;
};

function getOrderErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;
    if (typeof message === "string" && message.trim()) {
      return message;
    }
  }

  return fallback;
}

export async function placeFreeOrder(
  item: AddToCartPayload,
): Promise<PlaceOrderResult> {
  const payload = {
    items: [
      {
        type: toOrderType(item.category),
        slug: item.slug,
      },
    ],
  };

  try {
    await ensureCsrfCookie();

    const { data, status } = await apiClient.post<FreeOrderApiResponse>(
      "/orders/free",
      payload,
    );

    if (status >= 400 || !data.success) {
      return {
        success: false,
        message: data.message ?? "تعذر الاشتراك في المنتج المجاني",
      };
    }

    return {
      success: true,
      message: data.message ?? "تم الاشتراك بنجاح",
    };
  } catch (error) {
    return {
      success: false,
      message: getOrderErrorMessage(
        error,
        "تعذر الاشتراك في المنتج المجاني، حاول مرة أخرى",
      ),
    };
  }
}
