import Link from "next/link";

export default function Landing() {
  return (
    <>
      <div>Landing Page</div>
      <div>
        <Link href="/products" style={{ color: "blue" }}>
          All Products main page
        </Link>

        <Link href="/users">All Users</Link>
      </div>
    </>
  );
}
