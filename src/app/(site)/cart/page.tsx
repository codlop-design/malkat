import PageHeader from "@/src/components/PageHeader";
import CartPageContent from "@/src/features/cart/components/CartPageContent";

const CartPage = () => {
  return (
    <>
      <PageHeader
        title="سلة الطلبات الخاصة بك"
        breadcrumbs={[{ label: "الرئيسية", href: "/" }, { label: "السلة" }]}
      />
      <CartPageContent />
    </>
  );
};

export default CartPage;
