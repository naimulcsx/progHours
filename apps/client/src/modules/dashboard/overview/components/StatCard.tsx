import { Box, Group, Paper, Text, Title } from "@mantine/core";
import { ReactNode } from "react";

export interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string;
}

export function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <Paper p="lg">
      <Group>
        {icon}
        <Box>
          <Title order={5} fw={500}>
            {label}
          </Title>
          <Text fw={700} size="xl">
            {value}
          </Text>
        </Box>
      </Group>
    </Paper>
  );
}
