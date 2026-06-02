import PageHeader from "@/src/components/PageHeader";
import { getNewsMain } from "@/src/features/news/api/getNewsMain";
import FeaturedNews from "@/src/features/news/components/FeaturedNews";
import LatestNewsSection from "@/src/features/news/components/LatestNewsSection";

export default async function NewsPage() {
  const newsMain = await getNewsMain();
  const featured = newsMain?.featured ?? null;
  const latest = newsMain?.latest ?? [];
  const hasNews = featured != null || latest.length > 0;
  console.log(featured);
  console.log(hasNews);
  return (
    <>
      <PageHeader
        title="الأخبار"
        breadcrumbs={[{ label: "الرئيسية", href: "/" }, { label: "الأخبار" }]}
      />
      {hasNews ? (
        <>
          <FeaturedNews article={featured} />
          <LatestNewsSection articles={latest} />
        </>
      ) : (
        <section className="bg-white py-10 md:py-14">
          <div className="container">
            <p className="py-10 text-center text-sm text-[#717171]">
              لا توجد أخبار حالياً.
            </p>
          </div>
        </section>
      )}
    </>
  );
}
