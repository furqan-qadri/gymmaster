"use client";
import React from "react";
import Chart from "react-apexcharts";

const MembershipRetentionChart = () => {
  const series = [75, 80, 85]; // Example retention rates for different categories
  const options = {
    chart: {
      type: "radialBar",
      height: 350,
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "22px",
          },
          value: {
            fontSize: "16px",
            formatter: function (val) {
              return val + "%";
            },
          },
          total: {
            show: true,
            label: "Average",
            formatter: function (w) {
              // By default this function returns the average of all series
              return (
                w.globals.series.reduce((a, b) => a + b, 0) /
                  w.globals.series.length +
                "%"
              );
            },
          },
        },
      },
    },
    labels: ["Month 1", "Month 2", "Month 3"], // Example labels for different months
    colors: ["#FF4560", "#775DD0", "#00E396"], // Different colors for each section
    title: {
      text: "Membership Retention Rate",
      align: "left",
      style: {
        fontSize: "16px",
        color: "#666",
      },
    },
  };

  return (
    <div id="chart">
      <Chart options={options} series={series} type="radialBar" height={350} />
    </div>
  );
};

export default MembershipRetentionChart;
