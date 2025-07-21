export interface SendOtpPayload {
  mobile_number: string;
  country_code: string;
  device_token: string;
  login_type: string;
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