import ReactApexChart from "react-apexcharts"

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

export default function TagsFreqChart({ data }) {
  const state = {
    series: [
      {
        name: "Solved problems",
        data: data.map(({ count }: { count: string }) => parseInt(count)),
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      colors: data.map(({ name }: { name: string }) => stringToColour(name)),
      plotOptions: {
        bar: {
          borderRadius: 10,
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
          colors: ["#304758"],
        },
      },
      xaxis: {
        type: "category",
        categories: data.map(({ name }: { name: string }) => name),
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
        max:
          Math.max(
            ...data.map(({ count }: { count: string }) => parseInt(count))
          ) + 3,
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
        text: "Solved categories",
        floating: false,
        offsetY: 0,
        margin: 10,
        align: "center",
        style: {
          color: "#444",
        },
      },
    },
  }

  return (
    <ReactApexChart
      options={state.options}
      series={state.series}
      type="bar"
      height={350}
    />
  )
}
