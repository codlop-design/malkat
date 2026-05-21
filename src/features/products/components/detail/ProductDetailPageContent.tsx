"use client";

import Image from "next/image";
import {
  BookOpen,
  Clock,
  FileText,
  Globe,
  Languages,
  Users,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { Button } from "@/src/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import type { ActivityCardProps } from "@/src/features/products/components/cards/ActivityCard";
import type { BookCardProps } from "@/src/features/products/components/cards/BookCard";
import type { CourseCardProps } from "@/src/features/products/components/cards/CourseCard";
import type { GuideCardProps } from "@/src/features/products/components/cards/GuideCard";
import type { ServiceCardProps } from "@/src/features/products/components/cards/ServiceCard";
import type { CatalogProduct } from "@/src/features/products/data/catalogAccess";
import { getRelatedProducts } from "@/src/features/products/data/catalogAccess";
import { getProductDetail } from "@/src/features/products/data/productDetail";
import ProductDetailMedia from "@/src/features/products/components/detail/ProductDetailMedia";
import ProductReviewsSection from "@/src/features/products/components/detail/ProductReviewsSection";
import RelatedProductsSection from "@/src/features/products/components/detail/RelatedProductsSection";
import { RatingBadge } from "@/src/features/products/components/CardMedia";
import type { CatalogSectionKey } from "@/src/features/products/types";
import type { LucideIcon } from "lucide-react";
import type { ProductDetailMeta } from "@/src/features/products/data/productDetail";

const AVATAR =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80";

const REVIEWS_TITLE: Record<CatalogSectionKey, string> = {
  books: "آراء القراء",
  activities: "تقييم النشاط",
  courses: "تقييمات المستخدمين",
  services: "تقييم الخدمة",
  guides: "تقييم الدليل",
};

const CART_LABEL: Record<CatalogSectionKey, string> = {
  books: "إضافة للسلة",
  activities: "حجز النشاط",
  courses: "إضافة للسلة",
  services: "طلب الخدمة",
  guides: "تحميل الدليل",
};

type ProductDetailPageContentProps = {
  product: CatalogProduct;
};

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm text-[#454545]">
      <svg
        className="size-4 fill-[#F5B800] text-[#F5B800]"
        viewBox="0 0 20 20"
        aria-hidden
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <span className="font-medium text-black">{rating}</span>
      <span>({count})</span>
    </span>
  );
}

export default function ProductDetailPageContent({
  product,
}: ProductDetailPageContentProps) {
  const { category, data } = product;
  const detail = getProductDetail(category, data.description);
  const related = getRelatedProducts(category, data.slug, 5);
  const imageFirst = category === "books" || category === "guides";

  const rating = "rating" in data ? (data.rating ?? 4.8) : 4.8;
  const reviewCount = detail.reviewCount;

  return (
    <div className="bg-[#FAFAFA] pb-16 pt-8 md:pt-10">
      <div className="container" dir="rtl">
        <div className="rounded-2xl border border-[#E8E8E8] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.05)] md:p-8">
          <div
            className={`flex flex-col gap-8 lg:gap-10 ${
              imageFirst ? "lg:flex-row" : "lg:flex-row"
            }`}
          >
            {imageFirst ? (
              <div className="lg:w-[42%]">
                <ProductDetailMedia
                  imageSrc={data.imageSrc}
                  cartLabel={CART_LABEL[category]}
                />
              </div>
            ) : null}

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-4">
                <StarRating rating={rating} count={reviewCount} />
              </div>

              <h1 className="mt-4 text-2xl font-bold leading-snug text-black md:text-3xl">
                {data.title}
              </h1>

              <p className="mt-4 text-sm leading-[1.9] text-[#454545] md:text-base">
                {detail.longDescription}
              </p>

              {category === "books" && "author" in data ? (
                <BookInfo data={data} />
              ) : null}
              {category === "courses" && "instructorName" in data ? (
                <CourseInfo data={data} detail={detail} />
              ) : null}
              {category === "activities" ? <ActivityInfo data={data} /> : null}
              {category === "services" ? <ServiceInfo data={data} /> : null}
              {category === "guides" ? <GuideInfo data={data} /> : null}

              {category !== "courses" ? (
                <Button className="mt-6 hidden h-12 w-full gap-2 bg-primary text-base text-white hover:bg-primary/90 lg:inline-flex">
                  <Image src="/basket-add.svg" alt="" width={20} height={20} />
                  {CART_LABEL[category]}
                </Button>
              ) : null}

              <div className="mt-6">
                <Accordion
                  type="multiple"
                  defaultValue={detail.accordions.map((_, i) => `item-${i}`)}
                  className="w-full"
                >
                  {detail.accordions.map((item, index) => (
                    <AccordionItem key={item.title} value={`item-${index}`}>
                      <AccordionTrigger className="text-base font-medium text-black hover:no-underline">
                        {item.title}
                      </AccordionTrigger>
                      <AccordionContent className="text-[#454545]">
                        {item.content}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            {!imageFirst ? (
              <div className="lg:w-[38%]">
                <ProductDetailMedia
                  imageSrc={data.imageSrc}
                  cartLabel={CART_LABEL[category]}
                />
                {category === "courses" && detail.courseFeatures ? (
                  <ul className="mt-6 flex flex-col gap-3">
                    {detail.courseFeatures.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-[#454545]"
                      >
                        <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {category === "courses" ? (
                  <Button className="mt-6 hidden h-12 w-full gap-2 bg-primary text-base text-white hover:bg-primary/90 lg:inline-flex">
                    <Image src="/basket-add.svg" alt="" width={20} height={20} />
                    {CART_LABEL[category]}
                  </Button>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        {detail.chapters ? (
          <section className="mt-10">
            <h2 className="mb-5 text-xl font-bold text-black">محتويات الكتاب</h2>
            <ul className="flex flex-col gap-3">
              {detail.chapters.map((chapter) => (
                <li
                  key={chapter.number}
                  className="flex items-center gap-4 rounded-xl border border-[#E8E8E8] bg-white px-4 py-3"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {chapter.number}
                  </span>
                  <span className="text-sm font-medium text-black">
                    {chapter.title}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {detail.curriculum ? (
          <section className="mt-10">
            <h2 className="mb-5 text-xl font-bold text-black">محتويات الدورة</h2>
            <Accordion type="multiple" className="flex flex-col gap-3">
              {detail.curriculum.map((section) => (
                <AccordionItem
                  key={section.number}
                  value={`section-${section.number}`}
                  className="overflow-hidden rounded-xl border border-[#E8E8E8] bg-white px-4"
                >
                  <AccordionTrigger className="py-4 hover:no-underline">
                    <div className="flex flex-1 items-center gap-4 text-right">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                        {section.number}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-black">
                          {section.title}
                        </p>
                        {section.meta ? (
                          <p className="text-xs text-[#717171]">{section.meta}</p>
                        ) : null}
                      </div>
                    </div>
                  </AccordionTrigger>
                  {section.lessons ? (
                    <AccordionContent>
                      <ul className="flex flex-col gap-2 pb-2 pe-4">
                        {section.lessons.map((lesson) => (
                          <li
                            key={lesson}
                            className="text-sm text-[#454545] before:me-2 before:text-primary before:content-['•']"
                          >
                            {lesson}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  ) : null}
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        ) : null}

        {detail.learningPoints ? (
          <section className="mt-10 rounded-2xl border border-[#E8E8E8] bg-white p-6 md:p-8">
            <h2 className="mb-4 text-xl font-bold text-black">ما ستتعلمه</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {detail.learningPoints.map((point) => (
                <li
                  key={point}
                  className="text-sm leading-relaxed text-[#454545]"
                >
                  {point}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <ProductReviewsSection
          detail={detail}
          title={REVIEWS_TITLE[category]}
        />
        <RelatedProductsSection products={related} />
      </div>
    </div>
  );
}

function BookInfo({ data }: { data: CatalogProduct["data"] }) {
  if (!("author" in data)) return null;
  const book = data as BookCardProps;
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
            {book.ageRange} {book.level ?? ""}
          </span>
        ) : null}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MetaItem icon={FileText} label="عدد الصفحات" value="145" />
        <MetaItem icon={BookOpen} label="نوع الملف" value="pdf" />
        <MetaItem icon={Languages} label="اللغة" value="العربية" />
        <MetaItem icon={Globe} label="التحميلات" value={book.views ?? "18.3 k"} />
      </div>
      <div className="mt-5 flex items-center gap-3">
        <Avatar className="size-10">
          <AvatarImage src={AVATAR} alt="" />
          <AvatarFallback>م</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium text-black">{book.author}</span>
      </div>
    </>
  );
}

function CourseInfo({
  data,
  detail,
}: {
  data: CatalogProduct["data"];
  detail: ProductDetailMeta;
}) {
  if (!("instructorName" in data)) return null;
  const course = data as CourseCardProps;
  return (
    <>
      <div className="mt-4 flex flex-wrap gap-2">
        {course.free ? (
          <span className="rounded-full bg-[#E0F5F3] px-3 py-1 text-xs font-medium text-primary">
            مجانية
          </span>
        ) : null}
        {course.online ? (
          <span className="rounded-full bg-[#F5EDE4] px-3 py-1 text-xs text-[#454545]">
            أونلاين
          </span>
        ) : null}
      </div>
      <div className="mt-5 flex flex-wrap gap-4 border-y border-[#E8E8E8] py-4 text-xs text-[#454545] md:text-sm">
        <span>{course.duration}</span>
        <span>|</span>
        <span>{course.sessions}</span>
        <span>|</span>
        <RatingBadge rating={course.rating ?? 4.8} />
        <span>|</span>
        <span>96% معدل الرضا</span>
        <span>|</span>
        <span>186 طالب مسجل</span>
      </div>
      <div className="mt-6">
        <h3 className="text-base font-bold text-black">المدرب</h3>
        <div className="mt-3 flex items-start gap-3">
          <Avatar className="size-12">
            <AvatarImage src={course.instructorAvatar} alt="" />
            <AvatarFallback>م</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-black">{course.instructorName}</p>
            <p className="mt-2 text-sm leading-relaxed text-[#454545]">
              {detail.longDescription.slice(0, 120)}...
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function ActivityInfo({ data }: { data: CatalogProduct["data"] }) {
  if (!("ageRange" in data) || !("activityType" in data)) return null;
  const activity = data as ActivityCardProps;
  return (
    <>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-[#E0F5F3] px-3 py-1 text-xs font-medium text-primary">
          مجاني
        </span>
        <span className="rounded-full bg-[#F5EDE4] px-3 py-1 text-xs text-[#454545]">
          {activity.ageRange}
        </span>
        <span className="rounded-full bg-[#F5EDE4] px-3 py-1 text-xs text-[#454545]">
          {activity.activityType}
        </span>
      </div>
      <SessionMeta />
      <InstructorRow name="د. محمد الشهري" />
    </>
  );
}

function ServiceInfo({ data }: { data: CatalogProduct["data"] }) {
  if (!("tags" in data)) return null;
  const service = data as ServiceCardProps;
  return (
    <>
      <div className="mt-4 flex flex-wrap gap-2">
        {service.tags?.map((tag) => (
          <span
            key={tag}
            className={`rounded-full px-3 py-1 text-xs ${
              tag.includes("مجان")
                ? "bg-[#E0F5F3] font-medium text-primary"
                : "bg-[#F5EDE4] text-[#454545]"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
      <SessionMeta />
      <InstructorRow name="د. محمد الشمري" />
    </>
  );
}

function GuideInfo({ data }: { data: CatalogProduct["data"] }) {
  if (!("pages" in data)) return null;
  const guide = data as GuideCardProps;
  return (
    <>
      <div className="mt-4 flex flex-wrap gap-2">
        {guide.tags?.map((tag) => (
          <span
            key={tag}
            className={`rounded-full px-3 py-1 text-xs ${
              tag === "مجاني"
                ? "bg-[#E0F5F3] font-medium text-primary"
                : "bg-[#F5EDE4] text-[#454545]"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="mt-4 text-sm text-[#454545]">
        المستهدف: الآباء والمعلمين · {guide.pages}
      </p>
    </>
  );
}

function SessionMeta() {
  return (
    <ul className="mt-5 flex flex-col gap-2 text-sm text-[#454545]">
      <li className="flex items-center gap-2">
        <Clock className="size-4 text-primary" strokeWidth={1.5} />
        مدة الجلسة: 45–60 دقيقة
      </li>
      <li className="flex items-center gap-2">
        <Globe className="size-4 text-primary" strokeWidth={1.5} />
        نوع الجلسة: أونلاين
      </li>
      <li className="flex items-center gap-2">
        <Users className="size-4 text-primary" strokeWidth={1.5} />
        المستهدف: الأطفال + أولياء الأمور
      </li>
    </ul>
  );
}

function InstructorRow({ name }: { name: string }) {
  return (
    <div className="mt-5 flex items-center gap-3">
      <Avatar className="size-10">
        <AvatarImage src={AVATAR} alt="" />
        <AvatarFallback>م</AvatarFallback>
      </Avatar>
      <span className="text-sm font-medium text-black">{name}</span>
    </div>
  );
}

function MetaItem({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1 rounded-xl bg-[#FAFAFA] px-3 py-2.5">
      <Icon className="size-4 text-primary" strokeWidth={1.5} />
      <span className="text-xs text-[#717171]">{label}</span>
      <span className="text-sm font-medium text-black">{value}</span>
    </div>
  );
}
