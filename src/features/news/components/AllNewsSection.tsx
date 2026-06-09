import Pagination from "@/src/components/Pagination";
import NewsCard from "@/src/features/news/components/NewsCard";
import type { NewsArticle, NewsPagination } from "@/src/features/news/types";

type AllNewsSectionProps = {
  articles: NewsArticle[];
  pagination: NewsPagination;
};

export default function AllNewsSection({
  articles,
  pagination,
}: AllNewsSectionProps) {
  return (
    <section className="py-8">
      <div className="container">
        {articles.length === 0 ? (
          <p className="py-10 text-center text-sm text-[#717171]">
            لا توجد أخبار حالياً.
          </p>
        ) : (
          <div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            dir="rtl"
          >
            {articles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        )}

        <div className="mt-10">
          <Pagination
            page={pagination.current_page}
            totalPages={pagination.last_page}
            basePath="/news/all"
          />
        </div>
      </div>
    </section>
  );
}
