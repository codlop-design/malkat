import type { NewsArticle } from "@/src/features/news/types";

const IMG = {
  featured: "/news.jpg",
  card: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80",
};

export const FEATURED_NEWS: NewsArticle = {
  id: "featured-1",
  slug: "future-innovators-initiative",
  title: "إطلاق مبادرة مبتكرو المستقبل لدعم المواهب الشابة في مجال التقنية",
  excerpt:
    "أطلقت المنصة مبادرة مبتكرو المستقبل بهدف اكتشاف ودعم المواهب الشابة في مجالات البرمجة والروبوتات والذكاء الاصطناعي، من خلال ورش تفاعلية وبرامج إرشادية يقودها خبراء متخصصون.",
  date: "الخميس 12 فبراير 2026",
  imageSrc: IMG.featured,
};

export const LATEST_NEWS: NewsArticle[] = [
  {
    id: "news-1",
    slug: "ghuwairi-food-baskets",
    title:
      "بدعم سخي من مؤسسة الغويري الخيرية توزيع الدفعة الأولى من السلال الغذائية",
    excerpt:
      "في إطار شراكتها المجتمعية، وزّعت المنصة بالتعاون مع مؤسسة الغويري الخيرية الدفعة الأولى من السلال الغذائية على الأسر المستفيدة...",
    date: "الخميس 12 فبراير 2026",
    imageSrc: IMG.card,
  },
  {
    id: "news-2",
    slug: "spring-education-program",
    title: "انطلاق البرنامج التعليمي الربيعي للأطفال في المنطقة الشرقية",
    excerpt:
      "يشمل البرنامج أنشطة تفاعلية وورشاً إبداعية مصممة لتنمية مهارات التفكير والتعاون لدى الأطفال من مختلف الأعمار...",
    date: "الأربعاء 5 فبراير 2026",
    imageSrc: IMG.card,
  },
  {
    id: "news-3",
    slug: "parent-workshops",
    title: "ورش توعوية للأهالي حول التربية الرقمية الآمنة للأطفال",
    excerpt:
      "نظّمت المنصة سلسلة ورش مجانية للأهالي تناقش أفضل الممارسات لحماية الأطفال أثناء استخدام الإنترنت والألعاب التعليمية...",
    date: "الاثنين 27 يناير 2026",
    imageSrc: IMG.card,
  },
  {
    id: "news-4",
    slug: "reading-challenge",
    title: "تحدي القراءة الشتوي يحقق مشاركة قياسية من الطلاب والمعلمين",
    excerpt:
      "سجّل أكثر من ألف طفل مشاركتهم في تحدي القراءة الشتوي، مع جوائز تحفيزية وشهادات تقدير للمتميزين من المدارس الشريكة...",
    date: "السبت 18 يناير 2026",
    imageSrc: IMG.card,
  },
];

export const ALL_NEWS: NewsArticle[] = [FEATURED_NEWS, ...LATEST_NEWS];

export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return ALL_NEWS.find((item) => item.slug === slug);
}

export function getAllNewsSlugs(): string[] {
  return [...new Set(ALL_NEWS.map((item) => item.slug))];
}
