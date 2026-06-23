import { BookOpen, FileText, Languages } from "lucide-react";

import type { BookCardProps } from "@/src/features/products/components/cards/BookCard";
import type { CatalogProduct } from "@/src/features/products/data/catalogAccess";
import type { ProductDetailMeta } from "@/src/features/products/data/productDetail";
import InstructorRow from "@/src/features/products/components/detail/InstructorRow";
import MetaItem from "@/src/features/products/components/detail/MetaItem";

type BookInfoProps = {
  data: CatalogProduct["data"];
  detail: ProductDetailMeta;
};

export default function BookInfo({ data, detail }: BookInfoProps) {
  if (!("author" in data)) return null;

  const book = data as BookCardProps;
  const meta = detail.bookMeta;

  return (
    <>
      <div className="mt-4 flex flex-wrap gap-2">
        {book.free ? (
          <span className="rounded-full bg-[#E0F5F3] px-3 py-1 text-xs font-medium text-primary">
            مجاني
          </span>
        ) : null}
        {book.ageRange ? (
          <span className="rounded-full bg-[#F5EDE4] px-3 py-1 text-xs text-[#454545]">
            {book.ageRange}
          </span>
        ) : null}
        {book.level ? (
          <span className="rounded-full bg-[#F5EDE4] px-3 py-1 text-xs text-[#454545]">
            {book.level}
          </span>
        ) : null}
      </div>
      {meta ? (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <MetaItem
            icon={FileText}
            label="عدد الصفحات"
            value={String(meta.pageCount)}
          />
          <MetaItem icon={BookOpen} label="نوع الملف" value={meta.fileType} />
          <MetaItem icon={Languages} label="اللغة" value={meta.language} />
        </div>
      ) : null}
      <InstructorRow
        contributor={detail.contributor}
        fallbackName={book.author}
      />
    </>
  );
}
