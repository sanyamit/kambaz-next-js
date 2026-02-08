"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountNavigation() {
  const pathname = usePathname();

  const linkStyle = (path: string) =>
    pathname === path
      ? "d-block text-dark text-decoration-none border-start border-3 border-dark ps-2 mb-2"
      : "d-block text-danger text-decoration-none ps-2 mb-2";

  return (
    <div id="wd-account-navigation" className="fs-5">

      <Link href="/account/signin" className={linkStyle("/account/signin")}>
        Signin
      </Link>

      <Link href="/account/signup" className={linkStyle("/account/signup")}>
        Signup
      </Link>

      <Link href="/account/profile" className={linkStyle("/account/profile")}>
        Profile
      </Link>

    </div>
  );
}
