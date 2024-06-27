import React, { useState } from "react";
import moment from "moment"; // Ensure moment is installed using npm install moment

// Mock data simulating payment records from the database
const mockPaymentsData = [
  {
    payment_id: 1,
    member_id: 101,
    payment_month: 10,
    payment_year: 2023,
    is_paid: true,
  },
  {
    payment_id: 144,
    member_id: 101,
    payment_month: 1,
    payment_year: 2024,
    is_paid: true,
  },
  {
    payment_id: 2,
    member_id: 101,
    payment_month: 9,
    payment_year: 2023,
    is_paid: false,
  },
  {
    payment_id: 3,
    member_id: 101,
    payment_month: 8,
    payment_year: 2023,
    is_paid: true,
  },
  {
    payment_id: 4,
    member_id: 101,
    payment_month: 7,
    payment_year: 2023,
    is_paid: false,
  },
  {
    payment_id: 5,
    member_id: 101,
    payment_month: 6,
    payment_year: 2023,
    is_paid: true,
  },
  {
    payment_id: 6,
    member_id: 101,
    payment_month: 5,
    payment_year: 2023,
    is_paid: false,
  },
  {
    payment_id: 7,
    member_id: 101,
    payment_month: 4,
    payment_year: 2023,
    is_paid: true,
  },
  {
    payment_id: 8,
    member_id: 101,
    payment_month: 3,
    payment_year: 2024,
    is_paid: false,
  },
  {
    payment_id: 9,
    member_id: 101,
    payment_month: 3,
    payment_year: 2024,
    is_paid: false,
  },
  {
    payment_id: 10,
    member_id: 101,
    payment_month: 1,
    payment_year: 2024,
    is_paid: true,
  },
  {
    payment_id: 11,
    member_id: 101,
    payment_month: 2,
    payment_year: 2024,
    is_paid: true,
  },
];

const PaymentStatusChart = () => {
  const [currentDate, setCurrentDate] = useState(moment());

  // Function to adjust the current date back and forth by months
  const adjustDate = (months: number) => {
    setCurrentDate(currentDate.clone().add(months, "months"));
  };

  // Generate the last 6 months based on current date
  const paymentMonths = [...Array(6)]
    .map((_, i) => currentDate.clone().subtract(i, "months").format("YYYY-MM"))
    .reverse();

  // Find payment status for each month
  const paymentStatus = paymentMonths.map((month) => {
    const [year, monthNum] = month.split("-");
    const payment = mockPaymentsData.find(
      (p) =>
        p.payment_month === parseInt(monthNum, 10) &&
        p.payment_year === parseInt(year, 10)
    );
    return {
      month: `${moment(monthNum, "MM").format("MMMM")} ${year}`, // Convert month number back to name for display
      isPaid: payment ? payment.is_paid : false,
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
            {status.month.split(" ")[1]}{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentStatusChart;
