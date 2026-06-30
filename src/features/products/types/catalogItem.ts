export type CatalogItemBase = {
  id: string;
  slug: string;
  isFavourite?: boolean;
  onFavouriteChange?: (isFavourite: boolean) => void;
  isRated?: boolean;
  isBought?: boolean;
  rating?: number;
  ratingCount?: number;
};
