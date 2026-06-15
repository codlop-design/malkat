import axios from "axios";

import { toOrderType } from "@/src/features/cart/lib/mapOrderType";
import { apiClient, ensureCsrfCookie } from "@/src/lib/apiClient";
import type { CatalogSectionKey } from "@/src/features/products/types";

export type SubmitProductRatePayload = {
  category: CatalogSectionKey;
  slug: string;
  rate: number;
  comment?: string;
};

export type SubmitProductRateResult = {
  success: boolean;
  message: string;
};

function getRateErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;
    if (typeof message === "string" && message.trim()) {
      return message;
    }
  }

  return fallback;
}

export async function submitProductRate(
  payload: SubmitProductRatePayload,
): Promise<SubmitProductRateResult> {
  try {
    await ensureCsrfCookie();

    const { data, status } = await apiClient.post<{
      success?: boolean;
      message?: string;
    }>("/rate", {
      type: toOrderType(payload.category),
      slug: payload.slug,
      rate: payload.rate,
      comment: payload.comment?.trim() || undefined,
    });

    if (status >= 400 || !data?.success) {
      return {
        success: false,
        message: data?.message ?? "تعذر إرسال التقييم",
      };
    }

    return {
      success: true,
      message: data.message ?? "تم إرسال التقييم بنجاح",
    };
  } catch (error) {
    return {
      success: false,
      message: getRateErrorMessage(error, "تعذر إرسال التقييم، حاول مرة أخرى"),
    };
  }
}
