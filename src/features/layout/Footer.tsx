"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Facebook, Instagram, Linkedin } from "lucide-react";
import { useState } from "react";

type FooterLink = { label: string; href: string };

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

const quickLinks: FooterLink[] = [
  { label: "الرئيسية", href: "/" },
  { label: "من نحن", href: "/about" },
  { label: "المنتجات", href: "/products" },
  { label: "الأخبار", href: "/news" },
  { label: "تواصل معنا", href: "/contact" },
];

const educationalLinks: FooterLink[] = [
  { label: "الكتب", href: "/books" },
  { label: "الأنشطة", href: "/activities" },
  { label: "الدورات", href: "/courses" },
  { label: "أخبارنا", href: "/news" },
];

const supportLinks: FooterLink[] = [
  { label: "سجل اهتمامك", href: "/register-your-interest" },
  { label: "اطلب خدمة", href: "/request-service" },
  { label: "اطلب شراكة", href: "/request-partnership" },
  { label: "تواصل معنا", href: "/contact" },
  { label: "سياسة الخصوصية", href: "/privacy" },
  { label: "الشروط والأحكام", href: "/terms" },
];

const columns: FooterColumn[] = [
  { title: "روابط سريعة", links: quickLinks },
  { title: "المحتوى التعليمي", links: educationalLinks },
  { title: "الدعم", links: supportLinks },
];

const socialLinks = [
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "TikTok", href: "#", icon: TikTokIcon },
  { label: "Facebook", href: "#", icon: Facebook },
];

const legalLinks: FooterLink[] = [
  { label: "الشروط والأحكام", href: "/terms" },
  { label: "سياسة الخصوصية", href: "/privacy" },
  { label: "خريطة الموقع", href: "/sitemap" },
];

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.77 1.52V6.76a4.85 4.85 0 0 1-1-.07z" />
    </svg>
  );
}

function FooterColumnBlock({ title, links }: FooterColumn) {
  const [open, setOpen] = useState(false);
  const panelId = `footer-panel-${title.replace(/\s+/g, "-")}`;

  return (
    <div className="border-b border-[#E5E5E5] lg:border-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between py-4 text-right lg:pointer-events-none lg:cursor-default lg:py-0"
      >
        <h3 className="text-base font-bold text-black">{title}</h3>
        <ChevronDown
          className={`size-5 shrink-0 text-[#454545] transition-transform duration-300 lg:hidden ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      </button>

      <ul
        id={panelId}
        className={`flex-col gap-3 lg:mt-4 lg:flex ${
          open ? "mt-1 flex pb-4" : "hidden lg:flex"
        }`}
      >
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              className="text-sm text-[#454545] transition-colors hover:text-(--primary)"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-white pt-14 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 gap-0 md:grid-cols-2 md:gap-10 lg:grid-cols-4 lg:gap-8">
          <div className="mb-6 flex flex-col gap-5 md:mb-0">
            <Link href="/" className="inline-flex w-fit mx-auto md:mx-0">
              <Image
                src="/logo.png"
                alt="منصة التعلم"
                width={160}
                height={48}
                className="h-auto w-auto object-contain"
              />
            </Link>

            <p className="max-w-xs text-sm leading-relaxed text-[#454545] text-start md:text-start mx-auto md:mx-0">
              منصة التعلم العربية الأولى. نمكن المتعلمين في كل مكان من الوصول
              لأفضل التعليم.
            </p>

            <div className="flex items-center md:justify-start justify-center gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-full bg-(--primary) text-white transition-opacity hover:opacity-90"
                >
                  {Icon === TikTokIcon ? (
                    <Icon className="size-5" />
                  ) : (
                    <Icon className="size-5" strokeWidth={1.75} />
                  )}
                </a>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <FooterColumnBlock key={column.title} {...column} />
          ))}
        </div>

        <div className="mt-12 border-t border-[#E5E5E5] pt-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <nav className="flex flex-wrap items-center justify-center gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#454545] transition-colors hover:text-(--primary)"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <p className="text-sm text-[#454545]">
              جميع الحقوق محفوظة لدى منصة التعلم @2026.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
