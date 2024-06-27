"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AttendanceCalendar from "@/app/components/attendanceCalendar"; // Assuming trainers also have attendance records
import BasicCard from "@/app/components/basiccard";
import PaymentStatusChart from "@/app/components/paymentsTableTrainer"; // Assuming trainers have payment statuses to monitor
// import SelectedUserProfile from "@/app/components/userProfile";
import SelectedUserProfile from "@/app/components/userProfileTrainer";
import { useParams, useRouter } from "next/navigation"; // Correcting the import for `next/router`

interface TrainerDetails {
  trainer_id: number;
  full_name: string;
  age: number;
  sex: string;
  IC_Passport: string;
  active_status: number;
  phone: string;
  email_id: string;
  address: string;
  sign_up_date: string;
  specialization: string; // Assuming trainers have a field for their area of expertise
  date_of_birth: string;
}

export default function TrainerProfile() {
  const router = useRouter();
  const params = useParams();
  const [trainerDetails, setTrainerDetails] = useState<TrainerDetails | null>(
    null
  );

  useEffect(() => {
    const trainerId = params.id as string;
    const fetchTrainerDetails = async () => {
      const url = `http://localhost:8090/api/v1/gym/trainers/${trainerId}`;
      try {
        const response = await axios.get(url);
        if (response.data.success && response.data.trainerDetails.length > 0) {
          setTrainerDetails(response.data.trainerDetails[0]);
        }
      } catch (error) {
        console.error("Error fetching trainer details:", error);
      }
    };

    if (trainerId) {
      fetchTrainerDetails();
    }
  }, [params.id]);

  if (!trainerDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full">
      <div className="flex flex-row gap-4">
        <div className="w-1/3">
          <SelectedUserProfile
            name={trainerDetails.full_name}
            phone={trainerDetails.phone}
            email={trainerDetails.email_id}
            ic={trainerDetails.IC_Passport}
            address={trainerDetails.address}
            age={trainerDetails.age.toString()}
            sex={trainerDetails.sex}
            signupdate={new Date(
              trainerDetails.sign_up_date
            ).toLocaleDateString()}
          />
        </div>
        <div className="flex flex-col w-2/3 bg-slate-50">
          <div className="flex flex-col xl:flex-row xl:gap-5 gap-2 justify-between mb-10 px-3">
            <BasicCard
              title="Status"
              content={
                trainerDetails.active_status === 1 ? "Active" : "Inactive"
              }
            />
            <BasicCard
              title="Specialization"
              content={trainerDetails.specialization}
            />
            <BasicCard
              title="Date of Birth"
              content={new Date(
                trainerDetails.date_of_birth
              ).toLocaleDateString()}
            />
          </div>

          <PaymentStatusChart />
        </div>
      </div>
    </div>
  );
}
