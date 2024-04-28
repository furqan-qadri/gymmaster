import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

export default async function Header() {
    const {userId} = auth();
    
  return (
    <div className="bg-gray-600 text-neutral-100 flex px-6">
      <div className="container mx-auto items-center justify-between py-4">
        <Link href="/"> Home</Link>
      </div>
      <div className="flex gap-8 items-center xl:min-w-[175px]">
        {userId ? <div>
            <UserButton/>
            {/* redirecting to landing page when it is ready */}
            {/* <UserButton afterSignOutUrl="/dashboard"/> */}

        </div> : <div className="flex gap-4 xl:min-w-[175]">
        <Link href="/sign-up">Sign up</Link>
        <Link href="/sign-in">Sign in</Link>
            </div>}
      
      </div>
    </div>
  );
}
