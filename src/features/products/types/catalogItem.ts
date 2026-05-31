export type CatalogItemBase = {
  id: string;
  slug: string;
  isFavourite?: boolean;
  isRated?: boolean;
  rating?: number;
  ratingCount?: number;
};
