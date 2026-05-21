"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import {
  fadeUp,
  motionViewport,
  staggerContainer,
} from "@/src/lib/motion";

type Step = {
  number: string;
  title: string;
  description: string;
  iconSrc: string;
};

const STEPS: Step[] = [
  {
    number: "01",
    title: "اختر الخدمة",
    description:
      "تصفّح مكتبتنا الشاملة من الخدمات وجد ما يناسب احتياجاتك تماماً",
    iconSrc: "/search-folder.svg",
  },
  {
    number: "02",
    title: "سجّل طلبك",
    description:
      "أرسل طلبك بسهولة من خلال نموذج بسيط يستغرق دقيقة واحدة فقط",
    iconSrc: "/document.svg",
  },
  {
    number: "03",
    title: "سيتم التواصل معك",
    description:
      "سيتواصل معك فريقنا المتخصص خلال 24 ساعة لتأكيد التفاصيل",
    iconSrc: "/contact-us.svg",
  },
  {
    number: "04",
    title: "ابدأ رحلتك التعليمية",
    description:
      "استمتع بتجربة تعليمية استثنائية مصممة خصيصاً لك ولأطفالك",
    iconSrc: "/rocket.svg",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#F5F0E8] py-14 md:py-20">
      <motion.div
        className="container"
        dir="rtl"
        initial="hidden"
        whileInView="visible"
        viewport={motionViewport}
        variants={staggerContainer(0.08, 0.05)}
      >
        <motion.div variants={fadeUp} className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-(--primary) md:text-base">
            كيف تعمل
          </p>
          <h2 className="mt-2 text-2xl font-bold text-black md:text-[28px]">
            رحلتك مع منارة في أربع خطوات
          </h2>
          <p className="mt-3 text-sm leading-[1.85] text-[#717171] md:text-base">
            عملية بسيطة وسلسة تضمن لك الحصول على أفضل خدمة تعليمية تناسب
            احتياجاتك
          </p>
        </motion.div>

        <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {STEPS.map((step) => (
            <motion.li
              key={step.number}
              variants={fadeUp}
              className="flex flex-col items-center text-center"
            >
              <Image
                src={step.iconSrc}
                alt=""
                width={72}
                height={72}
                className="h-[72px] w-[72px] object-contain md:h-20 md:w-20"
                unoptimized
              />
              <span className="mt-5 text-xl font-bold text-[#9CA3AF] md:text-2xl">
                {step.number}
              </span>
              <h3 className="mt-2 text-base font-bold text-black md:text-lg">
                {step.title}
              </h3>
              <p className="mt-2 max-w-[240px] text-sm leading-relaxed text-[#717171] md:text-[15px]">
                {step.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </motion.div>
    </section>
  );
}
