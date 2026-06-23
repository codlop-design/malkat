import { Clock, Globe, Users } from "lucide-react";

import type { ProductDetailMeta } from "@/src/features/products/data/productDetail";

type SessionMetaProps = {
  session?: ProductDetailMeta["sessionMeta"];
};

export default function SessionMeta({ session }: SessionMetaProps) {
  if (!session) return null;

  return (
    <ul className="mt-5 flex flex-col gap-2 text-sm text-[#454545]">
      <li className="flex items-center gap-2">
        <Clock className="size-4 text-primary" strokeWidth={1.5} />
        مدة الجلسة: {session.duration}
      </li>
      <li className="flex items-center gap-2">
        <Globe className="size-4 text-primary" strokeWidth={1.5} />
        نوع الجلسة: {session.sessionType}
      </li>
      <li className="flex items-center gap-2">
        <Users className="size-4 text-primary" strokeWidth={1.5} />
        المستهدف: {session.target}
      </li>
    </ul>
  );
}
