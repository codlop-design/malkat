import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { Skeleton } from "@/src/components/ui/skeleton";

type CartItemSkeletonVariant = {
  hasInstructor?: boolean;
  hasDuration?: boolean;
  tagCount?: number;
  hasFreeBadge?: boolean;
};

type CartSectionSkeletonConfig = {
  id: string;
  itemCount: number;
  itemVariant: CartItemSkeletonVariant;
};

/** Mirrors CART_ITEMS structure in SideCart.tsx */
const CART_SKELETON_SECTIONS: CartSectionSkeletonConfig[] = [
  {
    id: "books",
    itemCount: 2,
    itemVariant: {
      tagCount: 3,
      hasFreeBadge: true,
    },
  },
  {
    id: "courses",
    itemCount: 1,
    itemVariant: {
      hasInstructor: true,
      hasDuration: true,
      tagCount: 3,
    },
  },
  {
    id: "services",
    itemCount: 1,
    itemVariant: {
      tagCount: 1,
    },
  },
  {
    id: "activities",
    itemCount: 1,
    itemVariant: {
      tagCount: 1,
    },
  },
  {
    id: "guides",
    itemCount: 1,
    itemVariant: {
      tagCount: 1,
      hasFreeBadge: true,
    },
  },
];

function CartItemSkeleton({ variant }: { variant: CartItemSkeletonVariant }) {
  const { hasInstructor, hasDuration, tagCount = 0, hasFreeBadge } = variant;

  return (
    <div className="space-y-4 border-t border-[#E5E5E5] pt-4">
      <div className="flex items-center gap-2">
        <Skeleton className="size-[100px] shrink-0 rounded-lg aspect-square" />
        <div className="min-w-0 flex-1 space-y-2">
          <Skeleton className="h-5 w-4/5 max-w-[220px]" />
          {hasInstructor && (
            <div className="flex items-center gap-2">
              <Skeleton className="size-10 shrink-0 rounded-full" />
              <Skeleton className="h-4 w-28" />
            </div>
          )}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-10/12" />
        </div>
      </div>

      {hasDuration && (
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-24 rounded-md" />
          <Skeleton className="h-4 w-20 rounded-md" />
        </div>
      )}

      {tagCount > 0 && (
        <div className="flex w-full items-center gap-2">
          {Array.from({ length: tagCount }).map((_, i) => (
            <Skeleton
              key={i}
              className={`h-7 rounded-full ${i === 0 ? "w-16" : i === 1 ? "w-24" : "w-14"}`}
            />
          ))}
          {hasFreeBadge && (
            <Skeleton className="ms-auto h-7 w-14 rounded-full" />
          )}
        </div>
      )}

      <div className="flex w-full items-center justify-between">
        <Skeleton className="h-10 w-[132px] rounded-full" />
        <Skeleton className="size-9 shrink-0 rounded-md" />
      </div>
    </div>
  );
}

function CartAccordionSectionSkeleton({
  section,
  defaultOpen,
}: {
  section: CartSectionSkeletonConfig;
  defaultOpen?: boolean;
}) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={defaultOpen ? section.id : undefined}
    >
      <AccordionItem
        value={section.id}
        className="mb-4 rounded-xl border border-[#C7C7CC] p-3"
      >
        <AccordionTrigger className="items-center gap-2 p-0 no-underline!">
          <Skeleton className="size-[21px] shrink-0 rounded-sm" />
          <Skeleton className="h-5 w-16" />
        </AccordionTrigger>
        <AccordionContent className="space-y-2 pt-4 pb-0">
          {Array.from({ length: section.itemCount }).map((_, index) => (
            <CartItemSkeleton key={index} variant={section.itemVariant} />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default function SideCartSkeleton() {
  return (
    <div aria-busy="true" aria-label="جاري تحميل السلة">
      {CART_SKELETON_SECTIONS.map((section, index) => (
        <CartAccordionSectionSkeleton
          key={section.id}
          section={section}
          defaultOpen={index === 0}
        />
      ))}
    </div>
  );
}
