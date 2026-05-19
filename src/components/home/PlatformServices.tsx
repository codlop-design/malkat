"use client";

import type { LucideIcon } from "lucide-react";
import {
  Atom,
  BookOpen,
  GraduationCap,
  LayoutGrid,
  Package,
} from "lucide-react";
import { motion } from "framer-motion";

import {
  fadeUp,
  motionViewport,
  staggerContainer,
} from "@/src/lib/motion";

type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
  featured?: boolean;
};

const services: Service[] = [
  {
    title: "الكتب التعليمية",
    description: "مكتبة ضخمة من الكتب لجميع المراحل",
    icon: BookOpen,
  },
  {
    title: "الأنشطة التفاعلية",
    description: "أنشطة ممتعة تُعزز التعلّم باللعب",
    icon: Atom,
  },
  {
    title: "الدورات التعليمية",
    description: "دورات أونلاين وحضورية متخصصة",
    icon: GraduationCap,
    featured: true,
  },
  {
    title: "الخدمات التعليمية",
    description: "خدمات مخصصة للمدارس والمؤسسات",
    icon: LayoutGrid,
  },
  {
    title: "المنتجات التعليمية",
    description: "ألعاب تعليمية وأدوات للتعلم",
    icon: Package,
  },
];

function ServiceCard({ title, description, icon: Icon, featured }: Service) {
  return (
    <motion.article
      variants={fadeUp}
      className={`flex flex-col items-center gap-4 rounded-3xl px-5 py-8 text-center transition-colors ${
        featured
          ? "bg-(--primary) text-white"
          : "bg-[#E8F6F4] text-[#1F1F1F]"
      }`}
    >
      <div className="flex size-14 items-center justify-center rounded-full bg-white">
        <Icon
          className="size-7 text-(--primary)"
          strokeWidth={1.75}
          aria-hidden
        />
      </div>

      <div className="flex flex-col gap-2">
        <h3
          className={`text-lg font-bold leading-snug ${
            featured ? "text-white" : "text-black"
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-sm leading-relaxed ${
            featured ? "text-white/90" : "text-[#454545]"
          }`}
        >
          {description}
        </p>
      </div>
    </motion.article>
  );
}

export default function PlatformServices() {
  return (
    <section className="py-16">
      <div className="container">
        <motion.div
          className="mx-auto mb-12 flex max-w-3xl flex-col items-center gap-3 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={staggerContainer()}
        >
          <motion.span
            variants={fadeUp}
            className="text-base font-medium text-(--primary)"
          >
            استكشف المحتوى
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-bold text-black md:text-4xl"
          >
            كل ما تحتاجه في مكان واحد
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-base text-[#454545] md:text-lg"
          >
            مجموعة متنوعة من الموارد التعليمية المصممة لكل مرحلة عمرية
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={staggerContainer(0.1, 0.15)}
        >
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
