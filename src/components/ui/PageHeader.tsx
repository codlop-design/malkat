"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Fragment } from "react";

import {
  fadeUp,
  motionViewport,
  staggerContainer,
} from "@/src/lib/motion";

export type PageHeaderBreadcrumb = {
  label: string;
  href?: string;
};

type PageHeaderProps = {
  title: string;
  breadcrumbs: PageHeaderBreadcrumb[];
};

export default function PageHeader({ title, breadcrumbs }: PageHeaderProps) {
  return (
    <section className="relative h-[340px]" >
      <Image
        src="/bg-header.png"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />

      <div className="absolute top-1/2 left-0 flex h-full w-full -translate-y-1/2 items-center justify-center">
        <motion.div
          className="container flex flex-col items-center justify-center gap-3 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={staggerContainer()}
        >
          <motion.h1
            variants={fadeUp}
            className="text-4xl font-bold text-black"
          >
            {title}
          </motion.h1>

          <motion.nav
            variants={fadeUp}
            aria-label="مسار التصفح"
            className="text-sm text-black md:text-base"
          >
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
              {breadcrumbs.map((item, i) => (
                <Fragment key={`${item.label}-${i}`}>
                  {i > 0 ? (
                    <span className="select-none text-black" aria-hidden>
                      &gt;&gt;
                    </span>
                  ) : null}
                  <span className="inline-flex">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="transition-colors hover:underline"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className="text-black" aria-current="page">
                        {item.label}
                      </span>
                    )}
                  </span>
                </Fragment>
              ))}
            </div>
          </motion.nav>
        </motion.div>
      </div>
    </section>
  );
}
