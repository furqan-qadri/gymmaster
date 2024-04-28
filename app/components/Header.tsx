import Link from "next/link";
import React from "react";

function Header() {
  return (
    <div className="bg-gray-600 text-neutral-100 flex px-6">
      <div className="container mx-auto items-center justify-between py-4">
        <Link href="/"> Home</Link>
      </div>
      <div className="flex gap-8 items-center xl:min-w-[175px]">
        <Link href="/sign-up">Sign up</Link>
        <Link href="/sign-in">Sign in</Link>
      </div>
    </div>
  );
}

export default Header;
