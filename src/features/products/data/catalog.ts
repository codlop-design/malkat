import type { ActivityCardProps } from "@/src/features/products/components/cards/ActivityCard";
import type { BookCardProps } from "@/src/features/products/components/cards/BookCard";
import type { CourseCardProps } from "@/src/features/products/components/cards/CourseCard";
import type { GuideCardProps } from "@/src/features/products/components/cards/GuideCard";
import type { ServiceCardProps } from "@/src/features/products/components/cards/ServiceCard";
const IMG = {
  book: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
  book2: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80",
  course: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
  course2: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
  activity: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
  activity2: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
  service: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80",
  guide: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
};

const AVATAR =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80";

export const BOOKS_ITEMS: BookCardProps[] = [
  {
    id: "book-1",
    slug: "prophets-stories-for-children",
    title: "قصص الأنبياء للأطفال",
    author: "د. محمد الشهري",
    description:
      "سلسلة قصص تربوية رائعة تحكي قصص الأنبياء الكرام بأسلوب مناسب للأطفال مع رسوم جميلة.",
    imageSrc: IMG.book,
    free: true,
    ageRange: "6-9 سنوات",
    level: "متوسط",
    rating: 4.8,
    views: "18.3 k",
  },
  {
    id: "book-2",
    slug: "animal-world-adventures",
    title: "مغامرات في عالم الحيوان",
    author: "أ. نورة القحطاني",
    description:
      "كتاب تفاعلي يعرّف الطفل على عالم الحيوانات والبيئة بطريقة قصصية مشوقة.",
    imageSrc: IMG.book2,
    ageRange: "4-7 سنوات",
    level: "مبتدئ",
    rating: 4.6,
    views: "12.1 k",
  },
  {
    id: "book-3",
    slug: "learning-to-read",
    title: "أنا أتعلم القراءة",
    author: "مكتبة منارة",
    description:
      "برنامج تدريجي لبناء مهارات القراءة العربية للأطفال في مرحلة ما قبل المدرسة.",
    imageSrc: IMG.book,
    free: false,
    ageRange: "5-8 سنوات",
    level: "مبتدئ",
    rating: 4.9,
    views: "9.4 k",
  },
  {
    id: "book-4",
    slug: "fun-mathematics",
    title: "رياضيات ممتعة",
    author: "د. خالد العمري",
    description:
      "تمارين وألغاز رياضية مبسّطة تُنمّي التفكير المنطقي والحساب الذهني.",
    imageSrc: IMG.book2,
    ageRange: "7-10 سنوات",
    level: "متوسط",
    rating: 4.7,
    views: "7.8 k",
  },
  {
    id: "book-5",
    slug: "space-world",
    title: "عالم الفضاء",
    author: "فريق العلوم",
    description:
      "رحلة بصرية مذهلة لاستكشاف الكواكب والنجوم بصور ورسوم توضيحية جذابة.",
    imageSrc: IMG.book,
    free: true,
    ageRange: "8-12 سنة",
    level: "متقدم",
    rating: 4.5,
    views: "15.2 k",
  },
  {
    id: "book-6",
    slug: "bedtime-stories",
    title: "حكايات قبل النوم",
    author: "أ. سارة العتيبي",
    description: "قصص قصيرة مهدئة تساعد الطفل على الاسترخاء قبل النوم.",
    imageSrc: IMG.book2,
    free: true,
    ageRange: "3-6 سنوات",
    level: "مبتدئ",
    rating: 4.8,
    views: "11.4 k",
  },
  {
    id: "book-7",
    slug: "animal-encyclopedia",
    title: "موسوعة الحيوانات",
    author: "فريق العلوم",
    description: "معلومات مصورة عن الحيوانات البرية والبحرية بلغة مبسطة.",
    imageSrc: IMG.book,
    ageRange: "6-9 سنوات",
    level: "متوسط",
    rating: 4.7,
    views: "10.2 k",
  },
  {
    id: "book-8",
    slug: "history-heroes",
    title: "أبطال التاريخ",
    author: "د. محمد الشهري",
    description: "سلسلة قصصية تعرّف الأطفال بشخصيات تاريخية ملهمة.",
    imageSrc: IMG.book2,
    free: true,
    ageRange: "8-12 سنة",
    level: "متقدم",
    rating: 4.6,
    views: "8.9 k",
  },
  {
    id: "book-9",
    slug: "beautiful-language",
    title: "لغتي الجميلة",
    author: "مكتبة منارة",
    description: "تمارين لغوية ممتعة لتقوية المفردات والتعبير الكتابي.",
    imageSrc: IMG.book,
    ageRange: "7-10 سنوات",
    level: "متوسط",
    rating: 4.9,
    views: "14.1 k",
  },
  {
    id: "book-10",
    slug: "little-adventures",
    title: "مغامرات الصغار",
    author: "أ. نورة القحطاني",
    description: "قصص مشوقة عن الصداقة والتعاون في المدرسة والحي.",
    imageSrc: IMG.book2,
    free: true,
    ageRange: "5-8 سنوات",
    level: "مبتدئ",
    rating: 4.8,
    views: "16.0 k",
  },
];

export const ACTIVITIES_ITEMS: ActivityCardProps[] = [
  {
    id: "activity-1",
    slug: "clay-sculpture-workshop",
    title: "ورشة الطين والنحت",
    description:
      "نشاط يدوي ممتع يُنمّي الحس الفني والمهارات الحركية الدقيقة لدى الأطفال.",
    imageSrc: IMG.activity,
    ageRange: "3-5 سنوات",
    activityType: "فردي",
    skillTags: ["الإبداع", "التعبير", "المهارات الحركية الدقيقة"],
    rating: 4.8,
  },
  {
    id: "activity-2",
    slug: "little-colors-lab",
    title: "مختبر الألوان الصغير",
    description:
      "تجارب آمنة وممتعة لاكتشاف الألوان والخلط بينها في بيئة منزلية أو صفية.",
    imageSrc: IMG.activity2,
    ageRange: "4-6 سنوات",
    activityType: "جماعي",
    skillTags: ["الاستكشاف", "التعاون", "الملاحظة"],
    rating: 4.7,
  },
  {
    id: "activity-3",
    slug: "block-building",
    title: "بناء بالمكعبات",
    description:
      "تحديات هندسية ممتعة لتعزيز التفكير المكاني وحل المشكلات.",
    imageSrc: IMG.activity,
    ageRange: "5-8 سنوات",
    activityType: "فردي",
    skillTags: ["الهندسة", "التركيز", "الإبداع"],
    rating: 4.9,
  },
  {
    id: "activity-4",
    slug: "garden-trip",
    title: "رحلة في الحديقة",
    description:
      "نشاط خارجي يشجّع على التواصل مع الطبيعة وملاحظة النباتات والحشرات.",
    imageSrc: IMG.activity2,
    ageRange: "6-9 سنوات",
    activityType: "جماعي",
    skillTags: ["الطبيعة", "الملاحظة", "الصحة"],
    rating: 4.6,
  },
];

export const COURSES_ITEMS: CourseCardProps[] = [
  {
    id: "course-1",
    slug: "kids-programming-basics",
    title: "أساسيات البرمجة للأطفال",
    description:
      "دورة تفاعلية تساعد الأطفال على تعلم أساسيات البرمجة والتفكير المنطقي من خلال أنشطة وألعاب تعليمية ممتعة.",
    imageSrc: IMG.course,
    instructorName: "د. محمد الشهري",
    instructorAvatar: AVATAR,
    duration: "6 أسابيع",
    sessions: "12 جلسة",
    free: true,
    online: true,
    rating: 4.8,
  },
  {
    id: "course-2",
    slug: "reading-writing-skills",
    title: "مهارات القراءة والكتابة",
    description:
      "مسار تعليمي متدرّج لتقوية اللغة العربية والتعبير الكتابي للأطفال.",
    imageSrc: IMG.course2,
    instructorName: "أ. سارة العتيبي",
    instructorAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
    duration: "8 أسابيع",
    sessions: "16 جلسة",
    rating: 4.9,
  },
  {
    id: "course-3",
    slug: "interactive-mathematics",
    title: "الرياضيات التفاعلية",
    description:
      "دروس مرئية وأنشطة رقمية تجعل الرياضيات ممتعة وسهلة الفهم.",
    imageSrc: IMG.course,
    instructorName: "د. خالد العمري",
    instructorAvatar: AVATAR,
    duration: "5 أسابيع",
    sessions: "10 جلسات",
    free: false,
    online: true,
    rating: 4.7,
  },
  {
    id: "course-4",
    slug: "arts-and-creativity",
    title: "فنون وإبداع",
    description:
      "ورش أونلاين لتعليم الرسم والتلوين وتنمية الخيال الإبداعي.",
    imageSrc: IMG.course2,
    instructorName: "أ. نورة القحطاني",
    instructorAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80",
    duration: "4 أسابيع",
    sessions: "8 جلسات",
    free: true,
    rating: 4.6,
  },
];

export const SERVICES_ITEMS: ServiceCardProps[] = [
  {
    id: "service-1",
    slug: "cognitive-development-consultation",
    title: "استشارة التطور المعرفي",
    description:
      "خدمة مخصصة لتقييم وتوجيه مهارات الطفل المعرفية باستخدام تقنيات حديثة.",
    imageSrc: IMG.service,
    tags: ["مجانية", "أونلاين", "للآباء"],
    rating: 4.8,
  },
  {
    id: "service-2",
    slug: "parental-guidance-session",
    title: "جلسة توجيه تربوي",
    description:
      "لقاء مع مختص لتقديم نصائح عملية لدعم تعلّم الطفل في المنزل.",
    imageSrc: IMG.guide,
    tags: ["أونلاين", "للآباء"],
    rating: 4.7,
  },
  {
    id: "service-3",
    slug: "educational-level-assessment",
    title: "تقييم المستوى التعليمي",
    description:
      "تقرير مفصّل عن نقاط القوة ومجالات التحسين مع خطة متابعة شهرية.",
    imageSrc: IMG.service,
    tags: ["مجانية", "للمدارس"],
    rating: 4.9,
  },
  {
    id: "service-4",
    slug: "early-reading",
    title: "برنامج القراءة المبكرة",
    description:
      "برنامج تفاعلي لتعزيز مهارات القراءة المبكرة لدى الأطفال من خلال أنشطة وألعاب تعليمية.",
    imageSrc: IMG.service,
    tags: ["أونلاين", "مجانية"],
    rating: 4.8,
  },
  {
    id: "service-5",
    slug: "interactive-skills",
    title: "برنامج المهارات التفاعلية",
    description:
      "مسار تعليمي يطوّر مهارات التفكير والتفاعل الرقمي لدى الطفل بأسلوب ممتع.",
    imageSrc: IMG.service,
    tags: ["أونلاين", "للآباء"],
    rating: 4.7,
  },
  {
    id: "service-6",
    slug: "art-workshop",
    title: "ورشة الإبداع الفني",
    description:
      "ورشة عملية لتنمية الإبداع الفني والتعبير من خلال أنشطة يدوية موجهة.",
    imageSrc: IMG.guide,
    tags: ["للمدارس", "أونلاين"],
    rating: 4.6,
  },
  {
    id: "service-7",
    slug: "science-workshop",
    title: "ورشة العلوم الممتعة",
    description:
      "تجارب علمية مبسّطة تشجّع الفضول والاستكشاف لدى الأطفال.",
    imageSrc: IMG.service,
    tags: ["مجانية", "أونلاين"],
    rating: 4.8,
  },
  {
    id: "service-8",
    slug: "community-learning",
    title: "مبادرة التعلم المجتمعي",
    description:
      "مبادرة تربط الأسر والمدارس بأنشطة تعليمية مشتركة في المجتمع.",
    imageSrc: IMG.service,
    tags: ["للمدارس", "مجانية"],
    rating: 4.7,
  },
  {
    id: "service-9",
    slug: "family-support",
    title: "مبادرة دعم الأسر",
    description:
      "دعم تربوي ومتابعة تعليمية للأسر لبناء بيئة تعلّم إيجابية في المنزل.",
    imageSrc: IMG.guide,
    tags: ["للآباء", "أونلاين"],
    rating: 4.9,
  },
];

export const GUIDES_ITEMS: GuideCardProps[] = [
  {
    id: "guide-1",
    slug: "child-skills-development-guide",
    title: "دليل تنمية مهارات الطفل",
    description:
      "خطوات عملية وأنشطة تساعد على تعزيز التفكير الإبداعي لدى الأطفال في المنزل والمدرسة.",
    imageSrc: IMG.guide,
    tags: ["للآباء", "مجاني"],
    pages: "42 صفحة",
    rating: 4.8,
  },
  {
    id: "guide-2",
    slug: "digital-classroom-teacher-guide",
    title: "دليل المعلم في الفصل الرقمي",
    description:
      "إرشادات لتطبيق أدوات التعليم الرقمي وإدارة الصف الافتراضي بفعالية.",
    imageSrc: IMG.activity,
    tags: ["للمعلمين", "مجاني"],
    pages: "56 صفحة",
    rating: 4.7,
  },
  {
    id: "guide-3",
    slug: "home-learning-basics",
    title: "أساسيات التعلم في المنزل",
    description:
      "نصائح منظمة لبناء روتين تعليمي ممتع يدعم نمو الطفل المعرفي والاجتماعي.",
    imageSrc: IMG.guide,
    tags: ["للآباء", "مجاني"],
    pages: "38 صفحة",
    rating: 4.9,
  },
];
