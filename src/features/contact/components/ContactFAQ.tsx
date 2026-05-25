"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { ContactPageFaq } from "@/src/features/contact/types";
import { fadeUp, motionViewport, staggerContainer } from "@/src/lib/motion";

type ContactFAQProps = {
  faqs?: ContactPageFaq[];
};

export default function ContactFAQ({ faqs = [] }: ContactFAQProps) {
  const [openId, setOpenId] = useState<string | null>(
    faqs.length > 0 ? "0" : null,
  );

  if (faqs.length === 0) return null;

  return (
    <section className="md:py-14 py-10">
      <div className="container">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={motionViewport}
            variants={staggerContainer(0.08, 0.05)}
            className="flex flex-col gap-3"
          >
            <motion.h2
              variants={fadeUp}
              className="mb-2 text-xl font-bold text-black md:text-2xl"
            >
              الأسئلة الشائعة
            </motion.h2>

            {faqs.map((item, index) => {
              const id = String(index);
              const isOpen = openId === id;
              return (
                <motion.div key={id} variants={fadeUp}>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenId((prev) => (prev === id ? null : id))
                    }
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 rounded-2xl bg-[#F5F0E8] px-5 py-4 text-right transition-colors hover:bg-[#EDE6DA]"
                  >
                    <span className="flex-1 text-sm font-medium text-black md:text-base">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`size-5 shrink-0 text-[#454545] transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.25,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-4 pt-2 text-sm leading-relaxed text-[#454545] md:text-base">
                          {item.answer}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            className="relative mx-auto w-full max-w-[420px] lg:max-w-none flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={motionViewport}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image src="/faq.svg" width={420} height={420} alt="FAQ" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
