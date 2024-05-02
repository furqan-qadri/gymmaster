"use client";
import React from "react";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  router.push("/members");
  return <div></div>;
}

export default Page;
