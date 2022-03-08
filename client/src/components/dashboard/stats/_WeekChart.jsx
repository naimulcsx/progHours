import React from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Chart.js Bar Chart - Stacked",
    },
  },
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
}

const labels = ["January", "February", "March", "April", "May", "June", "July"]

export const data = {
  labels,
  datasets: [
    {
      label: "AC",
      data: [1, 2, 3, 4, 5, 6, 7],
      backgroundColor: "#a3e635",
      stack: "Stack 0",
    },
    {
      label: "TLE",
      data: [1, 2, 3, 4, 5, 6, 7],
      backgroundColor: "#fbbf24",
      stack: "Stack 0",
    },
    {
      label: "WA",
      data: [1, 2, 3, 4, 5, 6, 7],
      backgroundColor: "#f87171",
      stack: "Stack 0",
    },
    {
      label: "RTE",
      data: [1, 2, 3, 4, 5, 6, 7],
      backgroundColor: "#f472b6",
      stack: "Stack 0",
    },
  ],
}

export default function WeekChart() {
  return <Bar options={options} data={data} />
}
