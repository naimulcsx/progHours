import ReactApexChart from "react-apexcharts"
import { Anchor, Modal, Paper, ScrollArea, Table, Text, Title, useMantineTheme } from "@mantine/core"
import { ApexOptions } from "apexcharts"
import { useState } from "react"

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
  const theme = useMantineTheme()
  const [open, setOpen] = useState(false)

  data.sort((a: any, b: any) => {
    return b.sum - a.sum
  })
  const slicedData = data.slice(0, 12).reverse()
  const series = slicedData.map(({ sum }: { sum: number }) => sum)

  const options: ApexOptions = {
    chart: {
      type: "donut",
      background: "transparent",
      toolbar: {
        show: true,
      },
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
      <Title order={6} sx={{ textAlign: "center" }}>
        Time spent by category{" "}
        <Anchor size="sm" sx={{ fontWeight: 400 }} onClick={() => setOpen(true)}>
          [View full data]
        </Anchor>
      </Title>
      <ReactApexChart
        // @ts-ignore
        options={options}
        series={series}
        type="donut"
        height={335}
      />
      <Modal opened={open} onClose={() => setOpen(false)} title={<Title order={4}>Time spent by category</Title>}>
        {/* Modal content */}
        <ScrollArea sx={{ height: 400 }}>
          {data.length > 0 ? (
            <Table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Avg Solve Time</th>
                  <th>Time Spent</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item: any) => {
                  return (
                    <tr key={item.name}>
                      <td>{item.name}</td>
                      <td>~{Math.round(item.sum / item.count)}m</td>
                      <td>
                        {Math.floor(item.sum / 60) > 0 ? (
                          <Text>
                            {Math.floor(item.sum / 60)}h {item.sum % 60}m
                          </Text>
                        ) : (
                          <Text>{item.sum % 60}m</Text>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          ) : (
            <Text size="sm">Not enough data!</Text>
          )}
        </ScrollArea>
      </Modal>
    </Paper>
  )
}
