import React from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
  scales: {
    y: {
      title: {
        display: true,
        text: "Submissions",
        font: {
          size: 15,
        },
      },
    },
    x: {
      title: {
        display: true,
        text: "Week",
        font: {
          size: 15,
        },
      },
    },
  },
}

function makeData(frequency) {
  const labels = []
  const data = []
  if (frequency) {
    for (let i = 1; i <= Object.keys(frequency).length; ++i) {
      labels.push(i)
      data.push(frequency[i])
    }
  }
  return {
    labels,
    datasets: [
      {
        label: "Submissions",
        data,
        borderColor: "#0ea5e9",
        backgroundColor: "#0ea5e9",
      },
    ],
  }
}

export default function WeekChart({ data }) {
  return <Line options={options} data={makeData(data)} />
}
