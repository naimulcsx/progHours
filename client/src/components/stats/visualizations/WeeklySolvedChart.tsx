import ReactApexChart from "react-apexcharts"
import { useColorModeValue as mode } from "@chakra-ui/react"

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
    },
    theme: {
      mode: `${mode("light", "dark")}`,
      palette: "palette1",
      monochrome: {
        enabled: false,
        color: "#255aee",
        shadeTo: "light",
        shadeIntensity: 0.65,
      },
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
        color: "#444",
      },
    },
  }
  return (
    // @ts-ignore
    <ReactApexChart
      options={options as any}
      series={series}
      type="area"
      height={320}
    />
  )
}
