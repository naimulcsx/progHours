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

interface TopSolvedTagsChartProps {
  data: ActiveProfileResponse["solveCountByTags"];
}

export function TopSolvedTagsChart({ data }: TopSolvedTagsChartProps) {
  const { colorScheme } = useMantineColorScheme();
  const slicedData = data.slice(0, 10).reverse();

  const series = [
    {
      name: "Solved",
      data: slicedData.map((el) => el.count)
    }
  ];

  const options: ApexOptions = {
    chart: {
      toolbar: {
        show: true,
        export: {
          csv: {
            headerCategory: "tag",
            headerValue: "total_solved"
          }
        }
      },
      background: "transparent",
      animations: {
        enabled: true
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        dataLabels: {
          position: "top" // top, center, bottom
        },
        distributed: true
      }
    },
    grid: {
      borderColor: "hsl(var(--border))",
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    theme: {
      mode: colorScheme === "dark" ? "dark" : "light"
    },
    xaxis: {
      categories: slicedData.map((el) => el.tag),
      tooltip: {
        enabled: false
      }
    }
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
          Top solved tags
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
            <Chart type="bar" series={series} options={options} height={310} />
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
              {data
                .concat([])
                .sort((a, b) => b.count - a.count)
                .map((el) => (
                  <Table.Tr key={el.tag}>
                    <Table.Td>{el.tag}</Table.Td>
                    <Table.Td>{el.count}</Table.Td>
                  </Table.Tr>
                ))}
            </Table.Tbody>
          </Table>
        )}
      </ScrollArea>
    </Box>
  );
}
