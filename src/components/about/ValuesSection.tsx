"use client";

import ValueCard from "@/src/components/about/ValueCard";
import Image from "next/image";
import { motion } from "framer-motion";

import {
  fadeUp,
  motionViewport,
  staggerContainer,
} from "@/src/lib/motion";

const VALUES = [
  {
    title: "التعلم الممتع",
    description:
      "نؤمن أن الفضول الطبيعي للطفل هو أفضل محرك للتعلم. نصمم كل محتوى ليكون تجربة ممتعة لا مهمة مملة.",
    iconSrc: "/learn.svg",
  },
  {
    title: "الإبداع",
    description:
      "نحتفل بتفرد كل طفل ونشجع على التعبير الإبداعي الحر عبر أنشطة فنية وقصصية وعلمية متنوعة.",
    iconSrc: "/creativity.svg",
  },
  {
    title: "الأمان",
    description:
      "بيئة آمنة 100% خالية من المحتوى الضار. نراجع كل محتوى بدقة ونحمي خصوصية الطفل والأسرة.",
    iconSrc: "/hygiene.svg",
  },
  {
    title: "الشراكة المجتمعية",
    description:
      "نبني جسوراً بين المدرسة، الأسرة، والمجتمع لتوحيد جهود تنشئة جيل متعلم ومتوازن.",
    iconSrc: "/cooperative.svg",
  },
] as const;

export default function ValuesSection() {
  return (
    <section className="bg-[#FAFAFA] py-14 md:py-8 lg:py-14" >
      <div className="container">
        <motion.header
          className="mx-auto mb-12 max-w-3xl text-center md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={staggerContainer()}
        >
          <motion.div variants={fadeUp} className="mb-4 flex justify-center">
            <Image
              src="/vallues.svg"
              alt=""
              width={48}
              height={50}
              className="h-auto w-12"
            />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-2xl font-bold text-black md:text-3xl lg:text-[32px]"
          >
            قيمنا
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-3 text-lg font-bold text-black md:text-xl"
          >
            المبادئ التي تقودنا
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-base leading-[1.85] text-[#454545] md:text-lg"
          >
            قيمنا ليست شعارات على الجدران – بل هي القرارات اليومية التي نتخذها
            لخدمة أطفالنا بأفضل ما نستطيع.
          </motion.p>
        </motion.header>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={staggerContainer(0.1)}
        >
          {VALUES.map((value) => (
            <motion.div key={value.title} variants={fadeUp}>
              <ValueCard
                title={value.title}
                description={value.description}
                iconSrc={value.iconSrc}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
