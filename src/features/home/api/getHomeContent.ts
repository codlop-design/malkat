import { fetcher } from "@/src/lib/fetch";
import type { HomeContentApiData, HomeContentData } from "@/src/features/home/types";
import { mapProductBundleDetails } from "@/src/features/products/mapBundleProducts";
import type {
  ProductBundleDetailsApiItem,
  ProductBundleType,
} from "@/src/features/products/types/bundleProduct";

const PRODUCT_BUNDLE_TYPES: ProductBundleType[] = ["book", "evidence", "course"];

function isProductBundleDetailsApiItem(
  item: ProductBundleDetailsApiItem | null | undefined,
): item is ProductBundleDetailsApiItem {
  return Boolean(
    item &&
      item.id != null &&
      item.slug &&
      item.title &&
      item.image &&
      PRODUCT_BUNDLE_TYPES.includes(item.product_type) &&
      Array.isArray(item.products),
  );
}

function normalizeHomeContent(
  data: HomeContentApiData | null | undefined,
): HomeContentData | null {
  if (!data) {
    return null;
  }

  const {
    hero_setion,
    homepage_bundle_product,
    homepage_bundle_products,
    ...rest
  } = data;

  const homepageBundleProducts = [
    ...(Array.isArray(homepage_bundle_products) ? homepage_bundle_products : []),
    ...(Array.isArray(homepage_bundle_product)
      ? homepage_bundle_product
      : homepage_bundle_product
        ? [homepage_bundle_product]
        : []),
  ]
    .filter(isProductBundleDetailsApiItem)
    .map((bundle) => mapProductBundleDetails(bundle));

  return {
    hero_section: hero_setion,
    homepage_bundle_products: homepageBundleProducts,
    ...rest,
  };
}

export async function getHomeContent(): Promise<HomeContentData | null> {
  const response = await fetcher<HomeContentApiData>("/home");

  if (!response?.success) {
    return null;
  }

  return normalizeHomeContent(response.data);
}
