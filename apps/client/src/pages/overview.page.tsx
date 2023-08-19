import {
  Box,
  Container,
  Paper,
  SimpleGrid,
  Title,
  Tooltip
} from "@mantine/core";
import {
  IconEnergy,
  IconFlag,
  IconInfoCircle,
  IconPoints,
  IconTime
} from "~/assets/icons";
import { DashboardLayout } from "~/components/common/dashboard/Layout";
import { StatCard } from "~/components/core/overview/StatCard";
import { WeeklySolvedChart } from "~/components/core/overview/charts/WeeklySolvedChart";

export default function OverviewPage() {
  return (
    <DashboardLayout>
      <Container size="xl" px={0}>
        <Title order={3}>
          Overview{" "}
          <Tooltip label="Latest data may experience a delay of up to 5 minutes.">
            <Box component="span" ml="xs">
              <IconInfoCircle width={16} height={16} />
            </Box>
          </Tooltip>
        </Title>
        <SimpleGrid mt="xl" cols={4}>
          <StatCard
            icon={<IconPoints width={40} height={40} />}
            label="Points"
            value="778.22"
          />
          <StatCard
            icon={<IconFlag width={40} height={40} />}
            label="Problem Solved"
            value="29"
          />
          <StatCard
            icon={<IconTime width={40} height={40} />}
            label="Solve Time"
            value="8h 22m"
          />
          <StatCard
            icon={<IconEnergy width={40} height={40} />}
            label="Average Difficulty"
            value="1004.76"
          />
        </SimpleGrid>
        <SimpleGrid mt="md" cols={2}>
          <Paper>
            <WeeklySolvedChart />
          </Paper>
          <Paper>{/* <WeeklySolvedCharts /> */}</Paper>
        </SimpleGrid>
      </Container>
    </DashboardLayout>
  );
}
