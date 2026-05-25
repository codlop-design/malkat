export { default as DiscoverSection } from "./components/DiscoverSection";
export { getCatalogList } from "./api/getCatalogList";
export { getProductDetails } from "./api/getProductDetails";
export { getSimilarProducts } from "./api/getSimilarProducts";
export {
  categoryFilterHref,
  parseProductCategory,
  type ProductCategoryId,
  type CatalogSectionKey,
} from "./types";
export type { CatalogListResult } from "./api/getCatalogList";
