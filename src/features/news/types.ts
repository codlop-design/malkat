export type NewsArticleDetail = {
  intro: string;
  activitiesIntro: string;
  activities: string[];
  goalsTitle: string;
  goals: string[];
  programStartTitle: string;
  programStart: string;
  gallery: string[];
  featuredImage: string;
};

export type NewsArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  imageSrc: string;
  content?: NewsArticleDetail;
};
