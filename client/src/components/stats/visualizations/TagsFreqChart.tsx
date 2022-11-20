import ReactApexChart from "react-apexcharts"
import { useColorModeValue as mode } from "@chakra-ui/react"
import { Paper, useMantineTheme } from "@mantine/core"

function stringToColour(str: string) {
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
// @ts-ignore
export default function TagsFreqChart({ data }) {
  data.sort((a: any, b: any) => {
    return b.count - a.count
  })

  const slicedData = data.slice(0, 12).reverse()
  console.log(slicedData)

  const theme = useMantineTheme()
  const state = {
    series: [
      {
        name: "Solved problems",
        data: slicedData.length > 0 ? slicedData.map(({ count }: { count: string }) => parseInt(count)) : [],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
        toolbar: {
          show: true,
        },
        background: "transparent",
      },
      colors: slicedData.length > 0 ? slicedData.map(({ name }: { name: string }) => stringToColour(name)) : ["#fff"],
      theme: {
        mode: theme.colorScheme,
        palette: "palette1",
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          dataLabels: {
            position: "top", // top, center, bottom
          },
          distributed: true,
        },
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: any) {
          return val
        },
        offsetY: -32,
        style: {
          fontSize: "12px",
          colors: [theme.colorScheme === "dark" ? theme.colors.gray[3] : theme.colors.gray[7]],
        },
      },
      xaxis: {
        type: "category",
        categories: slicedData.length > 0 ? slicedData.map(({ name }: { name: string }) => name) : [""],
        position: "bottom",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        max: Math.max(...slicedData.map(({ count }: { count: string }) => parseInt(count))) + 3,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val: any) {
            return val
          },
        },
      },
      title: {
        text: "Most solved categories",
        floating: false,
        offsetY: 0,
        margin: 10,
        align: "center",
        style: {
          color: theme.colorScheme === "dark" ? theme.colors.gray[3] : theme.colors.dark[9],
        },
      },
    },
  }
  return (
    // @ts-ignore
    <Paper shadow="xs" p="xl">
      <ReactApexChart
        // @ts-ignore
        options={state.options}
        series={state.series}
        type="bar"
        height={350}
      />
    </Paper>
  )
}
