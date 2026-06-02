import { apiClient, ensureCsrfCookie } from "@/src/lib/apiClient";
import { toOrderType } from "@/src/features/cart/lib/mapOrderType";
import type {
  PlaceOrderResult,
  StoredCartItem,
} from "@/src/features/cart/types/cart-types";

type OrderApiResponse = {
  success: boolean;
  message: string;
};

export async function placeOrder(
  items: StoredCartItem[],
): Promise<PlaceOrderResult> {
  if (items.length === 0) {
    return {
      success: false,
      message: "السلة فارغة",
    };
  }

  const payload = {
    items: items.map((item) => {
      const line: { type: string; slug: string; quantity?: number } = {
        type: toOrderType(item.category),
        slug: item.slug,
      };

      if (item.quantity > 1) {
        line.quantity = item.quantity;
      }

      return line;
    }),
  };

  try {
    await ensureCsrfCookie();

    const { data, status } = await apiClient.post<OrderApiResponse>(
      "/orders",
      payload,
    );

    if (status >= 400 || !data.success) {
      return {
        success: false,
        message: data.message ?? "تعذر تأكيد الطلب",
      };
    }

    return {
      success: true,
      message: data.message ?? "تم تأكيد الطلب بنجاح",
    };
  } catch {
    return {
      success: false,
      message: "تعذر تأكيد الطلب، حاول مرة أخرى",
    };
  }
}
