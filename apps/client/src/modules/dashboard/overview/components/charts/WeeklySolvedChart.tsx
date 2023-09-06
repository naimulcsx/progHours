import {
  Box,
  ScrollArea,
  Text,
  useMantineColorScheme,
  useMantineTheme
} from "@mantine/core";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useEffect, useRef } from "react";
import { useAccentColor } from "~/modules/common/contexts/AccentColorContext";
import { resolvers } from "~/theme";
import convert from "color-convert";

export const WeeklySolvedChart = () => {
  const totalItems = 20;
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

  const series = [
    {
      name: "Solved",
      data: Array.from({ length: totalItems }, () =>
        Math.floor(Math.random() * 10)
      )
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
      categories: Array.from({ length: 200 }, () => 0).map((e, i) => "W" + i),
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
        style={{
          fontWeight: 500,
          color: colorScheme === "dark" ? theme.white : theme.colors.dark[4],
          textAlign: "center"
        }}
      >
        Problems solved per week
      </Text>
      <ScrollArea h={350} viewportRef={viewport}>
        <Box style={{ width: totalItems <= 10 ? "100%" : totalItems * 50 }}>
          <Chart options={options} series={series} type="area" height={330} />
        </Box>
      </ScrollArea>
    </>
  );
};
