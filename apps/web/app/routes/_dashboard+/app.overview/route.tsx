import { AreaChart, BarChart, DonutChart, LineChart } from '@mantine/charts';
import { Card, Text } from '@mantine/core';
import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import {
  ChartBarLineIcon,
  CheckmarkCircle01Icon,
  Clock01Icon,
  Medal01Icon,
} from 'hugeicons-react';
import { Legend } from 'recharts';

import { AppBreadcrumbs } from '~/components/app-breadcrumbs';
import { PageHeader } from '~/components/page-header';
import { StatCard } from '~/components/stat-card';
import { authenticator } from '~/services/auth.server';
import { getUserStatistics } from '~/services/statistics.server';

export const meta = () => {
  return [{ title: 'Overview' }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request);

  const stats = await getUserStatistics({
    userId: user!.sub,
    type: 'allTime',
  });

  return { stats };
};

export default function Dashboard() {
  const { stats } = useLoaderData<typeof loader>();
  return (
    <div className="space-y-4">
      <PageHeader title="Overview" description={<AppBreadcrumbs />} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Points"
          value={stats.totalPoints.toLocaleString()}
          icon={
            <Medal01Icon className="text-primary-500 h-6 w-6" strokeWidth={2} />
          }
        />
        <StatCard
          label="Problems Solved"
          value={stats.totalProblemsSolved.toLocaleString()}
          icon={
            <CheckmarkCircle01Icon
              className="text-primary-500 h-6 w-6"
              strokeWidth={2}
            />
          }
        />
        <StatCard
          label="Average Difficulty"
          value={Number(stats.averageDifficulty).toFixed(2)}
          icon={
            <ChartBarLineIcon
              className="text-primary-500 h-6 w-6"
              strokeWidth={2}
            />
          }
        />
        <StatCard
          label="Total Solve Time"
          value={
            stats.totalSolveTime
              ? `${Math.round(Number(stats.totalSolveTime) / 60)}h ${Math.round(Number(stats.totalSolveTime) % 60)}m`
              : '-'
          }
          icon={
            <Clock01Icon className="text-primary-500 h-6 w-6" strokeWidth={2} />
          }
        />
        <Card className="col-span-2 !bg-white shadow-none">
          <Text fw={500}>Submissions Status</Text>
          <AreaChart
            h={300}
            strokeWidth={2.5}
            data={stats.dailySubmissions}
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

        <Card className="col-span-2 !bg-white shadow-none">
          <Text fw={500}>Top Solved Tags</Text>
          <BarChart
            h={300}
            data={stats.tagStats
              .sort((a, b) => b.solveTime - a.solveTime)
              .slice(0, 10)}
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

        <Card className="col-span-2 !bg-white shadow-none">
          <Text fw={500}>Time spent by tag</Text>
          <DonutChart
            h={320}
            thickness={28}
            strokeWidth={2}
            className="mx-auto w-full"
            data={stats.tagStats
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
            valueFormatter={(value) => {
              return `${Math.round(value / 60)}h`;
            }}
            children={
              <Legend
                align="center"
                wrapperStyle={{
                  fontSize: '0.75rem',
                  padding: '10px',
                  fontWeight: '500',
                }}
              />
            }
          />
        </Card>

        <Card className="col-span-2 flex flex-col justify-between !bg-white shadow-none">
          <Text fw={500}>Average Difficulty</Text>
          <LineChart
            h={280}
            strokeWidth={2.5}
            data={stats.dailySubmissions.map((item) => ({
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
      </div>
    </div>
  );
}
