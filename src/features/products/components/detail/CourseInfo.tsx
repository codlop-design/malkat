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
        <span>{course.duration}</span>
        <span>|</span>
        <span>{course.sessions}</span>
        {meta?.hoursCount ? (
          <>
            <span>|</span>
            <span>{meta.hoursCount} ساعة</span>
          </>
        ) : null}
        {detail.averageRating > 0 ? (
          <>
            <span>|</span>
            <RatingBadge rating={detail.averageRating} />
          </>
        ) : null}
        {meta?.studentsRegistered ? (
          <>
            <span>|</span>
            <span>{meta.studentsRegistered} طالب مسجل</span>
          </>
        ) : null}
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
