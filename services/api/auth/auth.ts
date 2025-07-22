import { axiosInstance } from "../axiosInstance";
import { CheckOtpPayload, CheckVerifiedCodePayload, EmailCheckOtpPayload, emailSendOtpPayload, ForgotPasswordPayload, LoginPayload, ResetPasswordPayload, sendOtpDescopePayload, SendOtpPayload, SocialLoginPayload, VerifyOtpDescopePayload } from './authInterface';

// send Otp:---
export const sendOtp = async (payload: SendOtpPayload) => {
  const response = await axiosInstance.post("/api/send_otp", payload);
  return response.data;
};

// Check Opt:---
export const verifyOtp = async (payload: CheckOtpPayload) => {
  const response = await axiosInstance.post("/api/verify_otp");
  return response.data;
};

// Reset Password:---
export const resetPassword = async (payload: ResetPasswordPayload) => {
  const response = await axiosInstance.post("/api/reset_pass");
  return response.data;
};

// Check Verified Code:---
export const checkVerifiedCode = async (payload: CheckVerifiedCodePayload) => {
  const response = await axiosInstance.post("/api/check_verified_code");
  return response.data;
};

// Email Check Otp:---
export const emailCheckOtp = async (payload: EmailCheckOtpPayload) => {
  const response = await axiosInstance.post("/api/email_check_otp");
  return response.data;
};

// Login:---
export const login = async (payload: LoginPayload) => {
  const response = await axiosInstance.post("/api/login");
  return response.data;
};

// Verify Otp Descope :---
export const VerifyOtpDescope = async (payload: VerifyOtpDescopePayload) => {
  const response = await axiosInstance.post("/api/verifyotp");
  return response.data;
};

// Social Login :---
export const SocialLogin = async (payload: SocialLoginPayload) => {
  const response = await axiosInstance.post("/api/social_login");
  return response.data;
};

// Reset Password :---
export const ResetPassword = async (payload: ResetPasswordPayload) => {
  const response = await axiosInstance.post("/api/reset_pass");
  return response.data;
};

// Forgot Password :---
export const ForgotPassword = async (payload: ForgotPasswordPayload) => {
  const response = await axiosInstance.post("/api/forgot_pass");
  return response.data;
};

// Email Send Otp :---
export const emailSendOtp = async (payload: emailSendOtpPayload) => {
  const response = await axiosInstance.post("/api/email_send_otp");
  return response.data;
};

// Send Otp Descope :---
export const sendOtpDescope = async (payload: sendOtpDescopePayload) => {
  const response = await axiosInstance.post("/api/sendotp");
  return response.data;
};