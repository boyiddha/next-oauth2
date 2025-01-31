import React from "react";
import RegistrationForm from "@/components/RegistrationForm";

import Link from "next/link";

const RegisterPage = () => {
  return (
    <div>
      <RegistrationForm />
      <p className="my-3">
        Already have an account?
        <Link href="/login" style={{ color: "blue", fontSize: "20px" }}>
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
