import { ReactNode } from "react"
import { Box, Group, Paper, Text, Title } from "@mantine/core"
import { useProfileStatsCardStyles } from "./ProfileStatsCard.styles"

export default function ProfileStatsCard({ data, icon }: ProfileStatsCardProps) {
  const { classes } = useProfileStatsCardStyles()
  return (
    <Paper p="xl" shadow="xs" sx={{ height: "100%" }}>
      <Group className={classes.container}>
        <Box>{icon}</Box>
        <Box>
          <Text className={classes.value}>{data.value}</Text>
          <Title className={classes.label}>{data.label}</Title>
        </Box>
      </Group>
    </Paper>
  )
}

export interface ProfileStatsCardProps {
  icon: ReactNode
  data: {
    label: string
    value: string | number
  }
}
