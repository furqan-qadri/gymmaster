"use client";
import AttendanceCalendar from "@/app/components/attendanceCalendar";
import PaymentStatusChart from "@/app/components/paymentsTable";
import PaymentsList from "@/app/components/paymentsTable";
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
        <div className="flex flex-col w-2/3 bg-slate-50">
          <div className="flex flex-col xl:flex-row xl:gap-5 gap-2 justify-between mb-10 px-3">
            <div className="rounded-lg p-5 pr-24 bg-slate-100 ">
              <div className="mb-2 font-bold">Status</div>
              <div className="text-2xl font-bold">Active</div>
            </div>
            <div className="rounded-lg p-5 pr-24 bg-slate-100 ">
              <div className="mb-2 font-bold">Trainer</div>
              <div className="text-2xl font-bold ">Amir Ali</div>
            </div>
            <div className="rounded-lg p-5 pr-24 bg-slate-100 ">
              <div className="mb-2 font-bold">Last payment</div>
              <div className="text-2xl font-bold">Apr 2024</div>
            </div>
          </div>

          <PaymentStatusChart />
          <AttendanceCalendar />
        </div>
      </div>
    </div>
  );
}
