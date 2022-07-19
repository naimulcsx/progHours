import ReactApexChart from "react-apexcharts"
// @ts-ignore
export default function WeeklySolvedChart({ data }) {
  console.log(data)
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
