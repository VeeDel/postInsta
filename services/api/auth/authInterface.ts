export interface SendOtpPayload {
  mobile: string;
  country_code: string;
  device_token: string;
  country: string;
  platform_type: string;
}

export interface CheckOtpPayload {
  mobile: string;
  country_code: string;
  otp: string;
}

export interface ResetPasswordPayload {
  email:string;
  password:string;
  cnf_pass:string;

}

export interface CheckVerifiedCodePayload {
  email:string;
  otp: string;
}

export interface EmailCheckOtpPayload {
  email:string;
  otp:string;
}

export interface LoginPayload {
  email:string;
  password:string;
}

export interface VerifyOtpDescopePayload {
  mobile:string;
  otp: string;
}

export interface SocialLoginPayload {
  email: string;
  first_name: string;
  device_token: string;
  platform_type: string;
  profile_pic:string;
}

export interface ResetPasswordPayload {
  email:string;
  password:string;
  cnf_pass:string;
}

export interface ForgotPasswordPayload {
  email:string;
}

export interface emailSendOtpPayload {
  email:string;
  platform_type:string;
}

export interface sendOtpDescopePayload {
  mobile:string;
  country_code:string;
}