export interface CourseStageLessonApi {
  id: number;
  title: string;
  subtitle?: string | null;
  type?: string;
  is_locked: boolean;
  locked_message?: string | null;
  description?: string | null;
  file?: string | null;
  has_quiz: boolean;
  is_passed?: boolean;
}

export interface CourseStageApi {
  id: number;
  title: string;
  is_active?: boolean;
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
  data?: CourseQuizApiPayload | CourseQuizSnapshotPayload;
}

export interface CourseQuizSnapshotAnswerApi {
  id: number;
  answer_text: string;
  image?: string | null;
  is_correct: boolean;
  is_selected?: boolean;
}

export interface CourseQuizSnapshotItemApi {
  question_id: number;
  question_text: string;
  image?: string | null;
  question_image?: string | null;
  user_answer_id?: number | null;
  correct_answer_id?: number | null;
  is_correct: boolean;
  answers: CourseQuizSnapshotAnswerApi[];
}

export interface CourseQuizSnapshotPayload {
  snapshot: CourseQuizSnapshotItemApi[];
}

export interface CourseQuizSubmitApiResponse {
  success?: boolean;
  message?: string;
  data?: {
    id?: number;
    score: number;
    correct_answers: number;
    wrong_answers?: number;
    total_questions: number;
    passed: boolean;
    passing_percentage: number;
    stage_passed?: boolean;
    certificate_url?: string | null;
  };
}

export interface CourseLessonDescriptionApi {
  id: number;
  title: string;
  description: string;
}

export interface CourseLessonDescriptionApiResponse {
  success?: boolean;
  message?: string;
  data?: CourseLessonDescriptionApi;
}

export interface CourseCertificateApi {
  course_name: string;
  user_name: string;
  issued_at: string;
  logo: string;
}

export interface CourseCertificateApiResponse {
  success?: boolean;
  message?: string;
  earned?: boolean;
  certificate?: CourseCertificateApi | null;
}
