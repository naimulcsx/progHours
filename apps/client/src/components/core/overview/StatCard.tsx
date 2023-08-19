import { Box, Group, Paper, Text, Title, useMantineTheme } from "@mantine/core";
import { ReactNode } from "react";

export interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string;
}

export function StatCard({ icon, label, value }: StatCardProps) {
  const theme = useMantineTheme();
  return (
    <Paper>
      <Group>
        {icon}
        <Box>
          <Title order={5} fw={500}>
            {label}
          </Title>
          <Text fw={700} style={{ fontSize: theme.headings.sizes.h3.fontSize }}>
            {value}
          </Text>
        </Box>
      </Group>
    </Paper>
  );
}
