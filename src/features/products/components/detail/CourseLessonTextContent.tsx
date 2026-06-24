type CourseLessonTextContentProps = {
  title: string;
  subtitle?: string;
  content: string;
};

const contentClassName =
  "prose prose-sm max-w-none overflow-x-auto break-words text-[#454545] md:prose-base [&_*]:max-w-full [&_a]:text-primary [&_img]:h-auto [&_img]:max-w-full [&_li]:my-1 [&_p]:my-2 [&_strong]:text-black";

export default function CourseLessonTextContent({
  title,
  subtitle,
  content,
}: CourseLessonTextContentProps) {
  return (
    <div className="mt-4 rounded-xl border border-[#E8E8E8] bg-white p-4 md:p-6">
      <div className="mb-4 border-b border-[#E8E8E8] pb-4">
        <h3 className="text-base font-bold text-black md:text-lg">{title}</h3>
        {subtitle ? (
          <p className="mt-1 text-sm text-[#717171]">{subtitle}</p>
        ) : null}
      </div>

      <div
        className={contentClassName}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
