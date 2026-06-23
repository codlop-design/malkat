export interface CourseStageLessonApi {
  id: number;
  title: string;
  subtitle?: string | null;
  type?: string;
  is_locked: boolean;
  description?: string | null;
  file?: string | null;
  has_quiz: boolean;
  is_passed?: boolean;
}

export interface CourseStageApi {
  id: number;
  title: string;
  lessons: CourseStageLessonApi[];
}

export interface CourseStagesApiResponse {
  success?: boolean;
  message?: string;
  data?: CourseStageApi[];
  pagination?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  };
}

export interface CourseQuizAnswerApi {
  id: number;
  answer: string;
  is_correct?: boolean;
  image?: string | null;
}

export interface CourseQuizQuestionApi {
  id: number;
  question: string;
  image?: string | null;
  answers: CourseQuizAnswerApi[];
}

export interface CourseQuizApiPayload {
  id?: number;
  title: string;
  passing_percentage: number;
  questions_count: number;
  questions: CourseQuizQuestionApi[];
}

export interface CourseQuizApiResponse {
  success?: boolean;
  message?: string;
  data?: CourseQuizApiPayload;
}

export interface CourseQuizSubmitApiResponse {
  success?: boolean;
  message?: string;
  data?: {
    score: number;
    correct_answers: number;
    total_questions: number;
    passed: boolean;
    passing_percentage: number;
    stage_passed?: boolean;
    certificate_url?: string | null;
  };
}
