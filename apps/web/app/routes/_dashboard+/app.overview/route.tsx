import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import {
  ChartBarLineIcon,
  CheckmarkCircle01Icon,
  Clock01Icon,
  Medal01Icon,
} from 'hugeicons-react';

import { AppBreadcrumbs } from '~/components/app-breadcrumbs';
import { PageHeader } from '~/components/page-header';
import { StatCard } from '~/components/stat-card';
import { authenticator } from '~/services/auth.server';
import { getUserStatistics } from '~/services/statistics.server';

import { AverageDifficultyChart } from './_components/average-difficulty-chart';
import { SubmissionsChart } from './_components/submissions-chart';
import { TimeSpentByTagChart } from './_components/time-spent-by-tag-chart';
import { TopSolvedTagsChart } from './_components/top-solved-tags-chart';

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
        <SubmissionsChart data={stats.dailySubmissions} />
        <TopSolvedTagsChart data={stats.tagStats} />
        <TimeSpentByTagChart data={stats.tagStats} />
        <AverageDifficultyChart data={stats.dailySubmissions} />
      </div>
    </div>
  );
}
