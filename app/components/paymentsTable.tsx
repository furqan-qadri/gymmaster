// src/components/PaymentStatusChart.js

import React, { useState } from "react";
import moment from "moment"; // Ensure moment is installed using npm install moment

// Mock data simulating payment records from the database
const mockPaymentsData = [
  {
    payment_id: 1,
    member_id: 101,
    month: "October",
    year: 2023,
    is_paid: true,
  },
  {
    payment_id: 2,
    member_id: 101,
    month: "September",
    year: 2023,
    is_paid: false,
  },
  { payment_id: 3, member_id: 101, month: "August", year: 2023, is_paid: true },
  { payment_id: 4, member_id: 101, month: "July", year: 2023, is_paid: false },
  { payment_id: 5, member_id: 101, month: "June", year: 2023, is_paid: true },
  { payment_id: 6, member_id: 101, month: "May", year: 2023, is_paid: false },
  { payment_id: 7, member_id: 101, month: "April", year: 2023, is_paid: true },
  { payment_id: 8, member_id: 101, month: "March", year: 2024, is_paid: false },
  {
    payment_id: 8,
    member_id: 101,
    month: "January",
    year: 2024,
    is_paid: true,
  },
  {
    payment_id: 9,
    member_id: 101,
    month: "February",
    year: 2024,
    is_paid: true,
  },
];

const PaymentStatusChart = () => {
  const [currentDate, setCurrentDate] = useState(moment());

  // Function to adjust the current date back and forth
  const adjustDate = (months) => {
    setCurrentDate(currentDate.clone().add(months, "months"));
  };

  // Generate the last 6 months based on current date
  const months = [...Array(6)]
    .map((_, i) =>
      currentDate.clone().subtract(i, "months").format("MMMM YYYY")
    )
    .reverse();

  // Find payment status for each month
  const paymentStatus = months.map((month) => {
    const payment = mockPaymentsData.find(
      (p) => `${p.month} ${p.year}` === month
    );
    return {
      month,
      isPaid: payment ? payment.is_paid : false,
    };
  });

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
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
        <h2 style={{ margin: "0" }}>Payments</h2>
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
        {paymentStatus.map((status, index) => (
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
            {status.month.split(" ")[1]} {/* Display month and year */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentStatusChart;
