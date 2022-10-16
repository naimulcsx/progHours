import ReactApexChart from "react-apexcharts"
import { useColorModeValue as mode } from "@chakra-ui/react"
import { Paper } from "@mantine/core"

// @ts-ignore
export default function WeeklySolvedChart({ data }) {
  //const color = useColorModeValue("white", "gray.800")
  const series = [
    {
      name: "Solved",
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
      background: `${mode("white", "gray.700")}`,
    },
    theme: {
      mode: `${mode("light", "dark")}`,
      palette: "palette1",
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
      tooltip: {
        enabled: false,
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
        color: `${mode("black", "white")}`,
      },
    },
  }
  return (
    // @ts-ignore
    <Paper shadow="xs" p="md" sx={{ height: "100%" }}>
      <ReactApexChart
        options={options as any}
        series={series}
        type="area"
        height={320}
      />
    </Paper>
  )
}
