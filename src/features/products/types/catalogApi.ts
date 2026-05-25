export interface ProductContributor {
  name: string;
  image: string;
}

export interface BookApiItem {
  id: number;
  slug: string;
  title: string;
  overview: string;
  image: string;
  age_group: string;
  difficulty: string;
  price: string;
  contributor: ProductContributor;
}

export interface CourseApiItem {
  id: number;
  slug: string;
  title: string;
  overview: string;
  image: string;
  session_type: string;
  price: string;
  period: string;
  lessons_count: number;
  contributor: ProductContributor;
}

export interface ServiceApiItem {
  id: number;
  slug: string;
  image: string;
  title: string;
  overview: string;
  session_type: string;
  price: number;
  is_free: boolean;
  rate_average: number;
}

export interface ActivityApiItem {
  id: number;
  slug: string;
  image: string;
  title: string;
  overview: string;
  age_group: string;
  participant_type: string;
  rate_average: number;
}

export interface EvidenceApiItem {
  id: number;
  slug: string;
  title: string;
  overview: string;
  image: string;
  price: string;
  page_count: number;
  contributor: ProductContributor;
}

export interface CatalogPagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

export type CatalogApiItem =
  | BookApiItem
  | CourseApiItem
  | ServiceApiItem
  | ActivityApiItem
  | EvidenceApiItem;
