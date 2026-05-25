import PageHeader from "@/src/components/PageHeader";
import { getNewsList } from "@/src/features/news/api/getNewsList";
import AllNewsSection from "@/src/features/news/components/AllNewsSection";

export default async function AllNewsPage() {
  const newsList = await getNewsList();

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
      <AllNewsSection articles={newsList?.items ?? []} />
    </>
  );
}
