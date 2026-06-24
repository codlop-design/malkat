"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/src/components/ui/drawer";
import type { CourseLesson } from "@/src/features/products/data/courseStages";

type CourseLessonTextDrawerProps = {
  lesson: CourseLesson | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function CourseLessonTextDrawer({
  lesson,
  open,
  onOpenChange,
}: CourseLessonTextDrawerProps) {
  if (!lesson?.description) {
    return null;
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh] bg-white" dir="rtl">
        <DrawerHeader className="border-b border-[#E8E8E8] text-start">
          <DrawerTitle className="text-lg font-bold text-black">
            {lesson.title}
          </DrawerTitle>
          {lesson.subtitle ? (
            <DrawerDescription className="text-sm text-[#717171]">
              {lesson.subtitle}
            </DrawerDescription>
          ) : null}
        </DrawerHeader>

        <div
          className="overflow-y-auto px-6 py-5 prose prose-sm max-w-none text-[#454545] md:prose-base [&_a]:text-primary [&_strong]:text-black"
          dangerouslySetInnerHTML={{ __html: lesson.description }}
        />
      </DrawerContent>
    </Drawer>
  );
}
