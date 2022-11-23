import { Paper, useMantineTheme } from "@mantine/core"
import { ApexOptions } from "apexcharts"
import ReactApexChart from "react-apexcharts"

export default function AvgDifficultyChart({ avgDifficulty }: any) {
  const theme = useMantineTheme()
  const series = [
    {
      name: "Average Difficulty",
      data: Object.values(avgDifficulty)
        .map((val) => Number(val).toFixed(2))
        .filter((val) => Number(val) > 0),
    },
  ]
  const options: ApexOptions = {
    chart: {
      type: "line",
      zoom: {
        enabled: false,
      },
      background: "transparent",
    },
    theme: {
      mode: theme.colorScheme,
      palette: "palette5",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Average difficulty by week",
      align: "center",
    },
    grid: {
      borderColor: theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[3],
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    xaxis: {
      categories: Object.keys(avgDifficulty)
        .filter((key) => avgDifficulty[key] > 0)
        .map((val) => `Week ${val}`),
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
    <Paper p="xl">
      {/* @ts-ignore */}
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </Paper>
  )
}
