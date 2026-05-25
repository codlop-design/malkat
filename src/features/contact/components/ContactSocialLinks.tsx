"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { SVGProps } from "react";

import type { SiteSettingsSocialMedia } from "@/src/features/contact/types";
import { fadeUp, motionViewport, staggerContainer } from "@/src/lib/motion";

type ContactSocialLinksProps = {
  social?: SiteSettingsSocialMedia;
};

type SocialId = "tiktok" | "x" | "instagram" | "facebook";

type IconProps = SVGProps<SVGSVGElement>;

function SocialSvg({ className, children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "size-8"}
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  );
}

function TikTokIcon(props: IconProps) {
  return (
    <SocialSvg {...props}>
      <path
        d="M12.668 29.3332C17.0862 29.3332 20.668 25.7514 20.668 21.3332V10.9937C22.0021 12.0632 23.5988 12.8187 25.346 13.1481C25.8132 13.2362 26.0467 13.2803 26.3349 13.2058C26.6773 13.1173 27.0576 12.802 27.208 12.4819C27.3346 12.2125 27.3346 11.9194 27.3346 11.3332C27.3346 10.7217 27.3346 10.4159 27.2679 10.2129C27.1574 9.87703 27.0616 9.74715 26.7733 9.54242C26.599 9.41872 26.1874 9.29152 25.364 9.03712C23.2669 8.38916 21.612 6.73422 20.964 4.63714C20.7096 3.81377 20.5824 3.40209 20.4587 3.22789C20.254 2.93956 20.1241 2.84375 19.7882 2.73326C19.5852 2.6665 19.2795 2.6665 18.668 2.6665C18.0467 2.6665 17.7361 2.6665 17.4911 2.768C17.1644 2.90332 16.9048 3.16289 16.7695 3.48959C16.668 3.73462 16.668 4.04525 16.668 4.6665V21.3332C16.668 23.5423 14.8771 25.3332 12.668 25.3332C10.4588 25.3332 8.66797 23.5423 8.66797 21.3332C8.66797 19.819 9.50932 18.5013 10.75 17.8221C11.6715 17.3177 12.1322 17.0655 12.2612 16.9408C12.5155 16.6951 12.5271 16.6755 12.6206 16.3345C12.668 16.1614 12.668 15.8854 12.668 15.3332C12.668 14.7661 12.668 14.4826 12.5323 14.2053C12.3769 13.8877 11.9532 13.5583 11.607 13.4861C11.3048 13.423 11.0993 13.4754 10.6882 13.58C7.22749 14.4611 4.66797 17.5982 4.66797 21.3332C4.66797 25.7514 8.24969 29.3332 12.668 29.3332Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SocialSvg>
  );
}

function XIcon(props: IconProps) {
  return (
    <SocialSvg {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.10964 3.54475C3.2806 3.21039 3.62448 3 4 3H10.6667C10.9878 3 11.2893 3.1542 11.4774 3.41451L18.0587 12.5271L27.2929 3.29289C27.6834 2.90237 28.3166 2.90237 28.7071 3.29289C29.0976 3.68342 29.0976 4.31658 28.7071 4.70711L19.2448 14.1694L28.8107 27.4145C29.0306 27.7189 29.0613 28.1209 28.8904 28.4553C28.7194 28.7896 28.3755 29 28 29H21.3333C21.0122 29 20.7107 28.8458 20.5227 28.5855L13.9413 19.4729L4.70711 28.7071C4.31659 29.0976 3.68342 29.0976 3.2929 28.7071C2.90237 28.3166 2.90237 27.6834 3.2929 27.2929L12.7552 17.8306L3.18932 4.58549C2.96946 4.28106 2.93868 3.8791 3.10964 3.54475ZM5.95576 5L21.8446 27H26.0443L10.1554 5H5.95576Z"
        fill="currentColor"
      />
    </SocialSvg>
  );
}

function InstagramIcon(props: IconProps) {
  return (
    <SocialSvg {...props}>
      <path
        d="M22.148 2.31567H9.85325C5.66377 2.31567 2.31641 5.66304 2.31641 9.85252V22.1683C2.31641 26.3367 5.66377 29.7051 9.85325 29.7051H22.169C26.3375 29.7051 29.7059 26.3578 29.7059 22.1683V9.85252C29.6848 5.66304 26.3375 2.31567 22.148 2.31567ZM27.2848 21.0736C27.2848 24.4841 24.5059 27.3051 21.0532 27.3051H10.948C7.53746 27.3051 4.71641 24.5262 4.71641 21.0736V10.9473C4.71641 7.53673 7.49535 4.71567 10.948 4.71567H21.1164C24.5269 4.71567 27.348 7.49462 27.348 10.9473V21.0736H27.2848Z"
        fill="currentColor"
      />
      <path
        d="M20.9908 11.0736L20.9276 11.0105L20.8645 10.9473C19.5592 9.64206 17.8118 8.92627 16.0013 8.92627C12.1276 8.94732 8.99077 12.1263 9.01182 16C9.01182 17.8736 9.76972 19.6631 11.075 20.9894C12.3802 22.3157 14.1487 23.0526 16.0013 23.0526C19.896 22.9894 23.0118 19.7263 22.9487 15.7894C22.9066 14.0421 22.2329 12.3368 20.9908 11.0736ZM16.0013 20.6526C13.4329 20.6947 11.3487 18.6315 11.3066 16.0631C11.2645 13.4947 13.3276 11.4105 15.896 11.3684C18.4645 11.3263 20.5487 13.3894 20.5908 15.9578V16.021C20.5908 18.5263 18.5276 20.6105 16.0013 20.6526Z"
        fill="currentColor"
      />
      <path
        d="M25.0324 8.61048C25.0324 9.5368 24.3166 10.2947 23.3903 10.2947C22.9482 10.2947 22.5271 10.1263 22.2324 9.81048C21.5797 9.15785 21.5797 8.06311 22.2745 7.41048C22.5903 7.09469 22.9903 6.92627 23.4324 6.92627C23.8113 6.92627 24.1903 7.07364 24.485 7.30522L24.5271 7.34732C24.5903 7.38943 24.6324 7.45258 24.6745 7.49469L24.7166 7.5368C24.885 7.83153 25.0324 8.21048 25.0324 8.61048Z"
        fill="currentColor"
      />
    </SocialSvg>
  );
}

function FacebookIcon(props: IconProps) {
  return (
    <SocialSvg {...props}>
      <path
        d="M18 2h-4a6 6 0 0 0-6 6v4H4v6h4v10h6V18h5l1-6h-6V8a2 2 0 0 1 2-2h4V2z"
        fill="currentColor"
      />
    </SocialSvg>
  );
}

const SOCIAL_ICONS: Record<SocialId, (props: IconProps) => React.JSX.Element> = {
  tiktok: TikTokIcon,
  x: XIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
};

function buildSocialLinks(
  social?: SiteSettingsSocialMedia,
): { id: SocialId; label: string; href: string }[] {
  if (!social) return [];

  const links: { id: SocialId; label: string; href: string }[] = [];

  if (social.instagram) {
    links.push({ id: "instagram", label: "Instagram", href: social.instagram });
  }
  if (social.facebook) {
    links.push({ id: "facebook", label: "Facebook", href: social.facebook });
  }
  if (social.x) {
    links.push({ id: "x", label: "X", href: social.x });
  }
  if (social.tiktok) {
    links.push({ id: "tiktok", label: "TikTok", href: social.tiktok });
  }

  return links;
}

export default function ContactSocialLinks({ social }: ContactSocialLinksProps) {
  const links = buildSocialLinks(social);

  if (links.length === 0) return null;
  return (
    <section className="bg-white py-12 md:py-16">
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
          className="mt-8 flex flex-wrap items-center justify-center gap-5"
        >
          {links.map(({ id, label, href }) => {
            const Icon = SOCIAL_ICONS[id];
            return (
              <li key={id}>
                <Link
                  href={href}
                  aria-label={label}
                  className="flex size-14 items-center justify-center rounded-full bg-primary text-white transition-opacity hover:opacity-90"
                >
                  <Icon className="size-8" />
                </Link>
              </li>
            );
          })}
        </motion.ul>
      </motion.div>
    </section>
  );
}
