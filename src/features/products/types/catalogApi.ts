export interface ProductContributor {
  name: string;
  image: string;
}

export interface CourseContributor extends ProductContributor {
  job_title?: string;
  overview?: string;
}

export interface ServiceContributor extends ProductContributor {
  id?: number;
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

export interface BookDetailsApi {
  id: number;
  slug: string;
  title: string;
  overview: string;
  image: string;
  age_group: string;
  difficulty: string;
  price: string;
  contributor: ProductContributor;
  page_count: number;
  language: string;
  file_type: string;
  description: string;
  goals: string;
  contents: unknown[];
}

export interface CourseDetailsApi {
  title: string;
  overview: string;
  image: string;
  session_type: string;
  price: string;
  period: string;
  lessons_count: number;
  hours_count: number;
  rating: number | null;
  students_registered: number | null;
  practice_projects: number;
  contributor: CourseContributor;
  what_learn: string;
  content: unknown[];
  features: unknown[];
}

export interface ServiceDetailsApi {
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
  rate_average: number;
}

export interface ActivityDetailsApi {
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
  rate_average: number;
  contributor: ServiceContributor;
}

export interface EvidenceDetailsApi {
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
  rate_average: number;
  contributor: ProductContributor;
}

export type ProductDetailsApiPayload =
  | { book_details: BookDetailsApi }
  | { course_details: CourseDetailsApi }
  | { service_details: ServiceDetailsApi }
  | { activity_details: ActivityDetailsApi }
  | { evidence_details: EvidenceDetailsApi };
