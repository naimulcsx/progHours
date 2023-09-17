import { ApexOptions } from "apexcharts";
import convert from "color-convert";
import { useEffect, useRef } from "react";
import Chart from "react-apexcharts";

import {
  Box,
  ScrollArea,
  Text,
  useMantineColorScheme,
  useMantineTheme
} from "@mantine/core";

import { ActiveProfileResponse } from "@proghours/data-access";

import { useAccentColor } from "~/modules/common/contexts/AccentColorContext";
import { resolvers } from "~/theme";

interface WeeklySolvedChartProps {
  data: ActiveProfileResponse["weeklyStatistics"];
}

export const WeeklySolvedChart = ({ data }: WeeklySolvedChartProps) => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const viewport = useRef<HTMLDivElement>(null);
  const { accentColor } = useAccentColor();
  const primary = resolvers[accentColor](theme).light["--primary"];
  const hsl = primary.split(" ").map((n) => parseFloat(n)) as [
    number,
    number,
    number
  ];
  const __color = "#" + convert.hsl.hex(hsl);
  useEffect(() => {
    viewport?.current?.scrollTo({
      left: viewport.current.scrollWidth,
      behavior: "instant"
    });
  }, []);

  const solvedData = data.filter((el) => el.solved > 0);
  const series = [
    {
      name: "Solved",
      data: solvedData.map((el) => el.solved)
    }
  ];
  const options: ApexOptions = {
    chart: {
      toolbar: {
        show: true,
        export: {
          csv: {
            headerCategory: "Week",
            headerValue: "Total Solved"
          }
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
      monochrome: {
        enabled: true,
        color: __color,
        shadeTo: "light",
        shadeIntensity: 0.65
      }
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
    },
    tooltip: {
      enabled: true
    }
  };
  return (
    <>
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
      <ScrollArea h={350} viewportRef={viewport}>
        <Box
          style={{
            width: solvedData.length <= 10 ? "100%" : solvedData.length * 50
          }}
        >
          <Chart options={options} series={series} type="area" height={330} />
        </Box>
      </ScrollArea>
    </>
  );
};
