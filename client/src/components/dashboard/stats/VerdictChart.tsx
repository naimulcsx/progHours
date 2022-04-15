import React, { useEffect, useState } from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"
import { getStats } from "../../../api/dashboard"
import { useQuery } from "react-query"

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
  return (
    <Doughnut
      data={makeData(data)}
      options={{
        aspectRatio: 1,
        responsive: true,
      }}
    />
  )
}
