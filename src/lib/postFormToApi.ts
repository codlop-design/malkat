import {
  CONNECTION_ERROR_MESSAGE,
  FETCH_TIMEOUT_MS,
  isNetworkError,
} from "@/src/lib/networkErrors";

type ApiJsonResponse = {
  success?: boolean;
  message?: string;
};

type PostFormToApiResult = {
  success: boolean;
  message: string;
};

export async function postFormToApi(
  url: string,
  init: RequestInit,
  {
    successMessage,
    fallbackErrorMessage,
  }: {
    successMessage: string;
    fallbackErrorMessage: string;
  },
): Promise<PostFormToApiResult> {
  try {
    const response = await fetch(url, {
      ...init,
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    const json = (await response.json()) as ApiJsonResponse;

    if (!response.ok || !json.success) {
      return {
        success: false,
        message: json.message ?? fallbackErrorMessage,
      };
    }

    return {
      success: true,
      message: json.message ?? successMessage,
    };
  } catch (error) {
    if (isNetworkError(error)) {
      return {
        success: false,
        message: CONNECTION_ERROR_MESSAGE,
      };
    }

    return {
      success: false,
      message: fallbackErrorMessage,
    };
  }
}
