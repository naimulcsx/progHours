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
import ReactApexChart from "react-apexcharts"

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
  console.log(data)
  const series = [
    {
      name: "series1",
      data: Object.keys(data).map((el) => data[el]),
    },
  ]
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "text",
      categories: Object.keys(data).map((el) => `Week ${el}`),
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
    title: {
      text: "Number of problems solved by week",
      floating: false,
      margin: 10,
      offsetY: 0,
      align: "center",
      style: {
        fontWeight: 600,
        color: "#444",
      },
    },
  }
  return (
    <ReactApexChart
      options={options as any}
      series={series}
      type="area"
      height={320}
    />
  )
}
