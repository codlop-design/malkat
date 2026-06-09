import PageHeader from "@/src/components/PageHeader";
import { getNewsList } from "@/src/features/news/api/getNewsList";
import AllNewsSection from "@/src/features/news/components/AllNewsSection";

type PageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function AllNewsPage({ searchParams }: PageProps) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const newsList = await getNewsList(page);

  const articles = newsList?.items ?? [];
  const pagination = newsList?.pagination ?? {
    current_page: page,
    last_page: 1,
    per_page: articles.length,
    total: articles.length,
    from: articles.length > 0 ? 1 : 0,
    to: articles.length,
  };

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
      <AllNewsSection articles={articles} pagination={pagination} />
    </>
  );
}
