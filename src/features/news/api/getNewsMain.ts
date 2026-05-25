import { fetcher } from "@/src/lib/fetch";
import { mapNewsItemToArticle } from "@/src/features/news/mapNewsItem";
import type { NewsApiItem, NewsArticle, NewsMainApiData } from "@/src/features/news/types";

export type NewsMainContent = {
  featured: NewsArticle | null;
  latest: NewsArticle[];
};

export async function getNewsMain(): Promise<NewsMainContent | null> {
  const response = await fetcher<NewsMainApiData>("/news/main");

  if (!response?.success) {
    return null;
  }

  const { main_new, latest_news } = response.data;

  return {
    featured: main_new ? mapNewsItemToArticle(main_new) : null,
    latest: (latest_news ?? []).map((item: NewsApiItem) =>
      mapNewsItemToArticle(item),
    ),
  };
}
