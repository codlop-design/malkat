"use client";

import { motion } from "framer-motion";

import ContactFAQ from "@/src/features/contact/components/ContactFAQ";
import ContactForm from "@/src/features/contact/components/ContactForm";
import ContactInfo from "@/src/features/contact/components/ContactInfo";
import ContactIntro from "@/src/features/contact/components/ContactIntro";
import ContactSocialLinks from "@/src/features/contact/components/ContactSocialLinks";
import { fadeUp, motionViewport, staggerContainer } from "@/src/lib/motion";

export default function ContactPageContent() {
  return (
    <>
      <ContactIntro />

      <section className="bg-[#FAFAFA] pb-14 md:pb-20">
        <motion.div
          className="container"
          dir="rtl"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={staggerContainer(0.1, 0.05)}
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(280px,1fr)_minmax(0,1.65fr)] lg:items-start">
            <motion.div variants={fadeUp} className="min-w-0">
              <ContactInfo />
            </motion.div>
            <motion.div variants={fadeUp} className="min-w-0">
              <ContactForm />
            </motion.div>
          </div>
        </motion.div>
      </section>

      <ContactSocialLinks />
      <ContactFAQ />
    </>
  );
}
