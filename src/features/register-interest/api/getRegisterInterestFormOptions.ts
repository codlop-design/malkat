import { getApplicantTypes } from "@/src/features/register-interest/api/getApplicantTypes";
import { getOrganizationTypes } from "@/src/features/register-interest/api/getOrganizationTypes";
import { getPartnershipTypes } from "@/src/features/register-interest/api/getPartnershipTypes";
import type { RegisterInterestFormOptions } from "@/src/features/register-interest/types";

export async function getRegisterInterestFormOptions(): Promise<RegisterInterestFormOptions> {
  const [applicantTypes, organizationTypes, partnershipTypes] = await Promise.all([
    getApplicantTypes(),
    getOrganizationTypes(),
    getPartnershipTypes(),
  ]);

  return { applicantTypes, organizationTypes, partnershipTypes };
}
