"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import NavLinks from "./NavLinks";

type SideMenuProps = {
  menuOpen: boolean;
  closeMenu: () => void;
  pathname: string;
};

export default function SideMenu({
  menuOpen,
  closeMenu,
  pathname,
}: SideMenuProps) {
  return (
    <AnimatePresence>
      {menuOpen && (
        <>
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-60 bg-black/40 md:hidden"
            onClick={closeMenu}
            aria-label="إغلاق القائمة"
          />

          <motion.aside
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="قائمة التنقل"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "tween",
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-y-0 inset-s-0 z-70 flex w-[min(320px,88vw)] flex-col bg-white shadow-[8px_0_32px_rgba(0,0,0,0.12)] md:hidden"
          >
            <div className="flex items-center justify-between border-b border-[#E5E5E5] px-5 py-4">
              <Link href="/" onClick={closeMenu}>
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={100}
                  height={40}
                  className="h-auto w-auto object-contain"
                />
              </Link>
              
              <button
                type="button"
                onClick={closeMenu}
                className="flex size-10 items-center justify-center rounded-full text-[#454545] transition-colors hover:bg-[#F5F5F5]"
                aria-label="إغلاق القائمة"
              >
                <X className="size-6" strokeWidth={1.75} />
              </button>
            </div>

            <NavLinks
              pathname={pathname}
              variant="mobile"
              className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6 text-right"
              onNavigate={closeMenu}
            />

            <div className="border-t border-[#E5E5E5] p-5">
              <Link
                href="/login"
                onClick={closeMenu}
                className="flex w-full items-center justify-center rounded-full bg-(--primary) py-3 text-base font-medium text-white"
              >
                تسجيل الدخول
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
