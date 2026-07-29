import { mapProductBundleDetails } from "@/src/features/products/mapBundleProducts";
import type {
  ProductBundleDetails,
  ProductBundleDetailsApiItem,
} from "@/src/features/products/types/bundleProduct";
import { apiClient } from "@/src/lib/apiClient";

type BundleProductDetailsApiResponse = {
  success?: boolean;
  message?: string;
  data?: ProductBundleDetailsApiItem;
};

export async function getBundleProductDetailsClient(
  slug: string,
): Promise<ProductBundleDetails | null> {
  const { data, status } =
    await apiClient.get<BundleProductDetailsApiResponse>(
      `/bundle-products/${slug}/details`,
      { validateStatus: () => true },
    );

  if (status >= 400 || !data?.success || !data.data) {
    return null;
  }

  return mapProductBundleDetails(data.data);
}
