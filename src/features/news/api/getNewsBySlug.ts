import { fetcher } from "@/src/lib/fetch";
import {
  normalizeNewsGallery,
  normalizeNewsImageUrl,
} from "@/src/features/news/lib/normalizeNewsImages";
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

  if (!new_details) {
    return null;
  }

  const listItem = listResult?.items.find((item) => item.slug === slug);
  const gallery = normalizeNewsGallery(new_details.new_images);
  const imageSrc =
    normalizeNewsImageUrl(new_details.image) ??
    normalizeNewsImageUrl(listItem?.imageSrc) ??
    "";

  const article: NewsArticle = listItem
    ? { ...listItem, imageSrc }
    : {
        id: slug,
        slug,
        title: new_details.title,
        excerpt: "",
        date: "",
        imageSrc,
      };

  const detail: NewsArticleDetail = {
    title: new_details.title,
    contentHtml: new_details.content ?? "",
    video: new_details.video?.url ?? null,
    gallery,
  };

  return { article, detail };
}
