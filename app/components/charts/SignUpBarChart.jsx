"use client";
import React from "react";
import Chart from "react-apexcharts";

const SignUpBarChart = () => {
  const series = [
    {
      name: "Sign-Ups",
      data: [50, 70, 90, 120], // Example data showing an increasing trend
    },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Mar 2024", "Apr 2024", "May 2024", "Jun 2024"],
    },
    yaxis: {
      title: {
        text: "Sign-Ups",
      },
    },
    fill: {
      opacity: 1,
      colors: ["#FF5733"], // Different color from the revenue chart
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " sign-ups";
        },
      },
    },
    title: {
      text: "Monthly Sign-Ups Trend",
      align: "left",
      style: {
        fontSize: "16px",
        color: "#666",
      },
    },
  };

  return (
    <div id="chart">
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default SignUpBarChart;
