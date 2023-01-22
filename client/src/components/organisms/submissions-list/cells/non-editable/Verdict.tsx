import { Badge, Box, MantineTheme, Text } from "@mantine/core"
import { Submission } from "~/types/Submission"
import { CellContext } from "@tanstack/react-table"

const NonEditableVerdict = (cell: CellContext<Submission, unknown>) => {
  let value = cell.getValue() as string

  const getStyles: any = (theme: MantineTheme) => ({
    AC: {
      borderColor: theme.colors.green[6],
      background: theme.colors.green[8],
      color: theme.colors.green[0],
      fontWeight: 600,
    },
    WA: {
      borderColor: theme.colors.red[6],
      background: theme.colors.red[8],
      color: theme.colors.red[0],
      fontWeight: 600,
    },
    TLE: {
      borderColor: theme.colors.yellow[6],
      background: theme.colors.yellow[8],
      color: theme.colors.yellow[0],
      fontWeight: 600,
    },
  })

  const getLightStyles: any = (theme: MantineTheme) => ({
    AC: {
      borderColor: theme.colors.green[6],
      background: theme.colors.green[5],
      color: theme.colors.green[0],
      fontWeight: 600,
    },
    WA: {
      borderColor: theme.colors.red[6],
      background: theme.colors.red[5],
      color: theme.colors.red[0],
      fontWeight: 600,
    },
    TLE: {
      borderColor: theme.colors.yellow[6],
      background: theme.colors.yellow[5],
      color: theme.colors.yellow[0],
      fontWeight: 600,
    },
  })

  return (
    <Box
      sx={(theme) => ({
        width: 70,
        textAlign: "center",
        padding: "6px 12px",
        borderRadius: theme.radius.md,
        boxShadow: theme.shadows.sm,
        border: "1px solid",
        ...(theme.colorScheme === "dark" ? getStyles(theme)[value] : getLightStyles(theme)[value]),
      })}
    >
      <Text>{value}</Text>
    </Box>
  )
}

export default NonEditableVerdict
