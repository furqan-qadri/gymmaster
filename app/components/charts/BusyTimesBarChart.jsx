"use client";
import React from "react";
import Chart from "react-apexcharts";

const BusyTimesBarChart = () => {
  const series = [
    {
      name: "Percentage Full",
      data: [60, 55, 65, 70, 75, 70, 65, 60, 55], // Example data showing percentage full at different times
    },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: true,
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
      title: {
        text: "Percentage Full",
      },
      max: 100, // Maximum percentage shown on x-axis
    },
    yaxis: {
      categories: [
        "6-8 AM",
        "8-10 AM",
        "10-12 PM",
        "12-2 PM",
        "2-4 PM",
        "4-6 PM",
        "6-8 PM",
        "8-10 PM",
        "10-12 AM", // Two-hour time slots
      ],
      title: {
        text: "Time of Day",
      },
    },
    fill: {
      opacity: 1,
      colors: ["#FF4560"], // Bar color
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + "%";
        },
      },
    },
    title: {
      text: "Most Busy Times of the Day for the Previous Month",
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

export default BusyTimesBarChart;
