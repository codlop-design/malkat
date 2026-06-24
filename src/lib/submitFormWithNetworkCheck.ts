import {
  CONNECTION_ERROR_MESSAGE,
  OFFLINE_ERROR_MESSAGE,
  SERVER_ACTION_TIMEOUT_MS,
  isOffline,
} from "@/src/lib/networkErrors";

type FormActionResult = {
  success: boolean;
  message: string;
};

export async function submitFormWithNetworkCheck<TResult extends FormActionResult>(
  action: () => Promise<TResult>,
): Promise<TResult> {
  if (isOffline()) {
    return {
      success: false,
      message: OFFLINE_ERROR_MESSAGE,
    } as TResult;
  }

  try {
    return await Promise.race([
      action(),
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error("TIMEOUT")), SERVER_ACTION_TIMEOUT_MS);
      }),
    ]);
  } catch {
    return {
      success: false,
      message: isOffline() ? OFFLINE_ERROR_MESSAGE : CONNECTION_ERROR_MESSAGE,
    } as TResult;
  }
}
