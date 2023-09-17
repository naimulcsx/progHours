import { ApexOptions } from "apexcharts";
import { useState } from "react";
import Chart from "react-apexcharts";

import {
  Box,
  Group,
  ScrollArea,
  SegmentedControl,
  Table,
  Text,
  useMantineColorScheme
} from "@mantine/core";

import { ActiveProfileResponse } from "@proghours/data-access";

interface TimeSpentChartProps {
  data: ActiveProfileResponse["solveTimeByTags"];
}

export function TimeSpentChart({ data }: TimeSpentChartProps) {
  const { colorScheme } = useMantineColorScheme();

  data = data
    .map((el) => {
      if (el.tag === null) {
        return {
          tag: "others",
          sum: el.sum
        };
      }
      return el;
    })
    .sort((a, b) => b.sum - a.sum);

  const slicedData = data.slice(0, 10);

  const series = slicedData.map((el) => el.sum);

  const options: ApexOptions = {
    chart: {
      type: "donut",
      background: "transparent",
      toolbar: {
        show: true
      }
    },
    theme: {
      mode: colorScheme === "dark" ? "dark" : "light",
      palette: "palette1"
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true
            },
            value: {
              show: true,
              formatter: (val) => {
                const total = Number(val);
                console.log(total);
                return `${Math.floor(total / 60)}h ${total % 60}m`;
              }
            },
            total: {
              show: true,
              formatter: (val) => {
                const total = val.config.series.reduce(
                  (prev: number, current: number) => prev + current,
                  0
                );
                return `${Math.floor(total / 60)}h ${total % 60}m`;
              }
            }
          }
        }
      }
    },
    labels: slicedData.map((el) => el.tag),
    stroke: {
      show: false
    },
    legend: {
      position: "right"
    },
    dataLabels: {
      style: {
        colors: ["#fff"]
      },
      dropShadow: {
        enabled: false
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom"
          }
        }
      }
    ]
  };

  const [value, setValue] = useState("chart");

  return (
    <Box>
      <Group justify="space-between">
        <Text
          size="sm"
          variant="proghours-ui-strong"
          style={{
            fontStyle: "italic",
            textAlign: "center"
          }}
        >
          Time spent by tag
        </Text>
        <SegmentedControl
          variant="proghours-ui-secondary"
          size="xs"
          value={value}
          onChange={setValue}
          data={[
            { label: "Chart view", value: "chart" },
            { label: "Table view", value: "table" }
          ]}
        />
      </Group>

      <ScrollArea h={350} mt="sm">
        {value === "chart" && (
          <Box>
            <Chart
              type="donut"
              series={series}
              options={options}
              height={330}
            />
          </Box>
        )}
        {value === "table" && (
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Tag</Table.Th>
                <Table.Th>Solved</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data.map((el) => (
                <Table.Tr key={el.tag}>
                  <Table.Td>{el.tag}</Table.Td>
                  <Table.Td>{el.sum}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        )}
      </ScrollArea>
    </Box>
  );
}
