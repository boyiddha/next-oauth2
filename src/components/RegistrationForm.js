"use client";

import SocialLogins from "./SocialLogins";

import { useRouter } from "next/navigation";

const RegistrationForm = () => {
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);

      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      response.status === 201 && router.push("/");
    } catch (e) {
      console.error(e.message);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Name</label>
          <input type="text" name="name" id="name" />
        </div>
        <br />
        <div>
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" id="email" />
        </div>
        <br />

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>

        <button
          type="submit"
          style={{
            margin: "15px",
            color: "green",
            fontSize: "20px",
            border: "2px solid black",
          }}
        >
          Register
        </button>
      </form>
      <SocialLogins />
    </>
  );
};

export default RegistrationForm;
