import { Box, ScrollArea, Text, useMantineTheme } from "@mantine/core";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useEffect, useRef } from "react";

export const WeeklySolvedChart = () => {
  const totalItems = 20;
  const theme = useMantineTheme();
  const viewport = useRef<HTMLDivElement>(null);
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
      borderColor:
        theme.colorScheme === "dark"
          ? theme.fn.rgba(theme.colors.dark[3], 0.25)
          : theme.colors.gray[3],
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    theme: {
      mode: theme.colorScheme,
      monochrome: {
        enabled: true,
        color: theme.colors.blue[5],
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
        align="center"
        style={{
          fontWeight: 500,
          color:
            theme.colorScheme === "dark" ? theme.white : theme.colors.dark[4]
        }}
      >
        Number of problem solved by week
      </Text>
      <ScrollArea h={350} viewportRef={viewport}>
        <Box sx={{ width: totalItems <= 10 ? "100%" : totalItems * 50 }}>
          <Chart options={options} series={series} type="area" height={330} />
        </Box>
      </ScrollArea>
    </>
  );
};
