"use client";

import { ChevronsLeft, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

import {
  fadeUp,
  motionViewport,
  staggerContainer,
} from "@/src/lib/motion";

const contactTypes = [
  "تسجيل طفل في البرنامج",
  "طلب شراكة مؤسسية",
  "استفسار عام",
  "اقتراح أو فكرة",
];

const contactDetails = [
  {
    label: "البريد الإلكتروني",
    value: "hello@nabda.sa",
    href: "mailto:hello@nabda.sa",
    icon: Mail,
  },
  {
    label: "الهاتف",
    value: "+966501234567",
    href: "tel:+966501234567",
    icon: Phone,
  },
  {
    label: "الموقع",
    value: "الرياض، المملكة العربية السعودية",
    icon: MapPin,
  },
];

const whyContactReasons = [
  "تسجيل طفلك في البرنامج",
  "طلب شراكة مؤسسية",
  "استفسارات عامة",
  "اقتراحات وأفكار",
];

const inputClassName =
  "w-full rounded-xl border border-[#E5E5E5] bg-white px-4 py-3 text-sm text-black outline-none transition-colors placeholder:text-[#9CA3AF] focus:border-primary";

function RequiredLabel({ children }: { children: string }) {
  return (
    <label className="mb-2 block text-sm font-medium text-black">
      {children}
      <span className="text-red-500"> *</span>
    </label>
  );
}

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    toast.success("تم إرسال رسالتك بنجاح");
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <section className="bg-[#FAFAFA] py-16">
      <div className="container">
        <motion.div
          className="mx-auto mb-12 max-w-2xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={staggerContainer(0.1, 0)}
        >
          <motion.h1
            variants={fadeUp}
            className="text-3xl font-bold text-black md:text-4xl"
          >
            تواصل معنا
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-3 text-base text-[#454545] md:text-lg"
          >
            نحن نحب أن نسمع منك
          </motion.p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <motion.div
            className="flex flex-col gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={motionViewport}
            variants={staggerContainer(0.1, 0.1)}
          >
            {contactDetails.map((item) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                className="flex items-center justify-between gap-4 rounded-2xl bg-[#E8F6F4] px-5 py-4"
              >
                <div className="min-w-0 flex-1 text-right">
                  <p className="text-sm text-[#454545]">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="mt-1 block text-base font-medium text-black hover:text-primary"
                      dir="ltr"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-base font-medium text-black">
                      {item.value}
                    </p>
                  )}
                </div>
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white">
                  <item.icon
                    className="size-5 text-primary"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </div>
              </motion.div>
            ))}

            <motion.div
              variants={fadeUp}
              className="rounded-2xl bg-primary px-6 py-6 text-white"
            >
              <h2 className="mb-5 text-lg font-bold">
                لماذا تتواصل معنا؟ 👋
              </h2>
              <ul className="flex flex-col gap-3">
                {whyContactReasons.map((reason) => (
                  <li
                    key={reason}
                    className="flex items-center gap-3 text-sm md:text-base"
                  >
                    <span className="size-2 shrink-0 rounded-full bg-white/80" />
                    {reason}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={motionViewport}
            variants={fadeUp}
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl bg-white p-6 shadow-[0_4px_32px_rgba(0,0,0,0.06)] md:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <RequiredLabel>الاسم الكامل</RequiredLabel>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="اسمك الكريم"
                    className={inputClassName}
                  />
                </div>
                <div>
                  <RequiredLabel>البريد الإلكتروني</RequiredLabel>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="example@email.com"
                    className={inputClassName}
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="mt-5">
                <RequiredLabel>نوع التواصل</RequiredLabel>
                <select
                  name="contactType"
                  required
                  defaultValue=""
                  className={`${inputClassName} appearance-none bg-size-[16px] bg-position-[left_1rem_center] bg-no-repeat`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23454545' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                  }}
                >
                  <option value="" disabled>
                    اختر نوع التواصل
                  </option>
                  {contactTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-5">
                <RequiredLabel>رسالتك</RequiredLabel>
                <textarea
                  name="message"
                  required
                  rows={6}
                  placeholder="أخبرنا عن طفلك، مؤسستك، أو أي استفسار تريد..."
                  className={`${inputClassName} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-primary py-3.5 text-base font-medium text-white transition-opacity hover:opacity-95 disabled:opacity-70"
              >
                {isSubmitting ? "جاري الإرسال..." : "إرسال الرسالة"}
                <span className="flex size-8 items-center justify-center rounded-full bg-white/20">
                  <ChevronsLeft className="size-4" strokeWidth={2.5} />
                </span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
