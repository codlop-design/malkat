import Link from "next/link";

export const navLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "من نحن", href: "/about" },
  { label: "المنتجات", href: "/products" },
  { label: "الخدمات", href: "/services" },
  { label: "الأخبار", href: "/news" },
  { label: "تواصل معنا", href: "/contact" },
];

export function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

type NavLinksProps = {
  pathname: string;
  className?: string;
  onNavigate?: () => void;
  variant?: "desktop" | "mobile";
};

export default function NavLinks({
  pathname,
  className,
  onNavigate,
  variant = "desktop",
}: NavLinksProps) {
  return (
    <nav className={className}>
      {navLinks.map((link) => {
        const isActive = isActivePath(pathname, link.href);

        if (variant === "mobile") {
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              aria-current={isActive ? "page" : undefined}
              className={`rounded-xl px-4 py-3.5 text-base transition-colors ${
                isActive
                  ? "bg-[#E8F6F4] font-bold text-(--primary)"
                  : "font-medium text-[#454545] hover:bg-[#FAFAFA]"
              }`}
            >
              {link.label}
            </Link>
          );
        }

        return (
          <Link
            href={link.href}
            key={link.href}
            onClick={onNavigate}
            className="p-3"
            aria-current={isActive ? "page" : undefined}
          >
            <span
              className={`inline-block border-b-2 pb-1 text-base ${
                isActive
                  ? "border-(--primary) font-bold text-black"
                  : "border-transparent font-medium text-[#454545]"
              }`}
            >
              {link.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
