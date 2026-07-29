import "server-only";

import {
  mapProductBundle,
  mapProductBundleDetails,
} from "@/src/features/products/mapBundleProducts";
import type {
  ProductBundleApiItem,
  ProductBundleDetails,
  ProductBundleDetailsApiItem,
  ProductBundleListResult,
} from "@/src/features/products/types/bundleProduct";
import type { CatalogPagination } from "@/src/features/products/types/catalogApi";
import { apiServer } from "@/src/lib/apiServer";

type BundleProductsApiResponse = {
  success?: boolean;
  message?: string;
  data?: ProductBundleApiItem[];
  pagination?: CatalogPagination;
};

type BundleProductDetailsApiResponse = {
  success?: boolean;
  message?: string;
  data?: ProductBundleDetailsApiItem;
};

function fallbackPagination(
  page: number,
  itemsCount: number,
): CatalogPagination {
  return {
    current_page: page,
    last_page: 1,
    per_page: itemsCount,
    total: itemsCount,
    from: itemsCount > 0 ? 1 : 0,
    to: itemsCount,
  };
}

export async function getBundleProductDetails(
  slug: string,
): Promise<ProductBundleDetails | null> {
  try {
    const { data, status } =
      await apiServer.get<BundleProductDetailsApiResponse>(
        `/bundle-products/${slug}/details`,
        { validateStatus: () => true },
      );

    if (status >= 400 || !data?.success || !data.data) {
      return null;
    }

    return mapProductBundleDetails(data.data);
  } catch (error) {
    console.error("Fetch bundle product details exception:", error);
    return null;
  }
}

export async function getBundleProducts(
  page = 1,
): Promise<ProductBundleListResult | null> {
  try {
    const { data, status } = await apiServer.get<BundleProductsApiResponse>(
      "/bundle-products",
      {
        params: { page, per_page: 8 },
        validateStatus: () => true,
      },
    );

    if (status >= 400 || !data?.success || !Array.isArray(data.data)) {
      return null;
    }

    const details = await Promise.all(
      data.data.map(async (item) => {
        const detail = await getBundleProductDetails(item.slug);

        return (
          detail ?? {
            ...mapProductBundle(item),
            products: [],
          }
        );
      }),
    );

    return {
      items: details,
      pagination: data.pagination ?? fallbackPagination(page, details.length),
    };
  } catch (error) {
    console.error("Fetch bundle products exception:", error);
    return null;
  }
}
