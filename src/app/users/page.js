import { fetchClient } from "@/lib/fetch-client";
import { redirect } from "next/navigation";

import { Stopwatch } from "@/components/Stopwatch";

const UserPage = async () => {
  const res = await fetchClient(
    `${process.env.API_SERVER_BASE_URL}/api/users`,
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!res.ok) {
    if (res.status === 403) {
      console.log("Token Expired");
      redirect("/login");
    }
  }

  const users = await res.json();

  //console.log(users);

  return (
    <div>
      <h2>User Page</h2>
      <div>
        <ul>
          <h3>User List</h3>
          {users.map((user) => (
            <li key={user._id}>
              {user?.name}::{user?.email}
            </li>
          ))}
        </ul>
        <hr />
        <hr />
        <Stopwatch />
      </div>
    </div>
  );
};

export default UserPage;
