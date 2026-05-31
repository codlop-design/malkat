/** List / featured item from `/news` and `/news/main`. */
export interface NewsApiItem {
  id: number;
  slug: string;
  image: string;
  date: string;
  time: string;
  title: string;
  content?: string | null;
}

export interface NewsMainApiData {
  main_new?: NewsApiItem | null;
  latest_news?: NewsApiItem[] | null;
}

export interface NewsDetailsApiData {
  new_details: {
    title: string;
    content: string;
    video: string | null;
    new_images: string[];
  };
}

export interface NewsPagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

export interface NewsListResult {
  items: NewsArticle[];
  pagination: NewsPagination;
}

/** Normalized card / list item for UI. */
export type NewsArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  imageSrc: string;
};

export type NewsArticleDetail = {
  title: string;
  contentHtml: string;
  video: string | null;
  gallery: string[];
};
