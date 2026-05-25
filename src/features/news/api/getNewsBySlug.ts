import { fetcher } from "@/src/lib/fetch";
import type {
  NewsArticle,
  NewsArticleDetail,
  NewsDetailsApiData,
} from "@/src/features/news/types";

import { getNewsList } from "./getNewsList";

export type NewsBySlugResult = {
  article: NewsArticle;
  detail: NewsArticleDetail;
};

export async function getNewsBySlug(
  slug: string,
): Promise<NewsBySlugResult | null> {
  const [detailResponse, listResult] = await Promise.all([
    fetcher<NewsDetailsApiData>(`/news/${slug}`),
    getNewsList(),
  ]);

  if (!detailResponse?.success) {
    return null;
  }

  const { new_details } = detailResponse.data;
  const listItem = listResult?.items.find((item) => item.slug === slug);

  const article: NewsArticle = listItem ?? {
    id: slug,
    slug,
    title: new_details.title,
    excerpt: "",
    date: "",
    imageSrc: new_details.new_images[0] ?? "",
  };

  const detail: NewsArticleDetail = {
    title: new_details.title,
    contentHtml: new_details.content,
    video: new_details.video,
    gallery: new_details.new_images ?? [],
  };

  return { article, detail };
}
