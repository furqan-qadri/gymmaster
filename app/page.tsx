"use client";
import React from "react";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  router.push("/dashboard");
  return <div></div>;
}

export default Page;
