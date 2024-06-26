"use client";
import React from "react";
import Chart from "react-apexcharts";

const PieChart = ({ title, labels, series, colors }) => {
  const options = {
    chart: {
      type: "pie",
      height: 350,
    },
    labels: labels,
    colors: colors,
    title: {
      text: title,
      align: "left",
      style: {
        fontSize: "16px",
        color: "#666",
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div id="chart">
      <Chart options={options} series={series} type="pie" height={350} />
    </div>
  );
};

export default PieChart;
