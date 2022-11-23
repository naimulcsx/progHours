import ReactApexChart from "react-apexcharts"
import { Paper, Title, useMantineTheme } from "@mantine/core"

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
    markers: {
      size: 4,
      colors: undefined,
      strokeColors: "#fff",
      strokeWidth: 2,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      shape: "circle",
      radius: 2,
      offsetX: 0,
      offsetY: 0,
      onClick: undefined,
      onDblClick: undefined,
      showNullDataPoints: true,
      hover: {
        size: undefined,
        sizeOffset: 3,
      },
    },
  }
  return (
    <Paper shadow="xs" p="md" sx={{ height: "100%" }}>
      <Title order={6} sx={{ textAlign: "center" }} mb="sm">
        Number of problem solved by week
      </Title>
      <ReactApexChart options={options as any} series={series} type="area" height={320} />
    </Paper>
  )
}
