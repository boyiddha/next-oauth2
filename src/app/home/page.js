import Image from "next/image";
import LoginForm from "@/components/LoginForm";
import Logout from "@/components/Logout";
import { auth } from "@/auth";

import { redirect } from "next/navigation";
import Link from "next/link";

const HomePage = async () => {
  // console.log("HOME PAGE....................................................");
  const session = await auth();

  if (!session?.user) redirect("/");

  return (
    <div>
      {session?.user?.name && session?.user?.image ? (
        <>
          <h1>Welcome, {session?.user?.name}</h1>
          <Image
            src={session?.user?.image}
            alt={session?.user?.name}
            width={72}
            height={72}
          />
        </>
      ) : (
        <h1>Welcome, {session?.user?.email}</h1>
      )}
      <Logout />
      <br />
      <hr />

      <p>
        <Link href="/products" style={{ color: "red" }}>
          All Products
        </Link>
      </p>
    </div>
  );
};

export default HomePage;
