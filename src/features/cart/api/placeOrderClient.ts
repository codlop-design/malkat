import {
  ensureCsrfCookie,
  sanctumFetch,
} from "@/src/features/auth/lib/sanctumClient";
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

  console.log("[cart/order] place", payload);

  try {
    await ensureCsrfCookie();

    const response = await sanctumFetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as OrderApiResponse;
    console.log("[cart/order] response", data);

    if (!response.ok || !data.success) {
      return {
        success: false,
        message: data.message ?? "تعذر تأكيد الطلب",
      };
    }

    return {
      success: true,
      message: data.message ?? "تم تأكيد الطلب بنجاح",
    };
  } catch (error) {
    console.error("[cart/order] error", error);
    return {
      success: false,
      message: "تعذر تأكيد الطلب، حاول مرة أخرى",
    };
  }
}
