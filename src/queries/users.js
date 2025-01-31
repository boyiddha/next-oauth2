import { User } from "@/model/user-model";

export async function createUser(user) {
  try {
    await User.create(user);
  } catch (e) {
    throw new Error(e);
  }
}

export async function getUserByEmail(email) {
  const user = await User.findOne({ email: email }).select("-password").lean(); // return only email not password// protected info even though you are authenticated
  return user;
}

export async function fetchUsers() {
  const users = await User.findMany({
    select: {
      _id: true,
      name: true, // Select name
      email: true, // Select email
      password: false, // Exclude password
    },
  });
  return users;
}
