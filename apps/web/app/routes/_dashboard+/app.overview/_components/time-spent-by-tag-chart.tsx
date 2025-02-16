import { DonutChart } from '@mantine/charts';
import { Card, Text } from '@mantine/core';
import { Legend } from 'recharts';

interface TagStatsProps {
  data: {
    tag: string;
    solveCount: number;
    solveTime: number;
    color: string;
  }[];
}

export function TimeSpentByTagChart({ data }: TagStatsProps) {
  return (
    <Card className="col-span-2 !bg-white shadow-none">
      <Text fw={500}>Time spent by tag</Text>
      <DonutChart
        h={320}
        thickness={28}
        strokeWidth={2}
        className="mx-auto w-full"
        data={data
          .sort((a, b) => b.solveTime - a.solveTime)
          .slice(0, 10)
          .map((item) => ({
            name: item.tag,
            value: item.solveTime,
            color: item.color,
          }))}
        labelsType="value"
        withLabels
        withTooltip={false}
        valueFormatter={(value) => `${Math.round(value / 60)}h`}
      >
        <Legend
          align="center"
          wrapperStyle={{
            fontSize: '0.75rem',
            padding: '10px',
            fontWeight: '500',
          }}
        />
      </DonutChart>
    </Card>
  );
}
