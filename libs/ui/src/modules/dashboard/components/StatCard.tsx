import { ReactNode } from "react";

import { Box, Group, Paper, Text } from "@mantine/core";

export interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
}

export function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <Paper p="lg">
      <Group>
        {icon}
        <Box>
          <Text size="sm" fw={400} variant="proghours-ui-strong">
            {label}
          </Text>
          <Text fw={600} variant="proghours-ui-strong" fz={24}>
            {value}
          </Text>
        </Box>
      </Group>
    </Paper>
  );
}
