import { Box, Group, Paper, Stack, Text, Title } from "@mantine/core"

export const StatCard = (props: any) => {
  const { data, icon } = props
  const { label, value } = data
  return (
    <Paper p="xl" shadow="xs" sx={{ height: "100%" }}>
      <Group>
        <Box>{icon}</Box>
        <Box>
          <Text
            sx={(theme) => ({
              fontSize: theme.headings.sizes.h2.fontSize,
              fontWeight: 700,
            })}
          >
            {value}
          </Text>
          <Title
            order={4}
            sx={(theme) => ({ fontWeight: 500, color: theme.colors.gray[7] })}
          >
            {label}
          </Title>
        </Box>
      </Group>
    </Paper>
  )
}
