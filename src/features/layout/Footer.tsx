"use client";

import { useSettings } from "@/src/features/settings";

export default function Footer() {
  const settings = useSettings();
  const siteTitle = settings?.title?.trim() || "المنصة";

  return (
    <footer className="bg-white pt-[88px]">
      <div className="flex min-h-[60px] flex-col items-center justify-center gap-1 border-t border-[#d9d9d9] px-4 py-3 text-center text-[13px] font-medium text-black shadow-[0_4px_14px_rgba(0,0,0,0.08)]">
        <p>جميع الحقوق محفوظة لدى {siteTitle}.</p>
        <p>
          صنع بكل حب <span className="text-red-600">❤</span> لدي شركة{" "}
          <a
            href="https://codlop.sa"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-red-600 transition-opacity hover:opacity-80"
          >
            Codlop
          </a>
        </p>
      </div>
    </footer>
  );
}
