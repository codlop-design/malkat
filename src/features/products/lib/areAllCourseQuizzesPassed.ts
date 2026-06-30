import type { CourseStage } from "@/src/features/products/data/courseStages";

export function areAllCourseQuizzesPassed(stages: CourseStage[]): boolean {
  const quizLessons = stages.flatMap((stage) =>
    stage.lessons.filter((lesson) => lesson.hasQuiz),
  );

  if (quizLessons.length === 0) {
    return false;
  }

  return quizLessons.every((lesson) => lesson.isPassed);
}
