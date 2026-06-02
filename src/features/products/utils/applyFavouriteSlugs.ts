import type { CatalogListItem } from "@/src/features/products/data/catalogRegistry";

export function applyFavouriteSlugs(
  items: CatalogListItem[],
  favouriteSlugs: ReadonlySet<string>,
): CatalogListItem[] {
  return items.map((item) => ({
    ...item,
    isFavourite: favouriteSlugs.has(item.slug) || item.isFavourite === true,
  }));
}
