import type { ApiResponse } from "@/src/types/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetcher<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<ApiResponse<T> | null> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      console.error(`Fetch error: ${response.status} ${response.statusText}`);
      return null;
    }

    const json: ApiResponse<T> = await response.json();
    return json;
  } catch (error) {
    console.error("Fetch exception:", error);
    return null;
  }
}
