import NewsCard from "@/src/features/news/components/NewsCard";
import type { NewsArticle } from "@/src/features/news/types";

type AllNewsSectionProps = {
  articles: NewsArticle[];
};

export default function AllNewsSection({ articles }: AllNewsSectionProps) {
  if (!articles.length) {
    return null;
  }

  return (
    <section className="py-8">
      <div className="container">
        <div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          dir="rtl"
        >
          {articles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
