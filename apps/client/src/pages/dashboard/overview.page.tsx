import { Group, SimpleGrid, Title, Tooltip } from "@mantine/core";
import { IconInfoCircle } from "~/assets/icons";
import { DashboardLayout } from "~/modules/common/components/DashboardLayout";
import { StatCard } from "~/modules/dashboard/overview/components/StatCard";

import { IconEnergy, IconFlag, IconPoints, IconTime } from "~/assets/icons";

export default function OverviewPage() {
  return (
    <DashboardLayout>
      <Group>
        <Title order={3}>Overview </Title>
        <Tooltip label="Latest data may experience a delay of up to 5 minutes.">
          <IconInfoCircle width={16} height={16} />
        </Tooltip>
      </Group>
      <SimpleGrid mt="lg" cols={4}>
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
    </DashboardLayout>
  );
}
