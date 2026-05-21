import NewsCard from "@/src/features/news/components/NewsCard";
import { ALL_NEWS } from "@/src/features/news/data/news";

export default function AllNewsSection() {
  return (
    <section className="py-8">
      <div className="container">
        <div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          dir="rtl"
        >
          {ALL_NEWS.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
