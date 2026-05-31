import type { AddToCartPayload } from "@/src/features/cart/types/cart-types";
import type { CatalogProduct } from "@/src/features/products/data/catalogAccess";
import type { CatalogSectionKey } from "@/src/features/products/types";

export function buildCartPayload(
  category: CatalogSectionKey,
  fields: Omit<AddToCartPayload, "category">,
): AddToCartPayload {
  return { category, ...fields };
}

export function buildCartPayloadFromProduct(
  product: CatalogProduct,
): AddToCartPayload {
  const { category, data } = product;

  const base = {
    slug: data.slug,
    title: data.title,
    description: data.description,
    image: data.imageSrc,
  };

  switch (category) {
    case "books":
      return buildCartPayload(category, {
        ...base,
        isFree: data.free,
        level: data.level,
        ageRange: data.ageRange,
      });
    case "courses":
      return buildCartPayload(category, {
        ...base,
        isFree: data.free,
        isOnline: data.online,
        duration: data.duration,
        sessions: data.sessions,
        instructorName: data.instructorName,
        instructorAvatar: data.instructorAvatar,
      });
    case "services":
      return buildCartPayload(category, {
        ...base,
        isFree: data.tags?.includes("مجانية"),
        isOnline: data.tags?.includes("أونلاين"),
      });
    case "activities":
      return buildCartPayload(category, {
        ...base,
        ageRange: data.ageRange,
      });
    case "guides":
      return buildCartPayload(category, {
        ...base,
        isFree: data.tags?.includes("مجاني"),
      });
  }
}
