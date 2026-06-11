type NewsImageInput =
  | string
  | {
      image?: string | null;
      url?: string | null;
    }
  | null
  | undefined;

export function normalizeNewsImageUrl(value: NewsImageInput): string | null {
  if (!value) return null;

  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed || null;
  }

  if (typeof value === "object") {
    const url = value.image ?? value.url;
    if (typeof url === "string") {
      const trimmed = url.trim();
      return trimmed || null;
    }
  }

  return null;
}

export function normalizeNewsGallery(
  images: NewsImageInput[] | undefined,
): string[] {
  const urls = (images ?? [])
    .map(normalizeNewsImageUrl)
    .filter((url): url is string => Boolean(url));

  return [...new Set(urls)];
}

export function buildSwiperImages(
  imageSrc: string,
  images: NewsImageInput[] | undefined,
): string[] {
  const cover = normalizeNewsImageUrl(imageSrc);
  const gallery = normalizeNewsGallery(images);

  if (!cover) return gallery;
  return [cover, ...gallery.filter((image) => image !== cover)];
}
