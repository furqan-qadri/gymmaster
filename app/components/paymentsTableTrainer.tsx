"use client"
import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

const SalaryStatusChart = () => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [salariesData, setSalariesData] = useState([]);
  const router = useRouter();
  const params = useParams();
  const trainerId = params.id;

  useEffect(() => {
    const fetchSalariesData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8090/api/v1/gym/salaries/trainer/${trainerId}`
        );
        if (response.data.success) {
          setSalariesData(response.data.salaries);
        } else {
          console.error(
            "Failed to fetch salaries data:",
            response.data.message
          );
        }
      } catch (error) {
        console.error("Error fetching salaries data:", error);
      }
    };

    fetchSalariesData();
  }, [trainerId]);

  const adjustDate = (months) => {
    setCurrentDate(currentDate.clone().add(months, "months"));
  };

  const salaryMonths = [...Array(6)]
    .map((_, i) => currentDate.clone().subtract(i, "months").format("YYYY-MM"))
    .reverse();

  const salaryStatus = salaryMonths.map((month) => {
    const [year, monthNum] = month.split("-");
    const yearNum = parseInt(year, 10);
    const monthNumber = parseInt(monthNum, 10);

    const salary = salariesData.find(
      (s) => s.salary_month === monthNumber && s.salary_year === yearNum
    );

    return {
      month: `${moment(monthNum, "MM").format("MMMM")} ${year}`,
      isPaid: salary ? salary.payment_date !== null : false,
    };
  });

  return (
    <div
      style={{
        padding: "20px",
        border: "10px solid #ccc",
        borderRadius: "8px",
        maxWidth: "450px",
        margin: "20px auto",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <button
          onClick={() => adjustDate(-6)}
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            fontSize: "20px",
          }}
        >
          &larr;
        </button>
        <h2 style={{ margin: "0" }}>Salaries</h2>
        <button
          onClick={() => adjustDate(6)}
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            fontSize: "20px",
          }}
        >
          &rarr;
        </button>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {salaryStatus.map((status, index) => (
          <div
            key={index}
            style={{
              width: "100px",
              height: "60px",
              backgroundColor: status.isPaid ? "#4CAF50" : "#FFEB3B",
              margin: "5px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: status.isPaid ? "white" : "black",
              fontWeight: "bold",
              fontSize: "14px",
              border: "2px solid #ddd",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              borderRadius: "4px",
            }}
          >
            {status.month.split(" ")[0]}
            <br />
            {status.month.split(" ")[1]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalaryStatusChart;
