"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import {
  fadeUp,
  motionViewport,
  staggerContainer,
} from "@/src/lib/motion";
import type { AboutUsSection } from "@/src/features/about/types";

type AboutPageContentProps = {
  sections: AboutUsSection[];
};

function SectionHeading({
  title,
  icon,
}: {
  title: string;
  icon?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      {icon ? (
        <Image src={icon} alt="" width={40} height={40} className="size-10 object-contain" />
      ) : (
        <Image src="/story.svg" alt="" width={40} height={40} />
      )}
      <h2 className="text-2xl font-bold text-black md:text-[28px]">{title}</h2>
    </div>
  );
}

function AboutTextBlock({ section }: { section: AboutUsSection }) {
  return (
    <motion.div
      className="space-y-5 text-right"
      initial="hidden"
      whileInView="visible"
      viewport={motionViewport}
      variants={staggerContainer()}
    >
      <motion.div variants={fadeUp}>
        <SectionHeading title={section.title} icon={section.icon} />
      </motion.div>
      <motion.p
        variants={fadeUp}
        className="text-base leading-[1.85] text-[#454545] md:text-lg whitespace-pre-line"
      >
        {section.content}
      </motion.p>
    </motion.div>
  );
}

function AboutImageBlock({ src, priority }: { src: string; priority?: boolean }) {
  return (
    <motion.div
      className="relative aspect-5/4 w-full overflow-hidden rounded-2xl"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={motionViewport}
      transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <Image
        src={src}
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 45vw"
        priority={priority}
      />
    </motion.div>
  );
}

export default function AboutPageContent({ sections }: AboutPageContentProps) {
  if (!sections.length) {
    return null;
  }

  const [intro, story] = sections;

  return (
    <section className="py-8">
      <div className="container space-y-10">
        {intro ? (
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
            <AboutTextBlock section={intro} />
            {intro.image ? <AboutImageBlock src={intro.image} priority /> : null}
          </div>
        ) : null}

        {story ? (
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
            {story.image ? <AboutImageBlock src={story.image} /> : null}
            <AboutTextBlock section={story} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
