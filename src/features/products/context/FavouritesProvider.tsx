"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { useAuth } from "@/src/features/auth/context/AuthProvider";
import { getCatalogListClient } from "@/src/features/products/api/getCatalogListClient";
import { getProductSocialClient } from "@/src/features/products/api/getProductSocialClient";
import type { CatalogSectionKey } from "@/src/features/products/types";

function productKey(category: CatalogSectionKey, slug: string): string {
  return `${category}:${slug}`;
}

type FavouritesContextValue = {
  isReady: boolean;
  isFavourite: (category: CatalogSectionKey, slug: string) => boolean;
  hasFavourite: (category: CatalogSectionKey, slug: string) => boolean;
  setFavourite: (
    category: CatalogSectionKey,
    slug: string,
    value: boolean,
  ) => void;
  setProductBought: (
    category: CatalogSectionKey,
    slug: string,
    value: boolean,
  ) => void;
  isProductBought: (category: CatalogSectionKey, slug: string) => boolean;
  hasPurchase: (category: CatalogSectionKey, slug: string) => boolean;
  seedFavourites: (category: CatalogSectionKey, slugs: string[]) => void;
  syncCatalogList: (
    category: CatalogSectionKey,
    page: number,
    search?: string,
  ) => Promise<void>;
  syncProductFavourite: (
    category: CatalogSectionKey,
    slug: string,
  ) => Promise<void>;
};

const FavouritesContext = createContext<FavouritesContextValue | null>(null);

type FavouritesProviderProps = {
  children: ReactNode;
};

export function FavouritesProvider({ children }: FavouritesProviderProps) {
  const { isAuthenticated, isAuthReady } = useAuth();
  const [cache, setCache] = useState<Map<string, boolean>>(() => new Map());
  const [purchaseCache, setPurchaseCache] = useState<Map<string, boolean>>(
    () => new Map(),
  );
  const [isReady, setIsReady] = useState(true);
  const syncCountRef = useRef(0);
  const inflightRef = useRef(new Map<string, Promise<void>>());

  const beginSync = useCallback(() => {
    syncCountRef.current += 1;
    setIsReady(false);
  }, []);

  const endSync = useCallback(() => {
    syncCountRef.current = Math.max(0, syncCountRef.current - 1);
    if (syncCountRef.current === 0) {
      setIsReady(true);
    }
  }, []);

  const hasFavourite = useCallback(
    (category: CatalogSectionKey, slug: string) => {
      return cache.has(productKey(category, slug));
    },
    [cache],
  );

  const isFavourite = useCallback(
    (category: CatalogSectionKey, slug: string) => {
      return cache.get(productKey(category, slug)) ?? false;
    },
    [cache],
  );

  const setFavourite = useCallback(
    (category: CatalogSectionKey, slug: string, value: boolean) => {
      setCache((current) => {
        const next = new Map(current);
        next.set(productKey(category, slug), value);
        return next;
      });
    },
    [],
  );

  const setProductBought = useCallback(
    (category: CatalogSectionKey, slug: string, value: boolean) => {
      setPurchaseCache((current) => {
        const next = new Map(current);
        next.set(productKey(category, slug), value);
        return next;
      });
    },
    [],
  );

  const hasPurchase = useCallback(
    (category: CatalogSectionKey, slug: string) => {
      return purchaseCache.has(productKey(category, slug));
    },
    [purchaseCache],
  );

  const isProductBought = useCallback(
    (category: CatalogSectionKey, slug: string) => {
      return purchaseCache.get(productKey(category, slug)) ?? false;
    },
    [purchaseCache],
  );

  const seedFavourites = useCallback(
    (category: CatalogSectionKey, slugs: string[]) => {
      if (slugs.length === 0) return;

      setCache((current) => {
        const next = new Map(current);
        for (const slug of slugs) {
          next.set(productKey(category, slug), true);
        }
        return next;
      });
      setIsReady(true);
    },
    [],
  );

  const syncCatalogList = useCallback(
    async (category: CatalogSectionKey, page: number, search?: string) => {
      if (!isAuthenticated) {
        setCache(new Map());
        setPurchaseCache(new Map());
        setIsReady(true);
        return;
      }

      beginSync();

      try {
        const result = await getCatalogListClient(category, page, search);
        if (!result) return;

        setCache((current) => {
          const next = new Map(current);
          for (const item of result.items) {
            next.set(
              productKey(category, item.slug),
              item.isFavourite ?? false,
            );
          }
          return next;
        });
        setPurchaseCache((current) => {
          const next = new Map(current);
          for (const item of result.items) {
            next.set(
              productKey(category, item.slug),
              item.isBought === true,
            );
          }
          return next;
        });
      } finally {
        endSync();
      }
    },
    [beginSync, endSync, isAuthenticated],
  );

  const syncProductFavourite = useCallback(
    async (category: CatalogSectionKey, slug: string) => {
      if (!isAuthenticated) return;

      const key = productKey(category, slug);
      const existing = inflightRef.current.get(key);
      if (existing) {
        await existing;
        return;
      }

      const request = (async () => {
        beginSync();
        try {
          const social = await getProductSocialClient(category, slug);
          if (social === null) {
            setCache((current) => {
              const next = new Map(current);
              next.set(key, false);
              return next;
            });
            setPurchaseCache((current) => {
              const next = new Map(current);
              next.set(key, false);
              return next;
            });
            return;
          }

          setCache((current) => {
            const next = new Map(current);
            next.set(key, social.isFavourite);
            return next;
          });
          setPurchaseCache((current) => {
            const next = new Map(current);
            next.set(key, social.isBought);
            return next;
          });
        } finally {
          endSync();
        }
      })();

      inflightRef.current.set(key, request);
      try {
        await request;
      } finally {
        inflightRef.current.delete(key);
      }
    },
    [beginSync, endSync, isAuthenticated],
  );

  const value = useMemo(
    () => ({
      isReady: !isAuthReady || !isAuthenticated || isReady,
      isFavourite,
      hasFavourite,
      setFavourite,
      setProductBought,
      isProductBought,
      hasPurchase,
      seedFavourites,
      syncCatalogList,
      syncProductFavourite,
    }),
    [
      isAuthReady,
      isAuthenticated,
      isReady,
      isFavourite,
      hasFavourite,
      setFavourite,
      setProductBought,
      isProductBought,
      hasPurchase,
      seedFavourites,
      syncCatalogList,
      syncProductFavourite,
    ],
  );

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites(): FavouritesContextValue {
  const context = useContext(FavouritesContext);

  if (!context) {
    throw new Error("useFavourites must be used within FavouritesProvider");
  }

  return context;
}
