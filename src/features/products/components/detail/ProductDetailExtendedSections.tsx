import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import type { ProductDetailMeta } from "@/src/features/products/data/productDetail";

type ProductDetailExtendedSectionsProps = {
  detail: ProductDetailMeta;
  hideCurriculum?: boolean;
};

export default function ProductDetailExtendedSections({
  detail,
  hideCurriculum = false,
}: ProductDetailExtendedSectionsProps) {
  return (
    <>
      {detail.chapters ? (
        <section className="mt-10">
          <h2 className="mb-5 text-xl font-bold text-black">محتويات الكتاب</h2>
          <ul className="flex flex-col gap-3">
            {detail.chapters.map((chapter) => (
              <li
                key={chapter.number}
                className="flex items-center gap-4 rounded-xl border border-[#E8E8E8] bg-white px-4 py-3"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {chapter.number}
                </span>
                <span className="text-sm font-medium text-black">
                  {chapter.title}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {detail.curriculum && !hideCurriculum ? (
        <section className="mt-10">
          <h2 className="mb-5 text-xl font-bold text-black">محتويات الدورة</h2>
          <Accordion type="multiple" className="flex flex-col gap-3">
            {detail.curriculum.map((section) => (
              <AccordionItem
                key={section.number}
                value={`section-${section.number}`}
                className="overflow-hidden rounded-xl border border-[#E8E8E8] bg-white px-4"
              >
                <AccordionTrigger className="py-4 hover:no-underline">
                  <div className="flex flex-1 items-center gap-4 text-right">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                      {section.number}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-black">
                        {section.title}
                      </p>
                      {section.meta ? (
                        <p className="text-xs text-[#717171]">{section.meta}</p>
                      ) : null}
                    </div>
                  </div>
                </AccordionTrigger>
                {section.lessons ? (
                  <AccordionContent>
                    <ul className="flex flex-col gap-2 pb-2 pe-4">
                      {section.lessons.map((lesson) => (
                        <li
                          key={lesson}
                          className="text-sm text-[#454545] before:me-2 before:text-primary before:content-['•']"
                        >
                          {lesson}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                ) : null}
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      ) : null}

      {detail.learningPoints ? (
        <section className="mt-10 rounded-2xl border border-[#E8E8E8] bg-white p-6 md:p-8">
          <h2 className="mb-4 text-xl font-bold text-black">ما ستتعلمه</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {detail.learningPoints.map((point) => (
              <li
                key={point}
                className="text-sm leading-relaxed text-[#454545]"
                dangerouslySetInnerHTML={{ __html: point }}
              />
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}
