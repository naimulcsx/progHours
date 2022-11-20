import ReactApexChart from "react-apexcharts"
import { useColorModeValue as mode } from "@chakra-ui/react"
import { Paper, useMantineTheme } from "@mantine/core"

// @ts-ignore
export default function WeeklySolvedChart({ data }) {
  //const color = useColorModeValue("white", "gray.800")
  const theme = useMantineTheme()
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
      background: "transparent",
    },
    theme: {
      mode: theme.colorScheme,
      palette: "palette1",
    },
    dataLabels: {
      enabled: true,
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
        color: theme.colorScheme === "dark" ? theme.colors.gray[3] : theme.colors.dark[9],
      },
    },
  }
  return (
    // @ts-ignore
    <Paper shadow="xs" p="md" sx={{ height: "100%" }}>
      <ReactApexChart options={options as any} series={series} type="area" height={320} />
    </Paper>
  )
}
