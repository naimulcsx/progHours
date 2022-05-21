import React, { useEffect, useState } from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"
import { getStats } from "../../../api/dashboard"
import { useQuery } from "react-query"
import ReactApexChart from "react-apexcharts"

ChartJS.register(ArcElement, Tooltip, Legend)

const makeData = (data) => {
  let labels = []
  if (data) {
    labels = Object.keys(data.verdict_count)
    data = Object.keys(data.verdict_count).map((el) => data.verdict_count[el])
  }
  return {
    labels,
    datasets: [
      {
        label: "# of Votes",
        data,
        backgroundColor: [
          "#34d399", //AC
          "#f87171", //WA
          "#f472b6", //RTE
          "rgba(75, 192, 192, 0.2)", //MLE
          "#fbbf24", //TLE
        ],
      },
    ],
  }
}

export default function VerdictChart({ data }) {
  const series = [
    {
      name: "series1",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
  ]
  const options = {
    chart: {
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
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z",
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  }

  return (
    <ReactApexChart
      options={options as any}
      series={series}
      type="area"
      height={350}
    />
  )
}
