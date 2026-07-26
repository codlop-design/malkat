import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import AddToCartButton from "@/src/features/cart/components/AddToCartButton";
import type { AddToCartPayload } from "@/src/features/cart/types/cart-types";
import ProductCategoryInfo from "@/src/features/products/components/detail/ProductCategoryInfo";
import ProductInterestButton from "@/src/features/products/components/detail/ProductInterestButton";
import ProductDetailMedia from "@/src/features/products/components/detail/ProductDetailMedia";
import StarRating from "@/src/features/products/components/detail/StarRating";
import { CART_LABEL } from "@/src/features/products/data/productDetailLabels";
import type { CatalogProduct } from "@/src/features/products/data/catalogAccess";
import type { ProductDetailMeta } from "@/src/features/products/data/productDetail";
type ProductDetailMainCardProps = {
  product: CatalogProduct;
  detail: ProductDetailMeta;
  cartPayload: AddToCartPayload;
  showAddToCart: boolean;
  rating: number;
  reviewCount: number;
};

export default function ProductDetailMainCard({
  product,
  detail,
  cartPayload,
  showAddToCart,
  rating,
  reviewCount,
}: ProductDetailMainCardProps) {
  const { category, data } = product;
  const imageFirst = category === "books" || category === "guides";

  return (
    <div className="rounded-2xl border border-[#E8E8E8] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.05)] md:p-8">
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
        {imageFirst ? (
          <div className="lg:w-[42%]">
            <ProductDetailMedia
              imageSrc={data.imageSrc}
              title={data.title}
              cartLabel={CART_LABEL[category]}
              category={category}
              slug={data.slug}
              cartPayload={cartPayload}
              showAddToCart={showAddToCart}
            />
          </div>
        ) : null}

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <StarRating rating={rating} count={reviewCount} />
          </div>

          <h1 className="mt-4 text-2xl font-bold leading-snug text-black md:text-3xl">
            {data.title}
          </h1>

          <p
            className="mt-4 text-sm leading-[1.9] text-[#454545] md:text-base"
            dangerouslySetInnerHTML={{ __html: detail.longDescription }}
          />

          <ProductCategoryInfo
            category={category}
            data={data}
            detail={detail}
          />

          {category !== "courses" ? (
            <div
              className={`mt-6 hidden gap-3 lg:grid ${
                showAddToCart ? "grid-cols-2" : "grid-cols-1"
              }`}
            >
              <ProductInterestButton className="h-12 rounded-xl" />
              {showAddToCart ? (
                <AddToCartButton
                  payload={cartPayload}
                  label={CART_LABEL[category]}
                  variant="button"
                  className="h-12 rounded-xl"
                />
              ) : null}
            </div>
          ) : null}

          <ProductDetailAccordions accordions={detail.accordions} />
        </div>

        {!imageFirst ? (
          <div className="lg:w-[38%]">
            <ProductDetailMedia
              imageSrc={data.imageSrc}
              title={data.title}
              cartLabel={CART_LABEL[category]}
              category={category}
              slug={data.slug}
              cartPayload={cartPayload}
              showAddToCart={showAddToCart}
            />
            {category === "courses" && detail.courseFeatures ? (
              <ul className="mt-6 flex flex-col gap-3">
                {detail.courseFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-[#454545]"
                  >
                    <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            ) : null}
            {category === "courses" ? (
              <div
                className={`mt-6 hidden gap-3 lg:grid ${
                  showAddToCart ? "grid-cols-2" : "grid-cols-1"
                }`}
              >
                <ProductInterestButton className="h-12 rounded-xl" />
                {showAddToCart ? (
                  <AddToCartButton
                    payload={cartPayload}
                    label={CART_LABEL[category]}
                    variant="button"
                    className="h-12 rounded-xl"
                  />
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ProductDetailAccordions({
  accordions,
}: {
  accordions: ProductDetailMeta["accordions"];
}) {
  return (
    <div className="mt-6">
      <Accordion
        type="multiple"
        defaultValue={accordions.map((_, index) => `item-${index}`)}
        className="w-full"
      >
        {accordions.map((item, index) => (
          <AccordionItem key={item.title} value={`item-${index}`}>
            <AccordionTrigger className="text-base font-medium text-black hover:no-underline">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="text-[#454545]">
              <p dangerouslySetInnerHTML={{ __html: item.content }} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
