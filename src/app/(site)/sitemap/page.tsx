import Link from "next/link";

import PageHeader from "@/src/components/PageHeader";
import { collectSitemapSections } from "@/src/lib/sitemap/collectSitemapData";

export const revalidate = 3600;

export default async function SitemapPage() {
  const sections = await collectSitemapSections();

  return (
    <>
      <PageHeader
        title="خريطة الموقع"
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "خريطة الموقع" },
        ]}
      />
      <section className="pb-16 pt-8">
        <div className="container" dir="rtl">
          <p className="mb-10 text-sm leading-relaxed text-[#454545] md:text-base">
            تصفّح جميع صفحات المنصة. يتم تحديث هذه القائمة تلقائياً من المحتوى
            المنشور.
          </p>

          <div className="flex flex-col gap-10">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="mb-4 text-lg font-bold text-black md:text-xl">
                  {section.title}
                </h2>
                <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-[#454545] transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
