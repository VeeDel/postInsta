"use client";

import React, { useState } from "react";
import styles from "./OtpVerify.module.sass";
import { useRouter } from "next/navigation";
import { checkOtp } from "services/api/auth/auth.ts";
import { useAuthStore } from "@/store/authStore/authStore";
type OtpVerifyProps = {
  mobileNumber: string;
};

const OtpVerify = ({ mobileNumber }: OtpVerifyProps) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    const nextInput = document.getElementById(`otp-${index + 1}`);
    if (value && nextInput) (nextInput as HTMLInputElement).focus();
  };

  const VerifyOtp = async () => {
    setLoading(true);
    try {
      const response = await checkOtp({
        mobile: mobileNumber,
        country_code: "+1",
        otp: otp.join(""),
      });
      if (response?.status === "success") {
        console.log("OTP verified successfully:", response);
        // Redirect to dashboard or next step
        const token = response.token;
        useAuthStore.getState().setToken(token); // ✅ Save token
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>OTP Verification</h2>
      <p className={styles.subtitle}>
        Enter the 4-digit code sent to your mobile
      </p>

      <div className={styles.otpContainer}>
        {otp.map((digit, i) => (
          <input
            key={i}
            id={`otp-${i}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            className={styles.otpInput}
          />
        ))}
      </div>

      <button
        disabled={loading}
        onClick={VerifyOtp}
        className={styles.verifyButton}
      >
        Verify OTP
      </button>
    </div>
  );
};

export default OtpVerify;
