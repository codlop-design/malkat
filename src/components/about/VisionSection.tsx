"use client";

import VisionCard from "@/src/components/about/VisionCard";
import Image from "next/image";
import { motion } from "framer-motion";

import {
  fadeUp,
  motionViewport,
  staggerContainer,
} from "@/src/lib/motion";

const SHARED_FOCUS_POINTS = [
  "تعليم متاح للجميع",
  "محتوى يواكب المستقبل",
  "تجربة ممتعة وآمنة",
];

export default function VisionSection() {
  return (
    <section className="bg-[#006d6d] py-14 md:py-8 lg:py-14" dir="rtl">
      <div className="container">
        <motion.header
          className="mb-12 text-center md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={staggerContainer()}
        >
          <motion.p
            variants={fadeUp}
            className="text-sm text-white/90 md:text-base"
          >
            رؤيتنا ورسالتنا
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-3 text-2xl font-bold leading-tight text-white md:text-3xl lg:text-[32px]"
          >
            ما الذي نؤمن به ونسعى إليه
          </motion.h2>
        </motion.header>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={staggerContainer(0.15)}
        >
          <motion.div variants={fadeUp}>
            <VisionCard
              label="رؤيتنا"
              lead="أن نكون المنصة التعليمية الأولى للطفل العربي"
              body="نتطلع إلى عالم يتساوى فيه الأطفال في الحصول على تعليم عالي الجودة، بغض النظر عن موقعهم أو إمكاناتهم – تعليم يُلهمهم، يُمكنّهم، ويُحضّرهم لقيادة مستقبل أفضل."
              bullets={SHARED_FOCUS_POINTS}
              icon={
                <Image src="/v1.svg" alt="" width={40} height={40} />
              }
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <VisionCard
              label="رسالتنا"
              lead="تمكين كل طفل بتعلّم يُناسب عالمه وطموحه"
              body="نبني تجارب تعليمية تفاعلية تجمع الترفيه والمعرفة، بالشراكة مع الأسرة والمجتمع، لتنشئة جيل يحب التعلم ويثق بقدراته."
              bullets={SHARED_FOCUS_POINTS}
              icon={
                <Image src="/v2.svg" alt="" width={40} height={40} />
              }
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
