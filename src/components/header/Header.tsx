"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import NavLinks from "./NavLinks";
import SideMenu from "./SideMenu";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    if (menuOpen) {
      setMenuOpen(false);
    }
  }

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, closeMenu]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white py-6">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 md:gap-12">
                <button
                  type="button"
                  className="flex size-10 cursor-pointer items-center justify-center md:hidden"
                  onClick={() => setMenuOpen(true)}
                  aria-label="فتح القائمة"
                  aria-expanded={menuOpen}
                  aria-controls="mobile-menu"
                >
                  <Image
                    src="/menu.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="h-auto w-auto object-contain"
                    aria-hidden
                  />
                </button>

                <Link href="/">
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    width={120}
                    height={48}
                    className="h-auto w-auto object-contain"
                  />
                </Link>

                <NavLinks
                  pathname={pathname}
                  className="hidden items-center gap-3 md:flex"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="rounded-full bg-(--primary) px-4 py-2.5 text-white"
              >
                تسجيل الدخول
              </Link>
            </div>
          </div>
        </div>
      </header>

      <SideMenu
        menuOpen={menuOpen}
        closeMenu={closeMenu}
        pathname={pathname}
      />
    </>
  );
}
