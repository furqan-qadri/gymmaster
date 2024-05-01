"use client";
import AttendanceCalendar from "@/app/components/attendanceCalendar";
import BasicCard from "@/app/components/basiccard";
import PaymentStatusChart from "@/app/components/paymentsTable";
import SelectedUserProfile from "@/app/components/userProfile";
import { useParams } from "next/navigation";

export default function TrainerIDPage() {
  const params = useParams();
  console.log(params);
  return (
    <div className="w-full">
      Post {params.id}
      <div className="flex flex-row gap-4 ">
        <div className=" w-1/3">
          {" "}
          <SelectedUserProfile
            name="Mohammad Amir bin Mazlan"
            phone="0109876676"
            email="muhammadamirtyb@gmail.com"
            ic="T4673878"
            address="Residensi UTMKL, No. 8, Jalan Maktab, Kampung Datuk Keramat, 54100 Kuala Lumpur, Malaysia"
            age="24"
            sex="Male"
            signupdate="24-04-2024"
          />
        </div>
        <div className="flex flex-col w-2/3 bg-slate-50">
          <div className="flex flex-col xl:flex-row xl:gap-5 gap-2 justify-between mb-10 px-3">
            <BasicCard title="Status" content="Active" />
            <BasicCard title="Member associated" content="38" />
            <BasicCard title="Last Salary paid" content="March 2024" />
          </div>
          <div className="mb-2 font-bold">Trainer Salary </div>
          <PaymentStatusChart />
          <div className="mb-2 font-bold">Trainer Attendance </div>
          <div className="flex w-100 items-center justify-center">
            <div className="flex w-1/2 items-center justify-center">
              <AttendanceCalendar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
