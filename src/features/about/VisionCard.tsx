import type { ReactNode } from "react";

export type VisionCardProps = {
  label: string;
  lead: string;
  body?: string;
  bullets: string[];
  icon: ReactNode;
};

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-3 text-right">
      {items.map((line) => (
        <li
          key={line}
          className="flex items-start gap-3 leading-relaxed text-white/95"
        >
          <span
            className="mt-2 size-5 shrink-0 rounded-full bg-[#00B6C633] flex items-center justify-center"
            aria-hidden
          >
            <span className="size-2 shrink-0 block rounded-full bg-[#00B6C6]" />
          </span>
          <span>{line}</span>
        </li>
      ))}
    </ul>
  );
}

export default function VisionCard({
  label,
  lead,
  body,
  bullets,
  icon,
}: VisionCardProps) {
  return (
    <article
      className="rounded-[20px] bg-linear-to-b from-primary to-[#0F3D40] p-8 text-white shadow-sm md:p-10"
      
    >
      <div className="flex justify-center flex-col items-center gap-4">
        <div
          className="flex size-[56px] shrink-0 items-center justify-center rounded-xl bg-white ring-1 ring-white/20"
          aria-hidden
        >
          {icon}
        </div>
        <p className="text-sm font-medium text-white/90 md:text-base">
          {label}
        </p>
        <div className="min-w-0 flex-1 space-y-4 text-right">
          <h3 className="text-xl font-bold leading-snug text-white md:text-2xl">
            {lead}
          </h3>
          {body ? (
            <p className="text-[15px] leading-[1.9] text-white/92 md:text-base">
              {body}
            </p>
          ) : null}
          {bullets.length > 0 ? <BulletList items={bullets} /> : null}
        </div>
      </div>
    </article>
  );
}
