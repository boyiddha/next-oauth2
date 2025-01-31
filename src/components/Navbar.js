import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import Logout from "./Logout";

import { CircleUserRound } from "lucide-react";

const Navbar = async () => {
  const session = await auth();
  const loggedInUser = session?.user;
  console.log("session data from navbar dynamics ===================  ");
  console.log(loggedInUser);
  const id = loggedInUser?.id;

  return (
    <header style={{ display: "flex", marginLeft: "50px" }}>
      <Link href="/">
        <h1>Product App</h1>
      </Link>
      <nav style={{ marginLeft: "50px" }}>
        <ul>
          {id ? (
            <li>
              <Link href="/dashboard">
                {session?.user?.image ? (
                  <Image
                    src={session?.user?.image}
                    alt={session?.user?.name}
                    width={25}
                    height={25}
                  />
                ) : (
                  <CircleUserRound />
                )}
              </Link>
              <span>|</span>
              <Logout />
            </li>
          ) : (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
