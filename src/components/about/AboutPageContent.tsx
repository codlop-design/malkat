"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import {
  fadeUp,
  motionViewport,
  staggerContainer,
} from "@/src/lib/motion";

const IMG_INTRO =
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80";
const IMG_STORY_1 =
  "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=500&q=80";
const IMG_STORY_2 =
  "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=500&q=80";
const IMG_STORY_3 =
  "https://images.unsplash.com/photo-1554727242-741c14fa561c?auto=format&fit=crop&w=500&q=80";

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <Image src="/story.svg" alt="" width={40} height={40} />
      <h2 className="text-2xl font-bold text-black md:text-[28px]">{title}</h2>
    </div>
  );
}

export default function AboutPageContent() {
  return (
    <section className="py-8">
      <div className="container">
        <div className="mb-10 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <motion.div
            className="space-y-5 text-right"
            
            initial="hidden"
            whileInView="visible"
            viewport={motionViewport}
            variants={staggerContainer()}
          >
            <motion.div variants={fadeUp}>
              <SectionHeading title="نبذة عنا" />
            </motion.div>
            <motion.p
              variants={fadeUp}
              className="text-lg font-semibold leading-relaxed text-black md:text-xl"
            >
              نبني جيلاً واعياً بمحتوى تعليمي يُلهم ويُبدع
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-base leading-[1.85] text-[#454545] md:text-lg"
            >
              نافذة المستقبل منصة تعليمية متخصصة تُقدّم تجارب تعليمية ثرية
              للأطفال والأسر، بمحتوى موثوق يجمع بين المتعة والتعلّم العميق.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-lg font-semibold text-black md:text-xl"
            >
              نصنع رحلة تعليمية تلهم الأطفال للمستقبل
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-base leading-[1.85] text-[#454545] md:text-lg"
            >
              في منارة نؤمن أن كل طفل يحمل بداخله عبقرياً ينتظر من يُلهمه. نبني
              محتوى تعليمياً يجمع المعرفة بالمتعة في بيئة آمنة وداعمة، لأن
              مستقبل الأمة يبدأ من فصل دراسي مُبدع.
            </motion.p>
          </motion.div>

          <motion.div
            className="relative aspect-5/4 w-full overflow-hidden"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={motionViewport}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={IMG_INTRO}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
              priority
            />
          </motion.div>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <motion.div
            className="relative flex min-h-[300px] flex-col gap-3 lg:h-[420px] lg:min-h-0 lg:flex-row"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={motionViewport}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative min-h-[220px] flex-[1.15] overflow-hidden lg:min-h-0">
              <Image
                src={IMG_STORY_1}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55%"
              />
            </div>
            <div className="flex flex-1 flex-row gap-3 lg:flex-col lg:gap-3">
              <div className="relative min-h-[140px] flex-1 overflow-hidden lg:min-h-0 lg:flex-1">
                <Image
                  src={IMG_STORY_2}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 28%"
                />
              </div>
              <div className="relative min-h-[140px] flex-1 overflow-hidden lg:min-h-0 lg:flex-1">
                <Image
                  src={IMG_STORY_3}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 28%"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="space-y-5 text-right"
            
            initial="hidden"
            whileInView="visible"
            viewport={motionViewport}
            variants={staggerContainer()}
          >
            <motion.div variants={fadeUp}>
              <SectionHeading title="قصتنا" />
            </motion.div>
            <motion.p
              variants={fadeUp}
              className="text-lg font-semibold leading-relaxed text-black md:text-xl"
            >
              من حلم صغير إلى منصة تُغيّر الواقع
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-base leading-[1.85] text-[#454545] md:text-lg"
            >
              بدأت منارة من إيمان عميق بأن التعليم الحقيقي لا يُقاس بعدد
              المعلومات المحفوظة، بل بحجم الشغف الذي تُشعله في قلب طفل. أسسها
              فريق من المربين والمبدعين الذين رأوا فجوة حقيقية بين ما يحتاجه
              الطفل وما تُقدمه البيئة التعليمية التقليدية.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-base leading-[1.85] text-[#454545] md:text-lg"
            >
              اليوم، نخدم أكثر من ١٢٠٠ طفل في المملكة العربية السعودية والوطن
              العربي، نقدم لهم محتوى تعليمياً تفاعلياً يجمع المتعة بالمعرفة في
              بيئة آمنة تُشجع على الاستكشاف والإبداع.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
