import { fetcher } from "@/src/lib/fetch";
import type { HomeContentApiData, HomeContentData } from "@/src/features/home/types";
import { mapProductBundleDetails } from "@/src/features/products/mapBundleProducts";
import type { ProductBundleDetailsApiItem } from "@/src/features/products/types/bundleProduct";

function normalizeHomeContent(data: HomeContentApiData): HomeContentData {
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
  ].map((bundle: ProductBundleDetailsApiItem) =>
    mapProductBundleDetails(bundle),
  );

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
