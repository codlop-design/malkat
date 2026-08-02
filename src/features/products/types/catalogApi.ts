export interface ProductContributor {
  name: string | null;
  image: string | null;
  job_title?: string | null;
  overview?: string | null;
  type_label?: string | null;
}

export interface CourseContributor extends ProductContributor {
  job_title?: string;
  overview?: string;
}

export interface GuideContributor extends ProductContributor {
  id?: number;
  job_title?: string;
  overview?: string;
  type_label?: string;
}

export interface ServiceContributor extends ProductContributor {
  id?: number;
}

export interface CatalogRatingBreakdownItem {
  star: number;
  count: number;
}

export interface CatalogReviewApiItem {
  name: string;
  duration: string;
  comment: string;
  rating: number;
}

export interface CatalogRate {
  avg_rate: number;
  count: number;
  rating_breakdown?: CatalogRatingBreakdownItem[];
  reviews?: CatalogReviewApiItem[];
}

export interface CatalogSocialFields {
  is_favourite?: boolean;
  is_rated?: boolean;
  is_bought?: boolean;
  rate?: CatalogRate;
}

export interface BookApiItem extends CatalogSocialFields {
  id: number;
  slug: string;
  title: string;
  overview: string;
  image: string;
  age_group: string | null;
  difficulty: string | null;
  price: string;
  contributor: ProductContributor | null;
}

export interface CourseApiItem extends CatalogSocialFields {
  id: number;
  slug: string;
  title: string;
  overview: string;
  image: string;
  session_type: string | null;
  price: string;
  period: string;
  age_group?: string | null;
  domain?: string | null;
  stages_count?: number | string | null;
  lessons_count: number;
  contributor: ProductContributor | null;
}

export interface ServiceApiItem extends CatalogSocialFields {
  id: number;
  slug: string;
  image: string;
  title: string;
  overview: string;
  session_type: string;
  price: number;
  is_free: boolean;
  rate_average?: number;
}

export interface ActivityApiItem extends CatalogSocialFields {
  id: number;
  slug: string;
  image: string;
  title: string;
  overview: string;
  age_group: string;
  participant_type: string;
  contributor?: ProductContributor | null;
  rate_average?: number;
}

export interface EvidenceApiItem extends CatalogSocialFields {
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

export interface BookDetailsApi extends CatalogSocialFields {
  id: number;
  slug: string;
  title: string;
  overview: string;
  image: string;
  age_group: string;
  difficulty: string;
  price: string;
  contributor: ProductContributor | null;
  page_count: number;
  language: string;
  file_type: string;
  description: string;
  goals: string;
  contents: unknown[];
}

export interface CoursePurchaseFields {
  is_bought?: boolean;
}

export interface CourseDetailsApi extends CatalogSocialFields, CoursePurchaseFields {
  id?: number | null;
  slug?: string | null;
  title: string | null;
  overview: string | null;
  age_group?: string | null;
  stages_count?: number | string | null;
  domain?: string | null;
  image: string | null;
  session_type: string | null;
  price: string | null;
  period: string | null;
  lessons_count: number | null;
  hours_count: number | null;
  show_on_homepage?: boolean | null;
  rating?: number | null;
  students_registered: number | null;
  practice_projects: number | null;
  contributor: CourseContributor | null;
  what_learn: string | null;
  content?: unknown[] | null;
  features?: unknown[] | null;
  faqs?: Array<{
    title?: string;
    question?: string;
    content?: string;
    answer?: string;
  }> | null;
}

export interface ServiceDetailsApi extends CatalogSocialFields {
  id: number;
  slug: string;
  image: string;
  title: string;
  overview: string;
  age_group: string;
  difficulty: string;
  price: number;
  is_free: boolean;
  session_duration: string;
  session_type: string;
  target: string;
  description: string;
  contributor: ServiceContributor;
  rate_average?: number;
}

export interface ActivityDetailsApi extends CatalogSocialFields {
  id: number;
  slug: string;
  image: string;
  title: string;
  overview: string;
  age_group: string;
  participant_type: string;
  price: number;
  is_free: boolean;
  session_duration: string;
  session_type: string;
  target: string;
  description: string;
  rate_average?: number;
  contributor: ServiceContributor;
}

export interface EvidenceDetailsApi extends CatalogSocialFields {
  id: number;
  slug: string;
  title: string;
  overview: string;
  image: string;
  page_count: number;
  for_whom: string;
  target: string;
  price: number;
  price_label: string;
  is_free: boolean;
  description: string;
  rate_average?: number;
  contributor: GuideContributor;
}

export type ProductDetailsApiPayload =
  | { book_details: BookDetailsApi }
  | { course_details: CourseDetailsApi }
  | { service_details: ServiceDetailsApi }
  | { activity_details: ActivityDetailsApi }
  | { evidence_details: EvidenceDetailsApi };
