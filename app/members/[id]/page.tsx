"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AttendanceCalendar from "@/app/components/attendanceCalendar";
import BasicCard from "@/app/components/basiccard";
import PaymentStatusChart from "@/app/components/paymentsTable";
import SelectedUserProfile from "@/app/components/userProfile";
import { useParams, useRouter } from "next/navigation";

interface MemberDetails {
  member_id: number;
  full_name: string;
  age: number;
  sex: string;
  IC_Passport: string;
  active_status: number;
  phone: string;
  email_id: string;
  address: string;
  sign_up_date: string;
  plan_id: number;
  trainer_id: number | null;
  date_of_birth: string;
}

export default function PostID() {
  const router = useRouter();
  const params = useParams();
  const [memberDetails, setMemberDetails] = useState<MemberDetails | null>(
    null
  );

  useEffect(() => {
    const memberId = params.id as string;
    const fetchMemberDetails = async () => {
      const url = `http://localhost:8090/api/v1/gym/members/${memberId}`;
      try {
        const response = await axios.get(url);
        if (response.data.success && response.data.memberDetails.length > 0) {
          setMemberDetails(response.data.memberDetails[0]);
        }
      } catch (error) {
        console.error("Error fetching member details:", error);
      }
    };

    if (memberId) {
      fetchMemberDetails();
    }
  }, [params.id]);

  if (!memberDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full">
      <div className="flex flex-row gap-4">
        <div className="w-1/3">
          <SelectedUserProfile
            name={memberDetails.full_name}
            phone={memberDetails.phone}
            email={memberDetails.email_id}
            ic={memberDetails.IC_Passport}
            address={memberDetails.address}
            age={memberDetails.age.toString()}
            sex={memberDetails.sex}
            signupdate={new Date(
              memberDetails.sign_up_date
            ).toLocaleDateString()}
          />
        </div>
        <div className="flex flex-col w-2/3 bg-slate-50">
          <div className="flex flex-col xl:flex-row xl:gap-5 gap-2 justify-between mb-10 px-3">
            <BasicCard
              title="Status"
              content={
                memberDetails.active_status === 1 ? "Active" : "Inactive"
              }
            />
            <BasicCard
              title="Trainer"
              content={
                memberDetails.trainer_id
                  ? `${memberDetails.trainer_id}`
                  : "Ahmed Ali"
              }
            />
            <BasicCard title="Next payment" content="July 2024" />
          </div>

          <PaymentStatusChart />
          <div className="flex w-100 items-center justify-center">
            <AttendanceCalendar />
          </div>
        </div>
      </div>
    </div>
  );
}
