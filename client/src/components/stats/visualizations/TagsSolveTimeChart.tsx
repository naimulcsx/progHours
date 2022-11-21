import ReactApexChart from "react-apexcharts"
import { Paper, useMantineTheme } from "@mantine/core"
import { ApexOptions } from "apexcharts"

export function stringToColour(str: string) {
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
export default function TagsSolveTimeChart({ data }: any) {
  data.sort((a: any, b: any) => {
    return b.sum - a.sum
  })
  const slicedData = data.slice(0, 12).reverse()
  const theme = useMantineTheme()

  const series = slicedData.map(({ sum }: { sum: string }) => parseInt(sum))

  const options: ApexOptions = {
    title: {
      text: "Time spent by category",
      align: "center",
    },
    chart: {
      type: "donut",
      background: "transparent",
    },
    theme: {
      mode: theme.colorScheme,
      palette: "palette2",
    },
    grid: {
      padding: {
        top: 16,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
            },
            value: {
              show: true,
              formatter: (val) => {
                const total = Number(val)
                return `${Math.floor(total / 60)}h ${total % 60}m`
              },
            },
            total: {
              show: true,
              formatter: (val) => {
                const total = val.config.series.reduce((prev: number, current: number) => prev + current, 0)
                return `${Math.floor(total / 60)}h ${total % 60}m`
              },
            },
          },
        },
      },
    },
    labels: slicedData.map(({ name }: { name: string }) => name),
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    stroke: {
      show: false,
      width: 0,
    },
  }

  return (
    // @ts-ignore
    <Paper shadow="xs" p="xl">
      <ReactApexChart
        // @ts-ignore
        options={options}
        series={series}
        type="donut"
        height={335}
      />
    </Paper>
  )
}
