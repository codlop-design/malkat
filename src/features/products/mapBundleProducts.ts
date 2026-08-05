import type {
  ProductBundle,
  ProductBundleApiItem,
  ProductBundleApiProduct,
  ProductBundleDetails,
  ProductBundleDetailsApiItem,
  ProductBundleProduct,
  ProductBundleType,
} from "@/src/features/products/types/bundleProduct";

const DEFAULT_CONTRIBUTOR_NAME = "ملكات";
const DEFAULT_CONTRIBUTOR_IMAGE =
  "https://malkat-dashboard.codlop.sa/storage/settings/8pJDlGu6KNfSEHHVEvd0IDD5dSkvt5OODAJG3qeD.png";

function cleanOptionalText(value: string | null | undefined): string | undefined {
  const text = value?.trim();
  if (!text || text.toLowerCase() === "null") return undefined;
  return text;
}

function cleanText(value: string | null | undefined, fallback = ""): string {
  return cleanOptionalText(value) ?? fallback;
}

function isFreePrice(price: string | number | null | undefined): boolean {
  const text = String(price ?? "").trim().toLowerCase();
  return text === "free" || text === "مجاني" || text.includes("مجاني");
}

function resolveIsFree(
  isFree: boolean | null | undefined,
  price: string | number | null | undefined,
): boolean {
  if (isFree != null) return isFree === true;
  return isFreePrice(price);
}

function formatLessonsCount(count: number | null | undefined): string | undefined {
  if (!count || count <= 0) return undefined;
  return `${count} درس`;
}

function ratingFields(item: ProductBundleApiProduct) {
  const rating = Number(item.rate?.avg_rate ?? 0);
  const ratingCount = Number(item.rate?.count ?? 0);

  return {
    isFavourite: Boolean(item.is_favourite),
    isRated: Boolean(item.is_rated),
    isBought: Boolean(item.is_bought),
    rating: rating > 0 ? rating : undefined,
    ratingCount: ratingCount > 0 ? ratingCount : undefined,
  };
}

function getContributorName(item: ProductBundleApiProduct): string {
  return cleanText(item.contributor?.name, DEFAULT_CONTRIBUTOR_NAME);
}

function getContributorImage(item: ProductBundleApiProduct): string {
  return cleanText(item.contributor?.image, DEFAULT_CONTRIBUTOR_IMAGE);
}

export function mapProductBundle(item: ProductBundleApiItem): ProductBundle {
  return {
    id: String(item.id),
    slug: item.slug,
    title: item.title,
    subtitle: item.subtitle ?? "",
    ageGroup: cleanOptionalText(item.age_group),
    imageSrc: item.image,
    productType: item.product_type,
  };
}

export function mapProductBundleDetails(
  item: ProductBundleDetailsApiItem,
): ProductBundleDetails {
  const bundle = mapProductBundle(item);
  const products = item.products.map((product) =>
    mapProductBundleProduct(product, bundle.productType),
  );

  return {
    ...bundle,
    products,
    productsCount: products.length,
  };
}

export function mapProductBundleProduct(
  item: ProductBundleApiProduct,
  bundleType: ProductBundleType,
): ProductBundleProduct {
  const description = cleanText(item.overview, "-");
  const priceIsFree = resolveIsFree(item.is_free, item.price);

  if (bundleType === "book") {
    return {
      id: String(item.id),
      slug: item.slug,
      category: "books",
      title: item.title,
      description,
      author: getContributorName(item),
      authorAvatar: getContributorImage(item),
      imageSrc: item.image,
      free: priceIsFree,
      ageRange: cleanOptionalText(item.age_group),
      level: cleanOptionalText(item.difficulty),
      ...ratingFields(item),
    };
  }

  if (bundleType === "evidence") {
    return {
      id: String(item.id),
      slug: item.slug,
      category: "guides",
      title: item.title,
      description,
      imageSrc: item.image,
      tags: [priceIsFree ? "مجاني" : cleanText(String(item.price ?? ""))].filter(
        Boolean,
      ),
      pages: item.page_count ? `${item.page_count} صفحة` : undefined,
      contributorName: getContributorName(item),
      contributorAvatar: getContributorImage(item),
      ...ratingFields(item),
    };
  }

  return {
    id: String(item.id),
    slug: item.slug,
    category: "courses",
    title: item.title,
    description,
    imageSrc: item.image,
    instructorName: getContributorName(item),
    instructorAvatar: getContributorImage(item),
    duration: cleanText(item.period, "غير محدد"),
    sessions: cleanOptionalText(item.stages_count) ?? formatLessonsCount(item.lessons_count),
    free: priceIsFree,
    online:
      cleanText(item.session_type)
        .toLowerCase()
        .includes("online") ||
      cleanText(item.session_type).includes("أونلاين") ||
      cleanText(item.session_type).includes("عن بُعد"),
    ...ratingFields(item),
  };
}
