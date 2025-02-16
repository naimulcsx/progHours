import { LineChart } from '@mantine/charts';
import { Card, Text } from '@mantine/core';

interface AverageDifficultyChartProps {
  data: {
    date: string;
    totalDifficulty: number;
    AC: number;
  }[];
}

export function AverageDifficultyChart({ data }: AverageDifficultyChartProps) {
  return (
    <Card className="col-span-2 flex flex-col justify-between !bg-white shadow-none">
      <Text fw={500}>Average Difficulty</Text>
      <LineChart
        h={280}
        strokeWidth={2.5}
        data={data.map((item) => ({
          date: item.date,
          avgDifficulty: item.totalDifficulty / item.AC,
        }))}
        dataKey="date"
        series={[{ name: 'avgDifficulty', color: 'primary.6' }]}
        withDots={false}
        tooltipAnimationDuration={200}
        lineChartProps={{ margin: { bottom: 10 } }}
        valueFormatter={(value) => value.toFixed(2)}
        gridAxis="x"
      />
    </Card>
  );
}
