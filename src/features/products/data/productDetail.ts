import type { CatalogSectionKey } from "@/src/features/products/types";

export type ProductAccordionItem = {
  title: string;
  content: string;
};

export type ProductChapter = {
  number: number;
  title: string;
  meta?: string;
  lessons?: string[];
};

export type ProductReview = {
  id: string;
  author: string;
  date: string;
  rating: number;
  text: string;
};

export type ProductBookMeta = {
  pageCount: number;
  fileType: string;
  language: string;
};

export type ProductCourseMeta = {
  hoursCount: number;
  lessonsCount: number;
  studentsRegistered: number | null;
  practiceProjects: number;
  instructorBio: string;
  jobTitle: string;
};

export type ProductSessionMeta = {
  duration: string;
  sessionType: string;
  target: string;
  isFree: boolean;
};

export type ProductGuideMeta = {
  forWhom: string;
  target: string;
  pageCount: number;
};

export type ProductContributorDisplay = {
  name: string;
  image: string;
};

export type ProductDetailMeta = {
  longDescription: string;
  contributor?: ProductContributorDisplay;
  accordions: ProductAccordionItem[];
  chapters?: ProductChapter[];
  curriculum?: ProductChapter[];
  learningPoints?: string[];
  courseFeatures?: string[];
  reviewCount: number;
  averageRating: number;
  ratingLabel: string;
  ratingDistribution: number[];
  reviews: ProductReview[];
  isFavourite?: boolean;
  isRated?: boolean;
  bookMeta?: ProductBookMeta;
  courseMeta?: ProductCourseMeta;
  sessionMeta?: ProductSessionMeta;
  guideMeta?: ProductGuideMeta;
};

const SAMPLE_REVIEWS: ProductReview[] = [
  {
    id: "r1",
    author: "وليد الغامدي",
    date: "منذ شهر",
    rating: 5,
    text: "تجربة رائعة ومفيدة جداً لطفلي، المحتوى منظم والشرح واضح.",
  },
  {
    id: "r2",
    author: "نورة السبيعي",
    date: "منذ شهرين",
    rating: 5,
    text: "أنصح به بشدة، ساعدنا على بناء روتين تعليمي ممتع في المنزل.",
  },
  {
    id: "r3",
    author: "فهد العتيبي",
    date: "25 نوفمبر 2025",
    rating: 4,
    text: "محتوى غني وتفاعلي، أتمنى إضافة المزيد من الأمثلة العملية.",
  },
];

const DEFAULT_DISTRIBUTION = [45, 12, 5, 3, 2];

function bookDetail(description: string): ProductDetailMeta {
  return {
    longDescription: `${description} يقدّم للطفل تجربة قراءة تفاعلية تجمع بين القصة والقيم التربوية، مع أنشطة بسيطة تعزز الفهم والاستيعاب.`,
    accordions: [
      {
        title: "الوصف التفصيلي",
        content:
          "يتضمن الكتاب قصصاً مصورة وأنشطة تفاعلية بعد كل فصل، مع أسئلة للنقاش بين الطفل وولي الأمر لترسيخ المفاهيم.",
      },
      {
        title: "أهداف الكتاب",
        content:
          "تعزيز القيم الإسلامية، تنمية مهارات القراءة والفهم، وتحفيز الخيال الإبداعي لدى الأطفال من خلال سرد قصصي مشوق.",
      },
    ],
    chapters: [
      { number: 1, title: "بداية الرسالة" },
      { number: 2, title: "قصة النبي آدم عليه السلام" },
      { number: 3, title: "قصة النبي نوح عليه السلام" },
      { number: 4, title: "خاتمة وتمارين تفاعلية" },
    ],
    reviewCount: 67,
    averageRating: 4.5,
    ratingLabel: "جيد جداً",
    ratingDistribution: DEFAULT_DISTRIBUTION,
    reviews: SAMPLE_REVIEWS,
  };
}

function courseDetail(description: string): ProductDetailMeta {
  return {
    longDescription: `${description} دورة مصممة لتنمية التفكير المنطقي والإبداعي عبر مشاريع عملية وأنشطة رقمية تفاعلية.`,
    accordions: [
      {
        title: "متطلبات الدورة",
        content:
          "لا يشترط خبرة سابقة. يكفي وجود جهاز متصل بالإنترنت مع متصفح حديث، ودفتر للملاحظات.",
      },
    ],
    curriculum: [
      {
        number: 1,
        title: "مقدمة: ما هي البرمجة؟",
        meta: "4 دروس · 3 ساعات",
        lessons: [
          "مرحباً بك في عالم البرمجة",
          "كيف يفكر الحاسوب",
          "أول برنامج لك",
          "مراجعة الوحدة",
        ],
      },
      {
        number: 2,
        title: "المتغيرات والشروط",
        meta: "5 دروس · 4 ساعات",
        lessons: ["ما هي المتغيرات؟", "الشروط والقرارات", "مشروع الوحدة"],
      },
      {
        number: 3,
        title: "الحلقات والمشاريع",
        meta: "6 دروس · 5 ساعات",
      },
    ],
    learningPoints: [
      "🧠 فهم أساسيات التفكير المنطقي",
      "💻 كتابة برامج بسيطة خطوة بخطوة",
      "🎮 تصميم ألعاب تعليمية صغيرة",
      "🔍 حل المشكلات بطريقة منهجية",
      "🤝 التعاون في مشاريع جماعية",
      "🌍 تطبيق المفاهيم في سيناريوهات واقعية",
    ],
    courseFeatures: [
      "36 ساعة فيديو",
      "مواد قابلة للتحميل",
      "شهادة إتمام معتمدة",
    ],
    reviewCount: 67,
    averageRating: 4.5,
    ratingLabel: "جيد جداً",
    ratingDistribution: DEFAULT_DISTRIBUTION,
    reviews: SAMPLE_REVIEWS,
  };
}

function serviceDetail(description: string): ProductDetailMeta {
  return {
    longDescription: `${description} جلسة متخصصة تساعد الأهالي على فهم مراحل نمو الطفل المعرفي وتقديم توصيات عملية مخصصة.`,
    accordions: [
      {
        title: "ماذا تشمل الجلسة؟",
        content:
          "تقييم أولي، مناقشة مع المختص، خطة متابعة مكتوبة، وموارد تعليمية مقترحة للمنزل.",
      },
    ],
    reviewCount: 67,
    averageRating: 4.5,
    ratingLabel: "جيد جداً",
    ratingDistribution: DEFAULT_DISTRIBUTION,
    reviews: SAMPLE_REVIEWS,
  };
}

function activityDetail(description: string): ProductDetailMeta {
  return {
    longDescription: `${description} نشاط عملي يشجّع الطفل على التعبير الإبداعي وتنمية المهارات الحركية الدقيقة في بيئة آمنة وممتعة.`,
    accordions: [
      {
        title: "ماذا سيتعلم الطفل؟",
        content:
          "المهارات الحركية الدقيقة، التعبير الفني، التركيز والصبر، والثقة بالنفس من خلال إنجاز عمل يدوي.",
      },
    ],
    reviewCount: 67,
    averageRating: 4.5,
    ratingLabel: "جيد جداً",
    ratingDistribution: DEFAULT_DISTRIBUTION,
    reviews: SAMPLE_REVIEWS,
  };
}

function guideDetail(description: string): ProductDetailMeta {
  return {
    longDescription: `${description} دليل عملي يقدّم خطوات واضحة وأنشطة قابلة للتطبيق لدعم تنمية مهارات الطفل في المنزل والمدرسة.`,
    accordions: [
      {
        title: "ماذا يقدم هذا الدليل؟",
        content:
          "أدوات تقييم بسيطة، أنشطة أسبوعية، ونماذج جاهزة للمعلمين والأهالي لتطبيق استراتيجيات التعلم الإبداعي.",
      },
    ],
    reviewCount: 67,
    averageRating: 4.5,
    ratingLabel: "جيد جداً",
    ratingDistribution: DEFAULT_DISTRIBUTION,
    reviews: SAMPLE_REVIEWS,
  };
}

export function getProductDetail(
  category: CatalogSectionKey,
  description: string,
): ProductDetailMeta {
  switch (category) {
    case "books":
      return bookDetail(description);
    case "courses":
      return courseDetail(description);
    case "services":
      return serviceDetail(description);
    case "activities":
      return activityDetail(description);
    case "guides":
      return guideDetail(description);
  }
}
