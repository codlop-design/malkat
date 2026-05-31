"use client";

import CartSections, {
  PlaceOrderButton,
} from "@/src/features/cart/components/CartSections";

const CartPageContent = () => {
  return (
    <section className="py-10">
      <div className="container">
        <div className="flex flex-col gap-6">
          <CartSections />
          <PlaceOrderButton className="mx-auto mt-2 h-14 w-[98%] gap-2 rounded-2xl bg-primary py-3 text-white hover:bg-primary/90" />
        </div>
      </div>
    </section>
  );
};

export default CartPageContent;
