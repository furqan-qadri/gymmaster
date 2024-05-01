"use client";
import React from "react";
import { useParams } from "next/navigation";

function page() {
  const params = useParams();
  console.log(params);
  return <div>Trainer ID page {params.id} </div>;
}

export default page;
