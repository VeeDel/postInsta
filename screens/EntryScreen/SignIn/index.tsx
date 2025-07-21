"use client";
import { useState, useId } from "react";
import Link from "next/link";
import cn from "classnames";
import { Tooltip } from "react-tooltip";
import Field from "@/components/Field";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import styles from "./SignIn.module.sass";
import { useAuthStore } from "@/store/authStore/authStore";
import axios from "axios";
import { sendOtp } from "services/api/auth/auth.ts";
import { useRouter } from "next/navigation";

type SignInProps = {
  onClick: () => void;
  onResetPassword: () => void;
  setOtp: () => void;
  mobileNumber: string;
  setMobilenumber: (value: string) => void;
};

const SignIn = ({
  onClick,
  onResetPassword,
  setOtp,
  mobileNumber,
  setMobilenumber,
}: SignInProps) => {
  // const [password, setPassword] = useState("");
  // const idTooltip = useId();

  // const router = useRouter();
  const [loading, setLoading] = useState(false);

  const SendOtp = async () => {
    setLoading(true);
    try {
      const response = await sendOtp({
        mobile: mobileNumber,
        country_code: "+1",
      });
      console.log("OTP sent successfully:", response);
      if (response?.status === "success") {
        // Show OTP entry screen
        setOtp(true);
      }
      // Handle success, e.g., show a success message or navigate to OTP verification page
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form action="" onSubmit={(e) => e.preventDefault()}>
      <Field
        className={styles.field}
        placeholder="Mobile number "
        type="text"
        value={mobileNumber}
        onChange={(e) =>
          //only allow numbers and limit to 10 digits
          setMobilenumber(e.target.value.replace(/[^0-9]/g, ""))
        }
        required
      />
      {/* <div className={styles.field}>
        <Field
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className={styles.reset}
          onClick={onResetPassword}
          data-tooltip-id={idTooltip}
          data-tooltip-content="Reset password"
          data-tooltip-place="top-end"
        >
          <Icon name="question" />
        </button>
        <Tooltip id={idTooltip} />
      </div> */}
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
