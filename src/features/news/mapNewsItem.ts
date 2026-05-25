import type { NewsApiItem, NewsArticle } from "@/src/features/news/types";

function toExcerpt(content: string, maxLength = 180): string {
  const plain = content
    .replace(/<[^>]+>/g, "")
    .replace(/\r\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (plain.length <= maxLength) {
    return plain;
  }

  return `${plain.slice(0, maxLength).trim()}...`;
}

export function formatNewsDate(date: string, time: string): string {
  return [date, time].filter(Boolean).join(" · ");
}

export function mapNewsItemToArticle(item: NewsApiItem): NewsArticle {
  return {
    id: String(item.id),
    slug: item.slug,
    title: item.title,
    excerpt: toExcerpt(item.content),
    date: formatNewsDate(item.date, item.time),
    imageSrc: item.image,
  };
}
