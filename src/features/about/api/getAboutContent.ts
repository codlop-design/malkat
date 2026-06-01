import { fetcher } from "@/src/lib/fetch";
import type { AboutPageData } from "@/src/features/about/types";

export async function getAboutContent(): Promise<AboutPageData | null> {
  const response = await fetcher<AboutPageData>("/about-us");

  if (!response?.success) {
    return null;
  }

  return response.data;
}
