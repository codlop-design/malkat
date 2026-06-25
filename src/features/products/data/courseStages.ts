export type CourseLesson = {
  id: number;
  number: number;
  title: string;
  subtitle: string;
  type: string;
  description: string | null;
  isLocked: boolean;
  lockedMessage: string | null;
  hasQuiz: boolean;
  isPassed: boolean;
  fileUrl: string | null;
};

export type CourseStage = {
  id: number;
  number: number;
  title: string;
  isActive: boolean;
  lessons: CourseLesson[];
};

export type CourseQuizAnswer = {
  id: number;
  text: string;
  image: string | null;
  isCorrect: boolean;
};

export type CourseQuizQuestion = {
  id: number;
  text: string;
  image: string | null;
  answers: CourseQuizAnswer[];
};

export type CourseQuiz = {
  id: number;
  title: string;
  totalQuestions: number;
  passingPercentage: number;
  questions: CourseQuizQuestion[];
};

export type CourseQuizSubmitResult = {
  passed: boolean;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  passingPercentage: number;
  message: string;
  stagePassed?: boolean;
  certificateUrl?: string | null;
};

export type CourseQuizReview = {
  message: string;
  selections: Record<number, number>;
  correctAnswers: number;
  totalQuestions: number;
  passed: boolean;
  score: number;
};

export type CourseQuizLoadResult = {
  quiz: CourseQuiz;
  review: CourseQuizReview | null;
};
