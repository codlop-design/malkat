import { fetcher } from "@/src/lib/fetch";
import type { SiteSettings } from "@/src/features/settings/types";

export async function getSettings(): Promise<SiteSettings | null> {
  const response = await fetcher<SiteSettings>("/settings");

  if (!response?.success) {
    return null;
  }

  return response.data;
}
