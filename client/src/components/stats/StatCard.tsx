import { Box, Group, Paper, Stack, Text, Title } from "@mantine/core"

export const StatCard = (props: any) => {
  const { data, icon } = props
  const { label, value } = data
  return (
    <Paper p="xl" shadow="xs" sx={{ height: "100%" }}>
      <Group
        sx={(theme) => ({
          [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            flexDirection: "column",
            alignItems: "start",
          },
        })}
      >
        <Box>{icon}</Box>
        <Box>
          <Text
            sx={(theme) => ({
              fontSize: theme.headings.sizes.h2.fontSize,
              fontWeight: 700,
              [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
                fontSize: theme.headings.sizes.h3.fontSize,
              },
            })}
          >
            {value}
          </Text>
          <Title
            sx={(theme) => ({
              fontSize: theme.headings.sizes.h4.fontSize,
              fontWeight: 500,
              color: theme.colors.gray[7],
              [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
                fontSize: theme.headings.sizes.h5.fontSize,
              },
              [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
                fontSize: theme.headings.sizes.h6.fontSize,
              },
            })}
          >
            {label}
          </Title>
        </Box>
      </Group>
    </Paper>
  )
}
