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

interface AvgDifficultyChartProps {
  data: ActiveProfileResponse["weeklyStatistics"];
}

export const AvgDifficultyChart = ({ data }: AvgDifficultyChartProps) => {
  const { colorScheme } = useMantineColorScheme();
  const viewport = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState("default");
  const solvedData =
    value === "default" ? data.filter((el) => el.averageDifficulty > 0) : data;

  useEffect(() => {
    viewport?.current?.scrollTo({
      left: viewport.current.scrollWidth,
      behavior: "instant"
    });
  }, [value]);

  const series = [
    {
      name: "avg_difficulty",
      data: solvedData.map((el) => el.averageDifficulty)
    }
  ];
  const options: ApexOptions = {
    chart: {
      toolbar: {
        show: true,
        export: {
          csv: {
            headerCategory: "week",
            headerValue: "avg_difficulty"
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
      mode: colorScheme === "dark" ? "dark" : "light",
      palette: "palette3"
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "smooth"
    },
    xaxis: {
      categories: solvedData.map((el) => el.label),
      tooltip: {
        enabled: false
      }
    },
    markers: {
      size: 6,
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
        sizeOffset: 3
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
          Average difficulty per week
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
      <ScrollArea mt="sm" h={350} viewportRef={viewport}>
        <Box
          style={{
            width: solvedData.length <= 10 ? "100%" : solvedData.length * 50
          }}
        >
          <Chart options={options} series={series} type="line" height={330} />
        </Box>
      </ScrollArea>
    </>
  );
};
