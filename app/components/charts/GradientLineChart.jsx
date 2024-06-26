"use client";
import React from "react";
import Chart from "react-apexcharts";

const GradientLineChart = () => {
  const series = [
    {
      name: "Revenue",
      data: [8145, 9087, 9690, 9340, 9200, 8700, 9400, 9900], // Combined data for previous and forecast months
    },
  ];

  const options = {
    chart: {
      type: "line",
      height: 350,
    },
    stroke: {
      curve: "smooth",
      dashArray: [0, 5, 5, 5], // Solid line for previous months, dotted line for forecast
    },
    xaxis: {
      categories: [
        "Mar 2024",
        "Apr 2024",
        "May 2024",
        "Jun 2024", // Previous months
        "Jul 2024",
        "Aug 2024",
        "Sep 2024",
        "Oct 2024", // Forecast months
      ],
    },
    yaxis: {
      title: {
        text: "Revenue (MYR)",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#FDD835"],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " MYR";
        },
      },
    },
    title: {
      text: "Monthly Revenue and Forecast for 2024",
      align: "left",
      style: {
        fontSize: "16px",
        color: "#666",
      },
    },
  };

  return (
    <div id="chart">
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default GradientLineChart;
