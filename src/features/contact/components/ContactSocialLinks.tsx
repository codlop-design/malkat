"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

import { SOCIAL_LINKS } from "@/src/features/contact/data/contact";
import { fadeUp, motionViewport, staggerContainer } from "@/src/lib/motion";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.77 1.52V6.76a4.85 4.85 0 0 1-1-.07z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function SnapchatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.582.203 1.988.96 2.99 1.04 1.308.106 1.655.794 1.653 1.358-.002.607-.44 1.114-1.006 1.206-.66.115-1.6.35-2.036 1.24-.17.34-.246.85-.34 1.447l-.018.115c-.09.56-.2 1.25-.55 1.76-.64.97-1.93 1.28-3.52 1.28-.31 0-.63-.02-.95-.05-.45-.05-.9-.12-1.35-.12-.45 0-.9.07-1.35.12-.32.03-.64.05-.95.05-1.59 0-2.88-.31-3.52-1.28-.35-.51-.46-1.2-.55-1.76l-.018-.115c-.094-.597-.17-1.107-.34-1.447-.436-.89-1.376-1.125-2.036-1.24-.566-.092-1.004-.599-1.006-1.206-.002-.564.345-1.252 1.653-1.358 1.002-.08 2.408-.837 2.99-1.04-.008-.165-.018-.33-.03-.51l-.003-.06c-.104-1.628-.23-3.654.299-4.847C7.853 1.07 11.21.793 12.206.793z" />
    </svg>
  );
}

const SOCIAL_ICONS = {
  tiktok: TikTokIcon,
  x: XIcon,
  instagram: Instagram,
  snapchat: SnapchatIcon,
} as const;

export default function ContactSocialLinks() {
  return (
    <section className="bg-[#FAFAFA] py-12 md:py-16">
      <motion.div
        className="container"
        dir="rtl"
        initial="hidden"
        whileInView="visible"
        viewport={motionViewport}
        variants={staggerContainer()}
      >
        <motion.h2
          variants={fadeUp}
          className="text-center text-xl font-bold text-black md:text-2xl"
        >
          مواقع التواصل الإجتماعي
        </motion.h2>
        <motion.ul
          variants={fadeUp}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          {SOCIAL_LINKS.map(({ id, label, href }) => {
            const Icon = SOCIAL_ICONS[id as keyof typeof SOCIAL_ICONS];
            const isLucide = id === "instagram";
            return (
              <li key={id}>
                <Link
                  href={href}
                  aria-label={label}
                  className="flex size-12 items-center justify-center rounded-full bg-(--primary) text-white transition-opacity hover:opacity-90 md:size-14"
                >
                  {isLucide ? (
                    <Icon className="size-5 md:size-6" strokeWidth={1.75} />
                  ) : (
                    <Icon className="size-5 md:size-6" />
                  )}
                </Link>
              </li>
            );
          })}
        </motion.ul>
      </motion.div>
    </section>
  );
}
