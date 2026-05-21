import PageHeader from "@/src/components/PageHeader";
import AllNewsSection from "@/src/features/news/components/AllNewsSection";

export default function page() {
  return (
    <>
      <PageHeader
        title="الأخبار"
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "الأخبار", href: "/news" },
          { label: "الكل" },
        ]}
      />
      <AllNewsSection />
    </>
  );
}
