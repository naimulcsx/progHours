import { createStyles } from "@mantine/core"

export const useProfileStatsCardStyles = createStyles((theme) => ({
  container: {
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      flexDirection: "column",
      alignItems: "start",
    },
  },
  value: {
    fontSize: theme.headings.sizes.h2.fontSize,
    fontWeight: 700,
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      fontSize: theme.headings.sizes.h3.fontSize,
    },
  },
  label: {
    fontSize: theme.headings.sizes.h4.fontSize,
    fontWeight: 500,
    color: theme.colorScheme === "dark" ? theme.colors.gray[4] : theme.colors.gray[7],
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      fontSize: theme.headings.sizes.h5.fontSize,
    },
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      fontSize: theme.headings.sizes.h6.fontSize,
    },
  },
}))
