import {
  Anchor,
  Box,
  Group,
  HoverCard,
  MantineTheme,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core"
import { DateRangePicker, DateRangePickerValue } from "@mantine/dates"
import { useEffect, useState } from "react"
import moment from "moment"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import axios from "axios"
import { motion } from "framer-motion"
import { DataGrid } from "../datagrid"
import convertMinsToHours from "~/utils/convertMinsToHours"
import { Link } from "react-router-dom"

async function getProgress(slug: string, value: DateRangePickerValue) {
  const fromDate = moment(value[0]).format("YYYY-MM-DD")
  const toDate = moment(value[1]).format("YYYY-MM-DD")
  return axios
    .get(`/api/stats/progress?groupSlug=${slug}&fromDate=${fromDate}&toDate=${toDate}`)
    .then((res) => res.data)
}

function getStyles(solveTime: number, theme: MantineTheme) {
  if (solveTime > 0 && solveTime <= 60) {
    return {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2], // 0 - 1h
    }
  } else if (solveTime <= 120) {
    return {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[4], // 1 - 2h
    }
  } else if (solveTime <= 180) {
    return {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.green[4] : theme.colors.green[2], // 2 - 3h
    }
  } else if (solveTime <= 240) {
    return {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.green[6] : theme.colors.green[4], // 3 - 4h
    }
  } else if (solveTime <= 300) {
    return {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.green[8] : theme.colors.green[6], // 4 - 5h
    }
  } else {
    return {
      backgroundColor: theme.colors.green[9], // 5h +
    }
  }
}

export default function ProgressTable() {
  const theme = useMantineTheme()
  const { slug } = useParams()
  const [value, setValue] = useState<DateRangePickerValue>([
    moment().subtract(7, "days").toDate(),
    moment().toDate(),
  ])

  const days = moment(value[1]).diff(moment(value[0]), "days")
  const progressQuery = useQuery(`groups/${slug}/progress`, () => getProgress(slug || "", value))

  // useEffect(() => {
  //   if (value[0] && value[1]) {
  //     progressQuery.refetch()
  //   }
  // }, [value])

  return (
    <>
      <Group position="apart" align="start" spacing={4} mb="md">
        <Title order={4}>Activity Calendar</Title>
        <DateRangePicker
          placeholder="Pick dates range"
          value={value}
          onChange={setValue}
          sx={{ minWidth: 260 }}
          size="xs"
        />
      </Group>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        transition={{ delay: 0.25, duration: 0.35 }}
      >
        {progressQuery.data?.data && (
          <Box
            sx={(theme) => ({
              boxShadow: theme.shadows.xs,
              marginLeft: -16,
              marginRight: -16,
              // borderRadius: theme.radius.md,
              overflow: "clip",
            })}
          >
            <DataGrid
              bordered
              horizontalSpacing="xl"
              id="progress-table"
              data={progressQuery.data?.data || []}
              withPagination
              pageSizes={["10", "15", "25", "50", "100"]}
              initialState={{ pagination: { pageSize: 10 } }}
              columns={[
                {
                  header: "Student",
                  accessorKey: "username",
                  cell: (cell) => {
                    const username = cell.getValue() as string
                    const name = cell.row.original.name as string
                    return (
                      <Anchor
                        component={Link}
                        to={`/${username.toUpperCase()}`}
                        sx={{
                          fontWeight: 500,
                          color: theme.colorScheme === "dark" ? theme.white : theme.colors.dark[9],
                        }}
                      >
                        <Text>{name}</Text>
                        <Text>{username.toUpperCase()}</Text>
                      </Anchor>
                    )
                  },
                  size: 210,
                },
                ...Array(days + 1 || 0)
                  ?.fill(0)
                  ?.map((_, idx) => {
                    return {
                      id: idx.toString(),
                      header: moment(value[0]).add(idx, "day").format("DD-MM-YYYY"),
                      accessorKey: "stats",
                      cell: (cell: any) => {
                        const list = cell.getValue()
                        return (
                          <Box>
                            {list?.map((item: any) => {
                              if (
                                moment(item.date).format("DD-MM-YYYY") ===
                                moment(value[0]).add(idx, "day").format("DD-MM-YYYY")
                              ) {
                                return (
                                  <Group key={item.date + idx} position="center">
                                    <HoverCard width={280} shadow="md">
                                      <HoverCard.Target>
                                        <Box
                                          sx={(theme) => ({
                                            ...getStyles(item.totalSolveTime, theme),
                                            color: "white",
                                            height: 32,
                                            width: 64,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: theme.radius.md,
                                          })}
                                        >
                                          {item.totalSolved}
                                        </Box>
                                      </HoverCard.Target>
                                      <HoverCard.Dropdown>
                                        <Text size="sm">
                                          <Text>
                                            <span style={{ fontWeight: 500 }}>Total solved:</span>{" "}
                                            {item.totalSolved}
                                          </Text>
                                          <Text>
                                            <span style={{ fontWeight: 500 }}>Solve time:</span>{" "}
                                            {convertMinsToHours(item.totalSolveTime)}
                                          </Text>
                                          <Text>
                                            <span style={{ fontWeight: 500 }}>Avg Difficulty:</span>{" "}
                                            {(
                                              item.totalDifficulty /
                                                item.totalSolvedWithDifficulty || 0
                                            ).toFixed(2)}
                                          </Text>
                                        </Text>
                                      </HoverCard.Dropdown>
                                    </HoverCard>
                                  </Group>
                                )
                              }
                            })}
                          </Box>
                        )
                      },
                      size: 80,
                    }
                  }),
              ]}
            ></DataGrid>
          </Box>
        )}
      </motion.div>
    </>
  )
}
