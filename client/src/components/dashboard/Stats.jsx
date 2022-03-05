import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import axios from "axios"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    // title: {
    //   display: true,
    //   text: "Statistics for Solved",
    // },
  },
}

const labels = [""]
export function Stats() {
  let [data, setData] = useState({
    labels,
    datasets: [],
  })

  useEffect(async () => {
    const { data } = await axios.get("/api/users/stats")
    const { AC, WA, TLE, RTE } = data.verdict
    setData({
      labels,
      datasets: [
        {
          label: "AC",
          data: [AC],
          backgroundColor: "#a3e635",
        },
        {
          label: "WA",
          data: [WA],
          backgroundColor: "#f87171",
        },
        {
          label: "TLE",
          data: [TLE],
          backgroundColor: "#fbbf24",
        },
        {
          label: "RTE",
          data: [RTE],
          backgroundColor: "#f472b6",
        },
      ],
    })
  }, [])

  return <Bar options={options} data={data} />
}
