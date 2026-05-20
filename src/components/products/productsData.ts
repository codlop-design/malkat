import type { ProductCardProps } from "@/src/components/products/ProductCard";
import type { CourseCardProps } from "@/src/components/products/CourseCard";

const BOOK_IMG =
  "https://images.unsplash.com/photo-1544947950-fa07aabed860?auto=format&fit=crop&w=600&q=80";
const COURSE_IMG =
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80";
const ACTIVITY_IMG =
  "https://images.unsplash.com/photo-1588075592446-265fd1e6e097?auto=format&fit=crop&w=600&q=80";
const SERVICE_IMG =
  "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80";

function makeBooks(count: number, prefix: string): ProductCardProps[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${prefix}-${i}`,
    title: "قصص الأنبياء للأطفال",
    author: "د. محمد الشهري",
    description:
      "مجموعة قصصية تعليمية ممتعة تُعرّف الأطفال على قصص الأنبياء بطريقة مبسّطة وجذابة تناسب أعمارهم.",
    imageSrc: BOOK_IMG,
    href: `/products/${prefix}-${i + 1}`,
    free: true,
    ageRange: "6-9 سنوات",
    level: "متوسط",
    rating: 4.8,
    views: "18.3 k",
  }));
}

function makeCourses(count: number): CourseCardProps[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `course-${i}`,
    title: "دورة القراءة والكتابة",
    description:
      "برنامج تفاعلي لتعليم مهارات القراءة والكتابة للأطفال بأسلوب ممتع ومنظم على مراحل.",
    imageSrc: COURSE_IMG,
    href: `/products/course-${i + 1}`,
    instructorName: "أ. سارة العتيبي",
    instructorAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
    duration: "5 أسابيع",
    sessions: "12 جلسة",
    free: true,
    online: true,
    rating: 4.8,
  }));
}

export const BOOKS_ITEMS = makeBooks(8, "book");
export const ACTIVITIES_ITEMS = makeBooks(6, "activity").map((item) => ({
  ...item,
  title: "نشاط تعليمي تفاعلي",
  imageSrc: ACTIVITY_IMG,
}));
export const SERVICES_ITEMS = makeBooks(6, "service").map((item) => ({
  ...item,
  title: "باقة الخدمات التعليمية",
  imageSrc: SERVICE_IMG,
  free: false,
}));
export const COURSES_ITEMS = makeCourses(8);
export const GUIDES_ITEMS = makeBooks(5, "guide").map((item) => ({
  ...item,
  title: "دليل إجرائي للمعلمين",
  level: "متقدم",
}));
