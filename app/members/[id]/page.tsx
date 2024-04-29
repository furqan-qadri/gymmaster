"use client";
import SelectedUserProfile from "@/app/components/userProfile";
import { useParams } from "next/navigation";

export default function PostID() {
  const params = useParams();
  console.log(params);
  return (
    <div className="w-full">
      Post {params.id}
      <div className="flex flex-row gap-4 ">
        <div className=" w-1/3">
          {" "}
          <SelectedUserProfile />
        </div>
        <div className="flex flex-col w-2/3 bg-slate-50"></div>
      </div>
    </div>
  );
}
