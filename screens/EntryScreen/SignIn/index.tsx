"use client";
import { useState } from "react";
import Link from "next/link";
import cn, { Value } from "classnames";
import Field from "@/components/Field";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import styles from "./SignIn.module.sass";
import { sendOtp } from "services/api/auth/auth.ts";
import { SendOtpPayload } from "services/api/auth/authInterface";

type SignInProps = {
  onClick: () => void;
  onResetPassword: () => void;
  setOtp: (value: boolean) => void;
  mobileNumber: string;
  setMobilenumber: (value: string) => void;
  setCountryCode: (Value: string) => void;
  countryCode: string;
};

const SignIn = ({
  onClick,
  onResetPassword,
  setOtp,
  mobileNumber,
  setMobilenumber,
  setCountryCode,
  countryCode,
}: SignInProps) => {
  const [loading, setLoading] = useState(false);

  const SendOtp = async () => {
    setLoading(true);
    try {
      const payload: SendOtpPayload = {
        mobile: mobileNumber.toString(),
        country_code: countryCode,
        device_token: "",
        country: "",
        platform_type: "",
      };
      const response = await sendOtp(payload);
      console.log("OTP sent successfully:", response);
      if (response?.status === "success") {
        setOtp(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form action="" onSubmit={(e) => e.preventDefault()}>
      <div className={styles.fieldGroup}>
        <div className={styles.field} style={{ width: "35%" }}>
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className={styles.select}
          >
            <option value="+1">🇺🇸 +1</option>
            <option value="+91">🇮🇳 +91</option>
            <option value="+44">🇬🇧 +44</option>
            <option value="+971">🇦🇪 +971</option>
            {/* Add more as needed */}
          </select>
        </div>
        <Field
          className={styles.field}
          placeholder="Mobile number"
          type="text"
          value={mobileNumber}
          onChange={(e) =>
            setMobilenumber(e.target.value.replace(/[^0-9]/g, ""))
          }
          required
        />
      </div>

      <div className={styles.btns}>
        <button
          disabled={loading}
          onClick={SendOtp}
          className={cn("button", styles.button)}
        >
          Sign in
        </button>
        <Link className={cn("button", styles.button)} href="/">
          <Image src="/images/google.svg" width={24} height={24} alt="" />
          Sign in with Google
        </Link>
      </div>

      <div className={styles.foot}>
        <div className={styles.text}>
          Don’t have an account?{" "}
          <button className={styles.link} onClick={onClick}>
            Sign up
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignIn;
