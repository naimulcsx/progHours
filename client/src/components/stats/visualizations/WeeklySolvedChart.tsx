import ReactApexChart from "react-apexcharts"
import { Paper, useMantineTheme } from "@mantine/core"

export default function WeeklySolvedChart({ data }: any) {
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
        show: true,
      },
      height: 350,
      type: "area",
      background: "transparent",
    },
    grid: {
      borderColor: theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[3],
      yaxis: {
        lines: {
          show: true,
        },
      },
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
    <Paper shadow="xs" p="md" sx={{ height: "100%" }}>
      <ReactApexChart options={options as any} series={series} type="area" height={320} />
    </Paper>
  )
}
