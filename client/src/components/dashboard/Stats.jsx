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
          backgroundColor: "green",
        },
        {
          label: "WA",
          data: [WA],
          backgroundColor: "red",
        },
        {
          label: "TLE",
          data: [TLE],
          backgroundColor: "pink",
        },
        {
          label: "RTE",
          data: [RTE],
          backgroundColor: "orange",
        },
      ],
    })
  }, [])

  return <Bar options={options} data={data} />
}
