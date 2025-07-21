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
// import { useRouter } from "next/router";

type SignInProps = {
  onClick: () => void;
  onResetPassword: () => void;
};

const SignIn = ({ onClick, onResetPassword }: SignInProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const idTooltip = useId();

  //   const router = useRouter();
  const verifyOtp = async () => {
    try {
      const res = await axios.post(
        "https://poshinsta.ogoul.com/api/check_otp",
        {
          mobile: "4673974998",
          country_code: "+1",
          otp: "1234",
        }
      );

      const token = res.data.token;
      useAuthStore.getState().setToken(token); // ✅ Save token
      router?.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form action="" onSubmit={(e) => e.preventDefault()}>
      <Field
        className={styles.field}
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <div className={styles.field}>
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
      </div>
      <div className={styles.btns}>
        <button onClick={verifyOtp} className={cn("button", styles.button)}>
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
