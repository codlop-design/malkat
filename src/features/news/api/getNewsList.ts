import type {
  NewsApiItem,
  NewsArticle,
  NewsListResult,
  NewsPagination,
} from "@/src/features/news/types";
import { mapNewsItemToArticle } from "@/src/features/news/mapNewsItem";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type NewsListApiResponse = {
  success: boolean;
  message: string;
  data: NewsApiItem[];
  pagination: NewsPagination;
  timestamp: string;
};

export async function getNewsList(page = 1): Promise<NewsListResult | null> {
  try {
    const response = await fetch(`${API_URL}/news?page=${page}`, {
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error(`Fetch error: ${response.status} ${response.statusText}`);
      return null;
    }

    const json = (await response.json()) as NewsListApiResponse;

    if (!json.success) {
      return null;
    }

    const items: NewsArticle[] = (json.data ?? []).map(mapNewsItemToArticle);

    return { items, pagination: json.pagination };
  } catch (error) {
    console.error("Fetch exception:", error);
    return null;
  }
}

export async function getAllNewsSlugs(): Promise<string[]> {
  const slugs: string[] = [];
  let page = 1;
  let lastPage = 1;

  do {
    const result = await getNewsList(page);
    if (!result) break;

    slugs.push(...result.items.map((item) => item.slug));
    lastPage = result.pagination.last_page;
    page += 1;
  } while (page <= lastPage);

  return slugs;
}
