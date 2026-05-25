"use client";

import { motion } from "framer-motion";

import { fadeUp } from "@/src/lib/motion";

const WHY_CONTACT_REASONS = [
  "تسجيل طفلك في البرنامج",
  "طلب شراكة مؤسسية",
  "استفسارات عامة",
  "اقتراحات وأفكار",
] as const;

export default function ContactWhyCard() {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl bg-primary px-6 py-6 text-white"
    >
      <h2 className="mb-5 text-lg font-bold">لماذا تتواصل معنا؟ 👋</h2>
      <ul className="flex flex-col gap-3">
        {WHY_CONTACT_REASONS.map((reason) => (
          <li
            key={reason}
            className="flex items-center gap-3 text-sm md:text-base"
          >
            <span className="size-2 shrink-0 rounded-full bg-white/80" />
            {reason}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
