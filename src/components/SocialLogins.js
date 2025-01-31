import { doSocialLogin } from "@/app/actions";

const SocialLogins = () => {
  return (
    <form action={doSocialLogin}>
      <button
        type="submit"
        name="action"
        value="google"
        style={{
          margin: "20px",
          color: "red",
          fontSize: "25px",
          border: "2px solid red",
        }}
      >
        {" "}
        Sign In With Google
      </button>
      <button
        type="submit"
        name="action"
        value="github"
        style={{
          margin: "20px",
          color: "green",
          fontSize: "25px",
          border: "2px solid green",
        }}
      >
        Sign In With GitHub
      </button>
    </form>
  );
};

export default SocialLogins;
