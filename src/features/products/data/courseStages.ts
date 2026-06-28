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

export type CourseQuizReview = {
  message: string;
  title: string;
  questions: CourseQuizQuestion[];
  selections: Record<number, number>;
  correctAnswers: number;
  totalQuestions: number;
  score: number;
  passed: boolean;
  passingPercentage: number;
};

export type CourseQuizLoadResult =
  | { mode: "active"; quiz: CourseQuiz }
  | { mode: "review"; review: CourseQuizReview };

export type CourseQuizSubmitResult = {
  id?: number;
  passed: boolean;
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  totalQuestions: number;
  passingPercentage: number;
  message: string;
  stagePassed?: boolean;
  certificateUrl?: string | null;
};

export type CourseLessonDescription = {
  id: number;
  title: string;
  description: string;
};
