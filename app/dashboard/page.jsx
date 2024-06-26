"use client";

import React from "react";
import RevenueBarChart from "../components/charts/RevenueBar";
import SignUpBarChart from "../components/charts/SignUpBarChart";
import PieChart from "../components/charts/PieChart";
import GradientLineChart from "../components/charts/GradientLineChart";
import MembershipRetentionChart from "../components/charts/MembershipRetentionChart";
import BusyTimesBarChart from "../components/charts/BusyTimesBarChart";

function Page() {
  return (
    <>
      <div className="bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]">
        <div className="flex justify-around p-10">
          <div className=" bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-lg shadow-lg">
            <h2 className="text-white text-lg">Profit this month</h2>
            <p className="text-white text-xl">14985 MYR</p>
            <p className="text-white">↑ 5%</p>
          </div>

          <div className=" bg-gradient-to-r from-purple-400 to-pink-500 p-6 rounded-lg shadow-lg">
            <h2 className="text-white text-lg">Active members</h2>
            <p className="text-white text-xl">97</p>
            <p className="text-white">↑ 7</p>
          </div>

          <div className=" bg-gradient-to-r from-orange-400 to-red-500 p-6 rounded-lg shadow-lg">
            <h2 className="text-white text-lg">Pending payments</h2>
            <p className="text-white text-xl">75</p>
          </div>

          <div className=" bg-gradient-to-r from-teal-400 to-green-500 p-6 rounded-lg shadow-lg">
            <h2 className="text-white text-lg">Announcements made</h2>
            <p className="text-white text-xl">11</p>
          </div>

          <div className=" bg-gradient-to-r from-gray-400 to-gray-700 p-6 rounded-lg shadow-lg">
            <h2 className="text-white text-lg">Member retention rate</h2>
            <p className="text-white text-xl">67%</p>
            <p className="text-white">↓ 3%</p>
          </div>
        </div>
        <div className="flex flex-grow gap-6">
          <div className="w-1/2">
            <RevenueBarChart />
          </div>
          <div className="w-1/2">
            <SignUpBarChart />
          </div>
        </div>
        <div>
          <h1>Gym Information</h1>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <PieChart
              title="Membership Types"
              labels={["Platinum", "Gold", "Silver"]}
              series={[40, 35, 25]}
              colors={["#FF4560", "#775DD0", "#00E396"]}
            />
            <PieChart
              title="Attendance"
              labels={["Yoga", "Pilates", "Cardio"]}
              series={[55, 30, 15]}
              colors={["#008FFB", "#00E396", "#FEB019"]}
            />
            <PieChart
              title="Equipment Usage"
              labels={["Treadmills", "Weights", "Others"]}
              series={[60, 25, 15]}
              colors={["#00E396", "#775DD0", "#FF4560"]}
            />
          </div>
          <GradientLineChart />
          <MembershipRetentionChart />
          <BusyTimesBarChart />
        </div>
      </div>
    </>
  );
}

export default Page;
