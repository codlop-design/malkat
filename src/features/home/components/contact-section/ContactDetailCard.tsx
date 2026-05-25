"use client";

import { motion } from "framer-motion";

import { fadeUp } from "@/src/lib/motion";

import type { ContactDetailItem } from "./types";

type ContactDetailCardProps = {
  item: ContactDetailItem;
};

export default function ContactDetailCard({ item }: ContactDetailCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      className="flex items-center justify-between gap-4 rounded-2xl bg-[#E8F6F4] px-5 py-4"
    >
      <div className="min-w-0 flex-1 text-right">
        <p className="text-sm text-[#454545]">{item.label}</p>
        {item.href ? (
          <a
            href={item.href}
            className="mt-1 block text-base font-medium text-black hover:text-primary"
            dir={item.valueDir}
            {...(item.openInNewTab
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {item.value}
          </a>
        ) : (
          <p className="mt-1 text-base font-medium text-black">{item.value}</p>
        )}
      </div>
      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white">
        <item.icon
          className="size-5 text-primary"
          strokeWidth={1.75}
          aria-hidden
        />
      </div>
    </motion.div>
  );
}
