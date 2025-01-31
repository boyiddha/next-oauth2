"use client";

import SocialLogins from "./SocialLogins";

import { doCredentialLogin } from "@/app/actions";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);

      const response = await doCredentialLogin(formData);

      if (!!response.error) {
        console.error(response.error);
        setError(response.error.message);
      } else {
        router.push("/home");
        //router.push("products");
      }
    } catch (e) {
      console.error(e);
      setError("Check your Credentials");
    }
  }

  return (
    <>
      <div style={{ color: "red" }}>{error}</div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" id="email" />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>

        <button type="submit">Credentials Login</button>
        <hr />
      </form>
      <br />
      <div>
        <Link href="/forgot-password" style={{ marginLeft: "40px" }}>
          Forgot Password
        </Link>
      </div>
      <SocialLogins />
    </>
  );
};

export default LoginForm;
