import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import type { ReactNode } from "react";
import type { CourseCardProps } from "@/src/features/products/components/cards/CourseCard";
import { RatingBadge } from "@/src/features/products/components/CardMedia";
import type { CatalogProduct } from "@/src/features/products/data/catalogAccess";
import type { ProductDetailMeta } from "@/src/features/products/data/productDetail";

type CourseInfoProps = {
  data: CatalogProduct["data"];
  detail: ProductDetailMeta;
};

type CourseDetailItem = {
  label: string;
  value: ReactNode;
};

function hasDisplayValue(value: ReactNode): boolean {
  return value !== null && value !== undefined && value !== "";
}

export default function CourseInfo({ data, detail }: CourseInfoProps) {
  if (!("instructorName" in data)) return null;

  const course = data as CourseCardProps;
  const meta = detail.courseMeta;
  const hasInstructor = Boolean(course.instructorName?.trim());
  const sessionType = meta?.sessionType ?? course.sessionType;
  const price = meta?.price ?? (course.free ? "مجانية" : null);
  const detailItems: CourseDetailItem[] = [
    { label: "الفئة العمرية", value: meta?.ageGroup ?? course.ageRange },
    { label: "المجال", value: meta?.domain ?? course.domain },
    { label: "نوع الجلسة", value: sessionType },
    { label: "السعر", value: price },
    { label: "المدة", value: meta?.period ?? course.duration },
    {
      label: "عدد المراحل",
      value:
        meta?.stagesCount !== null && meta?.stagesCount !== undefined
          ? `${meta.stagesCount} مرحلة`
          : null,
    },
    {
      label: "عدد الدروس",
      value:
        meta?.lessonsCount !== null && meta?.lessonsCount !== undefined
          ? `${meta.lessonsCount} درس`
          : course.sessions,
    },
    {
      label: "عدد الساعات",
      value:
        meta?.hoursCount !== null && meta?.hoursCount !== undefined
          ? `${meta.hoursCount} ساعة`
          : null,
    },
    {
      label: "المشاريع التطبيقية",
      value:
        meta?.practiceProjects !== null && meta?.practiceProjects !== undefined
          ? `${meta.practiceProjects} مشروع تطبيقي`
          : null,
    },
    {
      label: "المسجلون",
      value:
        meta?.studentsRegistered !== null &&
        meta?.studentsRegistered !== undefined
          ? `${meta.studentsRegistered} طالب مسجل`
          : null,
    },
    {
      label: "التقييم",
      value: detail.averageRating > 0 ? (
      <RatingBadge key="rating" rating={detail.averageRating} />
      ) : null,
    },
  ].filter((item) => hasDisplayValue(item.value));

  return (
    <>
      <div className="mt-4 flex flex-wrap gap-2">
        {course.free ? (
          <span className="rounded-full bg-[#E0F5F3] px-3 py-1 text-xs font-medium text-primary">
            مجانية
          </span>
        ) : null}
        {sessionType ? (
          <span className="rounded-full bg-[#F5EDE4] px-3 py-1 text-xs text-[#454545]">
            {sessionType}
          </span>
        ) : null}
      </div>
      <div className="mt-5 grid gap-3 border-y border-[#E8E8E8] py-4 sm:grid-cols-2 lg:grid-cols-3">
        {detailItems.map((item) => (
          <div
            key={item.label}
            className="rounded-xl bg-[#FAFAFA] px-4 py-3 text-sm"
          >
            <p className="text-xs text-[#717171]">{item.label}</p>
            <div className="mt-1 font-medium text-[#454545]">{item.value}</div>
          </div>
        ))}
      </div>
      {hasInstructor ? (
        <div className="mt-6">
          <h3 className="text-base font-bold text-black">المدرب</h3>
          <div className="mt-3 flex items-start gap-3">
            <Avatar className="size-12">
              {course.instructorAvatar ? (
                <AvatarImage src={course.instructorAvatar} alt="" />
              ) : null}
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
      ) : null}
    </>
  );
}
