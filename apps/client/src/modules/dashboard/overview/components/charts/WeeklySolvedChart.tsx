import { ApexOptions } from "apexcharts";
import { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";

import {
  Box,
  Group,
  ScrollArea,
  SegmentedControl,
  Text,
  useMantineColorScheme
} from "@mantine/core";

import { ActiveProfileResponse } from "@proghours/data-access";

// import convert from "color-convert";

interface WeeklySolvedChartProps {
  height?: number;
  data: ActiveProfileResponse["weeklyStatistics"];
}

export const WeeklySolvedChart = ({
  height = 330,
  data
}: WeeklySolvedChartProps) => {
  const { colorScheme } = useMantineColorScheme();
  // const { accentColor } = useAccentColor();
  // const primary = resolvers[accentColor](theme).light["--primary"];
  // const hsl = primary.split(" ").map((n) => parseFloat(n)) as [
  //   number,
  //   number,
  //   number
  // ];
  // const __color = "#" + convert.hsl.hex(hsl);
  const viewport = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState("default");
  const solvedData =
    value === "default" ? data.filter((el) => el.solved > 0) : data;

  useEffect(() => {
    viewport?.current?.scrollTo({
      left: viewport.current.scrollWidth,
      behavior: "instant"
    });
  }, [value]);

  const series = [
    {
      name: "Solved",
      data: solvedData.map((el) => el.solved)
    }
  ];
  const options: ApexOptions = {
    chart: {
      fontFamily: "Onest",
      toolbar: {
        show: true,
        export: {
          csv: {
            headerCategory: "week",
            headerValue: "total_solved"
          }
        },
        tools: {
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false
        }
      },
      background: "transparent",
      animations: {
        enabled: true,
        easing: "easeout"
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
    theme: {
      mode: colorScheme === "dark" ? "dark" : "light"
    },
    dataLabels: {
      enabled: true
    },
    stroke: {
      curve: "smooth"
    },
    xaxis: {
      categories: solvedData.map((el) => el.label),
      tooltip: {
        enabled: false
      }
    }
  };

  return (
    <>
      <Group justify="space-between">
        <Text
          size="sm"
          variant="proghours-ui-strong"
          style={{
            fontStyle: "italic",
            textAlign: "center"
          }}
        >
          Problems solved per week
        </Text>
        <SegmentedControl
          variant="proghours-ui-secondary"
          size="xs"
          value={value}
          onChange={setValue}
          data={[
            { label: "Default view", value: "default" },
            { label: "With empty weeks", value: "show_empty_weeks" }
          ]}
        />
      </Group>
      <ScrollArea mt="sm" h={height + 20} viewportRef={viewport}>
        <Box
          style={{
            width: solvedData.length <= 10 ? "100%" : solvedData.length * 50
          }}
        >
          <Chart
            options={options}
            series={series}
            type="area"
            height={height}
          />
        </Box>
      </ScrollArea>
    </>
  );
};
