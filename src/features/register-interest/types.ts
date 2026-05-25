export interface ApplicantType {
  key: string;
  label: string;
}

export interface LookupOption {
  id: number;
  title: string;
}

export interface RegisterInterestFormOptions {
  applicantTypes: ApplicantType[];
  organizationTypes: LookupOption[];
  partnershipTypes: LookupOption[];
}
