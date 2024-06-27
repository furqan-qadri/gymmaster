import React, { useState, useEffect } from "react";
import moment from "moment"; // Ensure moment is installed using npm install moment
import axios from "axios"; // Ensure axios is installed using npm install axios
import { useParams, useRouter } from "next/navigation";

const PaymentStatusChart = () => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [paymentsData, setPaymentsData] = useState([]);
  const router = useRouter();
  const params = useParams();
  const memberId = params.id;

  useEffect(() => {
    const fetchPaymentsData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8090/api/v1/gym/payments/member/${memberId}`
        );
        if (response.data.success) {
          setPaymentsData(response.data.payments);
        } else {
          console.error(
            "Failed to fetch payments data:",
            response.data.message
          );
        }
      } catch (error) {
        console.error("Error fetching payments data:", error);
      }
    };

    fetchPaymentsData();
  }, [memberId]);

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
    const payment = paymentsData.find(
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
