"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "الرئيسية", href: "/" },
  { label: "من نحن", href: "/about" },
  { label: "المنتجات", href: "/products" },
  { label: "الخدمات", href: "/services" },
  { label: "الأخبار", href: "/news" },
  { label: "تواصل معنا", href: "/contact" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white py-6 sticky top-0 z-50">
      <div className="container">
        <div className="flex justify-between items-center">
          <div className="flex items-center justify-between">
            <div className="flex item-center gap-12">
              <Image
                src="/logo.png"
                alt="Logo"
                width={120}
                height={48}
                className="w-auto h-auto object-contain"
              />

              <nav className="flex items-center gap-3">
                {links.map((link) => {
                  const isActive = isActivePath(pathname, link.href);

                  return (
                    <Link
                      href={link.href}
                      key={link.href}
                      className="p-3"
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span
                        className={`inline-block text-base pb-1 border-b-2 ${
                          isActive
                            ? "font-bold text-black border-(--primary)"
                            : "font-medium text-[#454545] border-transparent"
                        }`}
                      >
                        {link.label}
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="bg-(--primary) text-white px-4 py-2.5 rounded-full"
            >
              تسجيل الدخول
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
