import React, { useEffect, useState } from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"
import { getStats } from "../../../api/dashboard"
import { useQuery } from "react-query"
import ReactApexChart from "react-apexcharts"

ChartJS.register(ArcElement, Tooltip, Legend)

function stringToColour(str: string) {
  str = str + "_"
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  let colour = "#"
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff
    colour += ("00" + value.toString(16)).substr(-2)
  }
  return colour
}

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

export default function TagsChart({ data }) {
  const state = {
    series: [
      {
        name: "Solved problems",
        data: data.map(({ count }) => parseInt(count)),
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      colors: data.map(({ name }) => stringToColour(name)),
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: "top", // top, center, bottom
          },
          distributed: true,
        },
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },
      xaxis: {
        categories: data.map(({ name }) => name),
        position: "bottom",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val
          },
        },
      },
      title: {
        text: "Solved categories",
        floating: true,
        offsetY: 330,
        align: "center",
        style: {
          color: "#444",
        },
      },
    },
  }

  return (
    <ReactApexChart
      options={state.options}
      series={state.series}
      type="bar"
      height={350}
    />
  )
}
