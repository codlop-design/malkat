export type CourseLesson = {
  id: number;
  number: number;
  title: string;
  subtitle: string;
  type: string;
  description: string | null;
  isLocked: boolean;
  hasQuiz: boolean;
  isPassed: boolean;
  fileUrl: string | null;
};

export type CourseStage = {
  id: number;
  number: number;
  title: string;
  lessons: CourseLesson[];
};

export type CourseQuizAnswer = {
  id: number;
  text: string;
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
