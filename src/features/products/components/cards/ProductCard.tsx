import Link from "next/link";

type ProductCardProps = {
  href: string;
  title: string;
  children: React.ReactNode;
};

export default function ProductCard({ href, title, children }: ProductCardProps) {
  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
      <Link
        href={href}
        className="absolute inset-0 z-0 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        aria-label={title}
      />
      <div className="relative z-1 flex h-full flex-col pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
        {children}
      </div>
    </article>
  );
}
