import {
  Accordion,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Image,
  Paper,
  SegmentedControl,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Link } from '@remix-run/react';
import {
  ArrowDownDoubleIcon,
  ArrowRight02Icon,
  ChartBarLineIcon,
  PieChartIcon,
  PresentationLineChart01Icon,
  UserIcon,
} from 'hugeicons-react';

import { useState } from 'react';

import { AverageDifficultyChart } from '../_dashboard+/app.overview/_components/average-difficulty-chart';
import { SubmissionsChart } from '../_dashboard+/app.overview/_components/submissions-chart';
import { TimeSpentByTagChart } from '../_dashboard+/app.overview/_components/time-spent-by-tag-chart';
import { TopSolvedTagsChart } from '../_dashboard+/app.overview/_components/top-solved-tags-chart';

export default function Index() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <AnalyticsSection />
      <FAQSection />
    </div>
  );
}

function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      <Container size="xl" className="-mt-4 py-20">
        <div className="flex flex-col items-center justify-center text-center">
          <div
            style={{
              position: 'absolute',
              inset: 0,
              top: 0,
              maskImage: 'linear-gradient(180deg,#fff 5%,transparent 80%)',
              backgroundImage:
                "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(0 0 0 / 0.04)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e\")",
            }}
          ></div>

          <div className="relative">
            <Title order={1} className="font-play mb-4 text-4xl font-bold">
              Code. Compete. Conquer!
            </Title>
            <Text size="lg" className="mb-8 max-w-2xl" c="dimmed">
              Track your progress with comprehensive analytics on your
              problem-solving journey. Climb the leaderboard with every problem
              you solve.
            </Text>
            <div className="flex items-center justify-center gap-4">
              <Button
                size="md"
                component={Link}
                to="#features"
                variant="light"
                rightSection={<ArrowDownDoubleIcon size={20} />}
              >
                Features
              </Button>
              <Button
                size="md"
                component={Link}
                to="/waitlist"
                rightSection={<ArrowRight02Icon size={20} />}
              >
                Join Waitlist
              </Button>
            </div>
          </div>
        </div>
      </Container>
      <Container
        size={1140}
        className="relative -mt-6 rounded-lg border border-gray-200 bg-white shadow"
      >
        <Image src="/cover.jpg" alt="progHours" />
      </Container>
    </div>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: <PieChartIcon size={40} />,
      title: (
        <>
          Comprehensive <br /> Analytics
        </>
      ),
      description:
        "Track your journey with precision using our platform's in-depth analytics.",
    },
    {
      icon: <PresentationLineChart01Icon size={40} />,
      title: (
        <>
          Coach <br /> Insights
        </>
      ),
      description:
        'Empower coaches with valuable insights to monitor and assess student progress.',
    },
    {
      icon: <ChartBarLineIcon size={40} />,
      title: (
        <>
          Rewards & <br /> Leaderboard
        </>
      ),
      description:
        'Climb the leaderboard, earn points, and unlock rewarding achievements.',
    },
    {
      icon: <UserIcon size={40} />,
      title: (
        <>
          Profile <br /> Showcase
        </>
      ),
      description:
        'Stand out to tech recruiters by creating a profile that highlights your skills.',
    },
  ];

  return (
    <section id="features" className="my-14 lg:my-24">
      <Container size="lg" className="text-center">
        <Title order={2} className="mb-2">
          Features
        </Title>
        <Text c="dimmed">
          Discover how progHours is revolutionizing the way students engage in
          competitive programming and problem-solving with these key features.
        </Text>
      </Container>

      <Container size={1140} className="mt-10">
        <Grid gutter="xl">
          {features.map((feature, index) => (
            <Grid.Col key={index} span={{ base: 12, sm: 6, lg: 3 }}>
              <Card p="xl" className="h-full !bg-white shadow-none">
                <span className="text-primary-700">{feature.icon}</span>
                <Title order={4} className="my-4 leading-6">
                  {feature.title}
                </Title>
                <Text size="sm" c="dimmed">
                  {feature.description}
                </Text>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </section>
  );
}

function FAQSection() {
  const faqData = [
    {
      value: 'Why is the name progHours?',
      description:
        'Since our platform is all about programming and problem-solving. The first name that came to our mind was "programming hours". We decided to tweak it a bit and came up with "progHours". We liked it and it stuck.',
    },
    {
      value: 'How does the leaderboard work?',
      description:
        "The leaderboard ranks users based on how many problems they've solved and the difficulty of those problems.",
    },
    {
      value: 'How can progHours help educators?',
      description:
        "progHours offers tools for coaches and educators to monitor students' progress, assess their performance.",
    },
    {
      value: 'When is it coming out?',
      description:
        'We are working hard to get the first public version of progHours out as soon as possible.',
    },
    {
      value: 'Will I be given access?',
      description:
        'Yes, we will onboard the people on our waitlist based on a first come first serve basis, with a 1000 user limit for our initial version.',
    },
  ];

  return (
    <section className="my-14 lg:my-24">
      <Container size="lg" className="text-center">
        <Stack gap="lg">
          <Title order={2}>You probably got many questions</Title>
          <Text c="dimmed">
            So here's a list of things we think you might be wondering about
            when it comes to progHours.
          </Text>
        </Stack>
      </Container>
      <Container size="lg" className="mt-10">
        <Accordion>
          {faqData.map((q) => (
            <Accordion.Item key={q.value} value={q.value}>
              <Accordion.Control>{q.value}</Accordion.Control>
              <Accordion.Panel>
                <Text>{q.description}</Text>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}

type AnalyticsType = 'submissions' | 'topTags' | 'timeSpent' | 'difficulty';

export function AnalyticsSection() {
  const matches = useMediaQuery('(max-width: 640px)');
  const [value, setValue] = useState<AnalyticsType>('submissions');

  return (
    <section>
      <Container size="lg" style={{ textAlign: 'center' }}>
        <Stack gap="lg">
          <Title order={2}>Problem Solving Analytics</Title>
          <Text c="dimmed">
            Track your progress and identify areas for improvement with detailed
            analytics of your problem-solving journey.
          </Text>
        </Stack>
      </Container>

      <Container size={1140} mt="xl">
        <Flex justify="center">
          <SegmentedControl
            size="sm"
            w={matches ? '100%' : 'auto'}
            orientation={matches ? 'vertical' : 'horizontal'}
            value={value}
            onChange={(val) => setValue(val as AnalyticsType)}
            withItemsBorders={false}
            data={[
              { label: 'Submission History', value: 'submissions' },
              { label: 'Top Solved Tags', value: 'topTags' },
              { label: 'Time Distribution', value: 'timeSpent' },
              { label: 'Difficulty Analysis', value: 'difficulty' },
            ]}
          />
        </Flex>

        <Paper p="xl" mt="xl" className="shadow-xs">
          <Grid gutter={{ base: 32, md: 64 }} align="center">
            <Grid.Col span={{ base: 12, md: 6 }}>
              {analytics[value].content}
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              {analytics[value].chart}
            </Grid.Col>
          </Grid>
        </Paper>
      </Container>
    </section>
  );
}

const analytics = {
  submissions: {
    content: (
      <div className="space-y-4">
        <div>
          <Title order={2} fw={600}>
            Submission History
          </Title>
          <Text fw={500} c="dimmed">
            Track Your Problem-Solving Journey
          </Text>
        </div>
        <Text c="dimmed">
          Monitor your daily submissions with a breakdown of accepted solutions,
          wrong answers, and time limit exceeded cases. This helps you
          understand your success rate and areas needing improvement.
        </Text>
      </div>
    ),
    chart: (
      <SubmissionsChart
        data={[
          { date: '2024-01-01', AC: 5, WA: 2, TLE: 1 },
          { date: '2024-01-02', AC: 3, WA: 1, TLE: 0 },
          { date: '2024-01-03', AC: 7, WA: 3, TLE: 2 },
          { date: '2024-01-04', AC: 4, WA: 2, TLE: 1 },
          { date: '2024-01-05', AC: 6, WA: 1, TLE: 0 },
        ]}
      />
    ),
  },
  topTags: {
    content: (
      <div className="space-y-4">
        <div>
          <Title order={2} fw={600}>
            Top Solved Tags
          </Title>
          <Text fw={500} c="dimmed">
            Discover Your Strengths
          </Text>
        </div>
        <Text>
          See which problem categories you excel in and identify areas where you
          might want to focus more attention. This insight helps guide your
          practice strategy.
        </Text>
      </div>
    ),
    chart: (
      <TopSolvedTagsChart
        data={[
          { tag: 'greedy', solveCount: 14, solveTime: 279, color: '#fd7f6f' },
          {
            tag: 'implementation',
            solveCount: 13,
            solveTime: 133,
            color: '#7eb0d5',
          },
          {
            tag: 'brute force',
            solveCount: 8,
            solveTime: 144,
            color: '#b2e061',
          },
          {
            tag: 'data structures',
            solveCount: 6,
            solveTime: 80,
            color: '#bd7ebe',
          },
          { tag: 'math', solveCount: 5, solveTime: 135, color: '#ffb55a' },
        ]}
      />
    ),
  },
  timeSpent: {
    content: (
      <div className="space-y-4">
        <div>
          <Title order={2} fw={600}>
            Time Distribution
          </Title>
          <Text fw={500} c="dimmed">
            Analyze Your Time Investment
          </Text>
        </div>
        <Text>
          Understand how you're allocating your time across different problem
          categories. This helps optimize your study schedule and identify
          time-consuming areas.
        </Text>
      </div>
    ),
    chart: (
      <TimeSpentByTagChart
        data={[
          { tag: 'greedy', solveCount: 14, solveTime: 279, color: '#fd7f6f' },
          {
            tag: 'implementation',
            solveCount: 13,
            solveTime: 133,
            color: '#7eb0d5',
          },
          {
            tag: 'brute force',
            solveCount: 8,
            solveTime: 144,
            color: '#b2e061',
          },
          {
            tag: 'data structures',
            solveCount: 6,
            solveTime: 80,
            color: '#bd7ebe',
          },
          { tag: 'math', solveCount: 5, solveTime: 135, color: '#ffb55a' },
        ]}
      />
    ),
  },
  difficulty: {
    content: (
      <div className="space-y-4">
        <div>
          <Title order={2} fw={600}>
            Difficulty Progression
          </Title>
          <Text fw={500} c="dimmed">
            Track Your Growth
          </Text>
        </div>
        <Text>
          Monitor how you're progressing in terms of problem difficulty. An
          upward trend indicates you're consistently challenging yourself with
          harder problems.
        </Text>
      </div>
    ),
    chart: (
      <AverageDifficultyChart
        data={[
          { date: '2024-01-01', totalDifficulty: 4000, AC: 5 },
          { date: '2024-01-02', totalDifficulty: 3000, AC: 3 },
          { date: '2024-01-03', totalDifficulty: 7000, AC: 7 },
          { date: '2024-01-04', totalDifficulty: 4800, AC: 4 },
          { date: '2024-01-05', totalDifficulty: 7200, AC: 6 },
        ]}
      />
    ),
  },
} as const;
