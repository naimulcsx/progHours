import { BarChart } from '@mantine/charts';
import { Card, Text } from '@mantine/core';

interface TagStatsProps {
  data: {
    tag: string;
    solveCount: number;
    solveTime: number;
    color: string;
  }[];
}

export function TopSolvedTagsChart({ data }: TagStatsProps) {
  return (
    <Card className="col-span-2 !bg-white shadow-none">
      <Text fw={500}>Top Solved Tags</Text>
      <BarChart
        h={300}
        data={data.sort((a, b) => b.solveTime - a.solveTime).slice(0, 10)}
        dataKey="tag"
        series={[
          {
            name: 'solveCount',
            label: 'Total Solved',
            color: 'gray.3',
          },
        ]}
        tooltipAnimationDuration={200}
        withLegend
        legendProps={{ verticalAlign: 'top', height: 50 }}
        barProps={{ radius: 6, barSize: 40 }}
      />
    </Card>
  );
}
