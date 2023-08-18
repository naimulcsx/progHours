import { Box, ScrollArea, useMantineTheme } from "@mantine/core";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useEffect, useRef } from "react";

export const MyResponsiveLine = () => {
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
      data: Array.from({ length: 200 }, () => Math.floor(Math.random() * 10))
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
          ? theme.fn.rgba(theme.colors.dark[3], 0.5)
          : theme.colors.gray[3],
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    theme: {
      mode: theme.colorScheme,
      palette: "palette1"
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
    markers: {
      size: 4,
      colors: undefined,
      strokeColors: "#fff",
      strokeWidth: 2,
      strokeOpacity: 1,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      shape: "circle",
      radius: 2,
      offsetX: 0,
      offsetY: 0,
      onClick(e) {
        console.log(e);
        alert("hello world");
      },
      onDblClick: undefined,
      showNullDataPoints: true,
      hover: {
        size: undefined,
        sizeOffset: 0
      }
    }
  };
  return (
    <ScrollArea h={350} viewportRef={viewport}>
      <Box sx={{ width: 200 * 50 }}>
        <Chart options={options} series={series} type="area" height={330} />
      </Box>
    </ScrollArea>
  );
};
