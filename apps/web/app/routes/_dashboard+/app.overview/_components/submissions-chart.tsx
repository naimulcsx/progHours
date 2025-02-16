import { AreaChart } from '@mantine/charts';
import { Card, Text } from '@mantine/core';

interface SubmissionsChartProps {
  data: {
    date: string;
    AC: number;
    WA: number;
    TLE: number;
  }[];
}

export function SubmissionsChart({ data }: SubmissionsChartProps) {
  return (
    <Card className="col-span-2 !bg-white shadow-none">
      <Text fw={500}>Submissions Status</Text>
      <AreaChart
        h={300}
        strokeWidth={2.5}
        data={data}
        dataKey="date"
        series={[
          { name: 'AC', color: 'lime.7' },
          { name: 'WA', color: 'red.4' },
          { name: 'TLE', color: 'orange.3' },
        ]}
        withDots={false}
        withLegend
        tooltipAnimationDuration={200}
        valueFormatter={(value) => value.toLocaleString()}
        legendProps={{ verticalAlign: 'top', height: 50 }}
      />
    </Card>
  );
}
