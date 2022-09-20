import { Box, Group, Paper, Stack, Text, Title } from "@mantine/core"

export const StatCard = (props: any) => {
  const { data, icon } = props
  const { label, value } = data
  return (
    <Paper p="xl" shadow="xs">
      <Group>
        <Box
          sx={(theme) => ({
            color: theme.colors[theme.primaryColor][5],
            background: theme.colors[theme.primaryColor][0],
            width: 40,
            height: 40,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
          })}
        >
          {icon}
        </Box>
        <Box>
          <Title order={4} sx={{ fontWeight: 500 }}>
            {label}
          </Title>
          <Text
            sx={(theme) => ({
              fontSize: theme.headings.sizes.h2.fontSize,
              fontWeight: 700,
            })}
          >
            {value}
          </Text>
        </Box>
      </Group>
    </Paper>
  )
}
