"use client";

import { motion } from "framer-motion";

import PartnershipBenefits from "@/src/features/partnership-request/components/PartnershipBenefits";
import PartnershipForm from "@/src/features/partnership-request/components/PartnershipForm";
import PartnershipIntro from "@/src/features/partnership-request/components/PartnershipIntro";
import { fadeUp, motionViewport } from "@/src/lib/motion";

export default function PartnershipPageContent() {
  return (
    <>
      <PartnershipIntro />

      <section className="bg-white pb-14 pt-4 md:pb-20 md:pt-6">
        <motion.div
          className="container"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={fadeUp}
        >
          <PartnershipForm />
        </motion.div>
      </section>

      <PartnershipBenefits />
    </>
  );
}
