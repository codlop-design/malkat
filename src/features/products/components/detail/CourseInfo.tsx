import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import type { CourseCardProps } from "@/src/features/products/components/cards/CourseCard";
import { RatingBadge } from "@/src/features/products/components/CardMedia";
import type { CatalogProduct } from "@/src/features/products/data/catalogAccess";
import type { ProductDetailMeta } from "@/src/features/products/data/productDetail";

type CourseInfoProps = {
  data: CatalogProduct["data"];
  detail: ProductDetailMeta;
};

export default function CourseInfo({ data, detail }: CourseInfoProps) {
  if (!("instructorName" in data)) return null;

  const course = data as CourseCardProps;
  const meta = detail.courseMeta;
  const metaItems = [
    course.duration,
    course.sessions,
    meta?.hoursCount ? `${meta.hoursCount} ساعة` : null,
    meta?.practiceProjects ? `${meta.practiceProjects} مشروع تطبيقي` : null,
    detail.averageRating > 0 ? (
      <RatingBadge key="rating" rating={detail.averageRating} />
    ) : null,
    meta?.studentsRegistered ? `${meta.studentsRegistered} طالب مسجل` : null,
  ].filter(Boolean);

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
        ) : (
          <span className="rounded-full bg-[#F5EDE4] px-3 py-1 text-xs text-[#454545]">
            أوفلاين
          </span>
        )}
      </div>
      <div className="mt-5 flex flex-wrap gap-4 border-y border-[#E8E8E8] py-4 text-xs text-[#454545] md:text-sm">
        {metaItems.map((item, index) => (
          <span key={typeof item === "string" ? item : "rating"}>
            {index > 0 ? <span className="me-4">|</span> : null}
            {item}
          </span>
        ))}
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
            {meta?.jobTitle ? (
              <p className="mt-1 text-sm text-[#717171]">{meta.jobTitle}</p>
            ) : null}
            {meta?.instructorBio ? (
              <p className="mt-2 text-sm leading-relaxed text-[#454545]">
                {meta.instructorBio}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
