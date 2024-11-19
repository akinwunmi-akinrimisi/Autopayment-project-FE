// src/components/BarChart.js
import React from "react";
import Chart from "react-apexcharts";

const BarChart = () => {
  const chartData = {
    series: [
      {
        name: "Green",
        data: [2.81, 2.81, 2.81, 2.81],
      },
      {
        name: "Blue",
        data: [3.58, 3.58, 3.58, 3.58],
      },
      {
        name: "White",
        data: [4.38, 4.38, 4.38, 4.38],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: "70%",
          distributed: false,
          dataLabels: {
            position: "top", // Show labels on top
          },
        },
      },
      colors: ["#6CB9AD", "#324DDD", "#ffffff"], // Matching the green, blue, and white
      dataLabels: {
        enabled: true,
        formatter: (val) => val.toFixed(2),
        offsetY: 10,
        offsetX: 3,
        style: {
          fontSize: "15px",
          colors: ["#fff", "#fff",  "#000000"],
        
        },
      },
      stroke: {
        show: true,
        width: 10,
        colors: ['#143869']
      },
      xaxis: {
        categories: ["Label", "Label", "Label", "Label"], // Repeat categories
        labels: {
          style: {
            colors: ["#ffffff"],
            fontSize: "14px",
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: ["#ffffff"], // White text
            fontSize: "14px",
          },
        },
        title: {
          text: "Units of Measure",
          style: {
            color: "#ffffff",
            fontSize: "16px",
          },
        },
      },
      grid: {
        borderColor: "#243a5e",
        strokeDashArray: 5, // Subtle gridlines
      },
      tooltip: {
        theme: "dark",
      },
      legend: {
        show: false, // Hides the legend
      },
    },
  };

  return (
    <div style={{  paddingLeft: "20px", borderRadius: "10px" }}>
      <Chart options={chartData.options} series={chartData.series} type="bar" height={350} />
    </div>
  );
};

export default BarChart;
