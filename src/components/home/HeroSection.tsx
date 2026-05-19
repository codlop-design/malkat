"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { fadeUp, staggerContainer } from "@/src/lib/motion";

export default function HeroSection() {
  return (
    <section className="bg-[#FFF8F0] py-12">
      <div className="container">
        <div className="flex items-center justify-between">
          <motion.div
            className="max-w-[500px] flex flex-col gap-6 text-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer(0.14, 0.1)}
          >
            <motion.h1
              variants={fadeUp}
              className="text-[48px] font-medium leading-[64px] text-black"
            >
              رحلة تعليمية ممتعة تُلهم أطفال المستقبل
            </motion.h1>

            <motion.p variants={fadeUp} className="text-2xl text-[#454545]">
              منصة تفاعلية تقدم محتوى تعليمي وأنشطة ودورات مصممة خصيصًا لتنمية
              مهارات الأطفال بطريقة ممتعة وآمنة
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex items-center justify-center gap-5"
            >
              <Link
                href="/products"
                className="bg-(--primary) text-white py-3 px-6 rounded-full text-[18px] font-medium"
              >
                استكشف المحتوى
              </Link>

              <Link
                href="/register-your-interest"
                className="bg-transparent border border-black text-black text-[18px] font-medium py-3 px-6 rounded-full"
              >
                تسجيل اهتمامك
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 48, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image src="/hero.png" alt="Hero Image" width={640} height={640} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
