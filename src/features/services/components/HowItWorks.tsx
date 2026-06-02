import Image from "next/image";

import type { ServicePageSection } from "@/src/features/services/types/servicePage";

type HowItWorksProps = {
  section: ServicePageSection;
};

export default function HowItWorks({ section }: HowItWorksProps) {
  return (
    <section className="bg-[#F5F0E8] py-14 md:py-20">
      <div className="container" dir="rtl">
        <div className="mx-auto max-w-2xl text-center">
          {section.title ? (
            <h2 className="text-2xl font-bold text-black md:text-[28px]">
              {section.title}
            </h2>
          ) : null}
          {section.content ? (
            <p className="mt-3 text-sm leading-[1.85] text-[#717171] md:text-base">
              {section.content}
            </p>
          ) : null}
        </div>

        {section.items.length > 0 ? (
          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {section.items.map((step, index) => (
              <li
                key={`${step.title}-${index}`}
                className="flex flex-col items-center text-center"
              >
                {step.image ? (
                  <Image
                    src={step.image}
                    alt=""
                    width={72}
                    height={72}
                    className="h-[72px] w-[72px] object-contain md:h-20 md:w-20"
                    unoptimized
                  />
                ) : null}
                <span className="mt-5 text-xl font-bold text-[#9CA3AF] md:text-2xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-base font-bold text-black md:text-lg">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[240px] text-sm leading-relaxed text-[#717171] md:text-[15px]">
                  {step.content}
                </p>
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    </section>
  );
}
