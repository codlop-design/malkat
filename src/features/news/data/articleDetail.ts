import type { NewsArticle, NewsArticleDetail } from "@/src/features/news/types";

const DETAIL_IMG = {
  classroom: "/new2.png",
  globe: "/new3.jpg",
  boy: "/new1.jpg",
  group: "/new3.jpg",
};

const FEATURED_DETAIL: NewsArticleDetail = {
  intro:
    "أطلقت المنصة مبادرة مبتكرو المستقبل بهدف اكتشاف ودعم المواهب الشابة في مجالات البرمجة والروبوتات والذكاء الاصطناعي، من خلال ورش تفاعلية وبرامج إرشادية يقودها خبراء متخصصون، بما يعزز ثقة الطلاب بقدراتهم ويفتح أمامهم آفاقاً جديدة للتعلم.",
  activitiesIntro: "وتشمل الأنشطة التعليمية في المبادرة:",
  activities: [
    "ورش الرسم والتلوين الإبداعي",
    "ألعاب المنطق والتفكير التحليلي",
    "تحديات برمجية مبسطة للأطفال",
    "جلسات إرشاد جماعية مع مختصين",
  ],
  goalsTitle: "أهداف المبادرة",
  goals: [
    "تنمية الإبداع وحب الاستكشاف لدى الأطفال",
    "دعم التعلم التفاعلي خارج الصف الدراسي",
    "بناء مهارات المستقبل في بيئة آمنة وممتعة",
    "تعزيز التعاون بين الأسرة والمدرسة والمجتمع",
  ],
  programStartTitle: "بداية البرنامج",
  programStart:
    "ينطلق البرنامج في بداية الفصل الدراسي القادم، مع إتاحة التسجيل المبكر للمدارس والمؤسسات الشريكة. سيتم الإعلان عن الجدول الزمني ومواقع التنفيذ عبر قنوات المنصة الرسمية.",
  gallery: [DETAIL_IMG.group, DETAIL_IMG.classroom, DETAIL_IMG.globe],
  featuredImage: DETAIL_IMG.boy,
};

function buildDefaultDetail(article: NewsArticle): NewsArticleDetail {
  const image = article.imageSrc;
  return {
    intro: `${article.excerpt} تهدف هذه الفعالية إلى تقديم تجربة تعليمية غنية تجمع بين المتعة والمعرفة، وتشجع الأطفال على المشاركة الفاعلة في أنشطة مصممة بعناية.`,
    activitiesIntro: "وتشمل الأنشطة ما يلي:",
    activities: [
      "ورش تفاعلية في الفصول والمراكز التعليمية",
      "أنشطة جماعية لتنمية التعاون والتواصل",
      "مسابقات تحفيزية بجوائز وشهادات تقدير",
    ],
    goalsTitle: "أهداف المبادرة",
    goals: [
      "تعزيز مهارات التفكير والإبداع",
      "دعم التعلم التفاعلي بطريقة آمنة",
      "توسيع مشاركة الأسر والمجتمع المحلي",
    ],
    programStartTitle: "بداية البرنامج",
    programStart:
      "يُستأنف البرنامج وفق الجدول المعلن من المنصة، مع إمكانية متابعة آخر المستجدات عبر صفحة الأخبار.",
    gallery: [image, DETAIL_IMG.classroom, DETAIL_IMG.globe],
    featuredImage: DETAIL_IMG.boy,
  };
}

const DETAIL_BY_SLUG: Partial<Record<string, NewsArticleDetail>> = {
  "future-innovators-initiative": FEATURED_DETAIL,
  "spring-education-program": {
    ...FEATURED_DETAIL,
    intro:
      "انطلاق البرنامج التعليمي الربيعي للأطفال في المنطقة الشرقية يأتي ضمن جهود المنصة لتوفير تجارب تعليمية متنوعة تجمع بين اللعب والتعلم، مع التركيز على تنمية المهارات الاجتماعية والمعرفية في بيئة محفزة.",
    programStart:
      "يبدأ البرنامج الربيعي في الأسبوع الأول من شهر مارس، مع فترات تسجيل مفتوحة للمدارس والأهالي حتى اكتمال العدد المستهدف.",
  },
};

export function getArticleDetail(article: NewsArticle): NewsArticleDetail {
  return (
    article.content ??
    DETAIL_BY_SLUG[article.slug] ??
    buildDefaultDetail(article)
  );
}
