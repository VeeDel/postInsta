"use client";

import { useState, useRef, useEffect } from "react";
import Image from "@/components/Image";
import styles from "./EntryScreen.module.sass";

const avatars = [
  "/images/avatar-1.png",
  "/images/avatar-2.png",
  "/images/avatar-3.png",
  "/images/avatar-4.png",
  "/images/avatar-5.png",
  "/images/avatar-6.png",
];

const OTPEntry = ({ onBack, onVerify }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus on first input when component mounts
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    // Only allow numeric values
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 4) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onVerify(otpValue);
    }, 1000);
  };

  const handleResendOTP = () => {
    setOtp(["", "", "", ""]);
    inputRefs.current[0]?.focus();
    // Add your resend OTP logic here
  };

  return (
    <div className={styles.login}>
      <div className={styles.background}>
        <div className={styles.stars}>
          <Image src="/images/stars.svg" width={1132} height={396} alt="" />
        </div>
        <Image src="/images/bg-entry.png" fill alt="" />
      </div>
      <div className={styles.inner}>
        <div className={styles.body}>
          <div className={styles.bodyInner}>
            <div className={styles.lines}>
              <div className={styles.line}>
                <Image
                  src="/images/entry-lines-left.svg"
                  width={401}
                  height={256}
                  alt=""
                />
              </div>
              <div className={styles.line}>
                <Image
                  src="/images/entry-lines-right.svg"
                  width={401}
                  height={256}
                  alt=""
                />
              </div>
            </div>
            <div className={styles.logo}>
              <Image src="/images/star.svg" width={24} height={24} alt="" />
            </div>
            <div className={styles.title}>Enter OTP</div>

            <div className={styles.otpContainer}>
              <div className={styles.otpText}>
                Please enter the 4-digit code sent to your email
              </div>

              <div className={styles.otpInputs}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={styles.otpInput}
                  />
                ))}
              </div>

              <button
                onClick={handleVerify}
                disabled={otp.join("").length !== 4 || isLoading}
                className={styles.verifyButton}
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </button>

              <div className={styles.otpActions}>
                <button
                  onClick={handleResendOTP}
                  className={styles.resendButton}
                >
                  Resend OTP
                </button>
                <button onClick={onBack} className={styles.backButton}>
                  Back to Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.foot}>
          <div className={styles.text}>
            Join over <span>2M</span> global social media users
          </div>
          <div className={styles.avatars}>
            {avatars.map((avatar, index) => (
              <div key={index} className={styles.avatar}>
                <Image src={avatar} width={40} height={40} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPEntry;
