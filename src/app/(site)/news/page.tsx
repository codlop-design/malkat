import PageHeader from "@/src/components/PageHeader";
import FeaturedNews from "@/src/features/news/components/FeaturedNews";
import LatestNewsSection from "@/src/features/news/components/LatestNewsSection";

export default function NewsPage() {
  return (
    <>
      <PageHeader
        title="الأخبار"
        breadcrumbs={[{ label: "الرئيسية", href: "/" }, { label: "الأخبار" }]}
      />
      <FeaturedNews />
      <LatestNewsSection />
    </>
  );
}
