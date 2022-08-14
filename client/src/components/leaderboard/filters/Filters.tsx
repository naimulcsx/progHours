import { Badge, Box, useColorModeValue as mode, Text } from "@chakra-ui/react"
import { XIcon } from "@heroicons/react/outline"
import { FiltersMenu } from "./FiltersMenu"

export const LeaderboardFilters = ({ filters, setFilters }: any) => {
  const bg = mode("blue.50", "gray.700")
  const color = mode("blue.600", "blue.200")
  const borderColor = mode("blue.100", "gray.600")
  return (
    <Box mb={4}>
      <FiltersMenu filters={filters} setFilters={setFilters} />
      {Object.keys(filters).map((key: any) => {
        const obj: any = {
          eq: "==",
          gte: ">=",
          lte: "<=",
        }
        const name: any = {
          batch: "Batch",
          totalSolved: "Solved",
          totalSolveTime: "Solve Time",
        }
        return (
          <Badge
            key={key}
            bg={bg}
            rounded="full"
            py={1.5}
            px={3}
            ml={3}
            color={color}
            border="1px solid"
            borderColor={borderColor}
            display="inline-flex"
            gap={2}
          >
            <Text>
              {name[key]} {obj[filters[key].type]} {filters[key].value}
            </Text>
            <Box
              as="button"
              onClick={() => {
                setFilters((prev: any) => {
                  const newState = { ...prev }
                  delete newState[key]
                  return newState
                })
              }}
            >
              <XIcon height={16} />
            </Box>
          </Badge>
        )
      })}
    </Box>
  )
}
