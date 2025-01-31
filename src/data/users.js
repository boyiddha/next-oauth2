// Local DATABASE
const users = [
  {
    email: "boyiddha@gmail.com",
    password: "123456",
  },
  {
    email: "atapas@gmail.com",
    password: "123456",
  },
  {
    email: "atapas@gmail.com",
    password: "123456",
  },
];

export const getUserByEmail = (email) => {
  const found = users.find((user) => user.email === email);
  return found;
};
