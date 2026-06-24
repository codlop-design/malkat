import type { CourseLesson } from "@/src/features/products/data/courseStages";

export type LessonStartMode = "text" | "file" | "none";

export function getLessonStartMode(lesson: CourseLesson): LessonStartMode {
  if (lesson.isLocked) {
    return "none";
  }

  const hasDescription = Boolean(lesson.description?.trim());
  const hasFile = Boolean(lesson.fileUrl);

  if (lesson.type === "text" && hasDescription) {
    return "text";
  }

  if (lesson.type === "file" && hasFile) {
    return "file";
  }

  if (hasDescription && !hasFile) {
    return "text";
  }

  if (hasFile) {
    return "file";
  }

  if (hasDescription) {
    return "text";
  }

  return "none";
}
