"use client";
import React from "react";
import Chart from "react-apexcharts";

const RevenueBarChart = () => {
  const series = [
    {
      name: "Revenue",
      data: [8145, 9087, 9690, 9340],
    },
  ];

  const options = {
    title: {
      text: "Past three months revenue trend",
      align: "left",
      style: {
        fontSize: "16px",
        color: "#666",
      },
    },
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
        text: "Revenue (MYR)",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " MYR";
        },
      },
    },
  };

  return (
    <div id="chart">
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default RevenueBarChart;
