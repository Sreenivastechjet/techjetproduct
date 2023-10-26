import React from "react";
import {
  Chart as ChartJs,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJs.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Chart() {
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        lebel: "36",
        data: [50, 75, 20, 90, 11, 80, 10, 70, 5, 95, 15, 10],
        borderWidth: 0.5,
        borderColor: "black",
        backgroundColor: "#3D5A80",
        barThickness: 20,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
    scales: {
      x: {
        title: {
          display: true,
        //   text: "Months",
          color: "black", // Change the title color
          font: {
            size: 16, // Adjust the title font size
          },
        },
        grid: {
          display: false, // Hide the x-axis grid lines
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
        //   text: "Data",
          color: "black", // Change the title color
          font: {
            size: 16, // Adjust the title font size
          },
        },
        grid: {
          color: "lightgray", // Change the color of the y-axis grid lines
        },
      },
    },
    responsive: true,
  };
  return (
    <div className=""> 
      <Bar data={data} options={options}></Bar>
    </div>
  );
}

export default Chart;
