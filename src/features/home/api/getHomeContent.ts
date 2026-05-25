import { fetcher } from "@/src/lib/fetch";
import type { HomeContentApiData, HomeContentData } from "@/src/features/home/types";

function normalizeHomeContent(data: HomeContentApiData): HomeContentData {
  const { hero_setion, ...rest } = data;
  return { hero_section: hero_setion, ...rest };
}

export async function getHomeContent(): Promise<HomeContentData | null> {
  const response = await fetcher<HomeContentApiData>("/home");

  if (!response?.success) {
    return null;
  }

  return normalizeHomeContent(response.data);
}
