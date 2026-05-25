import PageHeader from "@/src/components/PageHeader";
import { getNewsMain } from "@/src/features/news/api/getNewsMain";
import FeaturedNews from "@/src/features/news/components/FeaturedNews";
import LatestNewsSection from "@/src/features/news/components/LatestNewsSection";

export default async function NewsPage() {
  const newsMain = await getNewsMain();

  return (
    <>
      <PageHeader
        title="الأخبار"
        breadcrumbs={[{ label: "الرئيسية", href: "/" }, { label: "الأخبار" }]}
      />
      <FeaturedNews article={newsMain?.featured ?? null} />
      <LatestNewsSection articles={newsMain?.latest ?? []} />
    </>
  );
}
