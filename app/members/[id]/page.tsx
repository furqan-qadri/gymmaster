"use client";
import { useParams } from "next/navigation";

export default function PostID() {
  const params = useParams();
  console.log(params);
  return <main>Post {params.id}</main>;
}
