"use client";

import { motion } from "framer-motion";

import PartnershipBenefits from "@/src/features/partnership-request/components/PartnershipBenefits";
import PartnershipForm from "@/src/features/partnership-request/components/PartnershipForm";
import PartnershipIntro from "@/src/features/partnership-request/components/PartnershipIntro";
import type { PartnershipPageData } from "@/src/features/partnership-request/types";
import type { LookupOption } from "@/src/features/register-interest/types";
import { fadeUp, motionViewport } from "@/src/lib/motion";

type PartnershipPageContentProps = {
  content: PartnershipPageData;
  organizationTypes: LookupOption[];
  partnershipTypes: LookupOption[];
};

export default function PartnershipPageContent({
  content,
  organizationTypes,
  partnershipTypes,
}: PartnershipPageContentProps) {
  return (
    <>
      <PartnershipIntro section={content.start} />

      <section className="bg-white pb-14 pt-4 md:pb-20 md:pt-6">
        <motion.div
          className="container"
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          variants={fadeUp}
        >
          <PartnershipForm
            organizationTypes={organizationTypes}
            partnershipTypes={partnershipTypes}
          />
        </motion.div>
      </section>

      <PartnershipBenefits section={content.whyUs} />
    </>
  );
}
