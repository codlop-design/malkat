export type AuthUser = {
  id: number;
  name: string;
  phone_code: string;
  phone: string;
  full_phone: string;
  email: string;
  is_active: boolean;
  policies_accepted: boolean;
};

export type LoginResult = {
  success: boolean;
  message: string;
  user?: AuthUser;
};

export type SendOtpResult = {
  success: boolean;
  message: string;
  verificationToken?: string;
};

export type VerifyOtpResult = {
  success: boolean;
  message: string;
  user?: AuthUser;
};

export type PasswordResetSendResult = {
  success: boolean;
  message: string;
  verificationToken?: string;
};

export type PasswordResetVerifyResult = {
  success: boolean;
  message: string;
  resetToken?: string;
};

export type PasswordResetResetResult = {
  success: boolean;
  message: string;
};
