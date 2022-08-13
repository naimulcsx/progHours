import {
  useDisclosure,
  Menu,
  MenuButton,
  Button,
  MenuList,
  Text,
  Box,
  Input,
  Checkbox,
  Select,
  Flex,
  useColorModeValue as mode,
} from "@chakra-ui/react"
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid"

import { FilterIcon } from "@heroicons/react/outline"
import { useEffect, useState } from "react"

const NumberFilter = ({
  name,
  state,
  setState,
}: {
  name: string
  state: any
  setState: any
}) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Box
      w="260px"
      borderBottom="1px"
      borderColor={mode("gray.200", "gray.600")}
      py={2}
    >
      <Box mx={4}>
        <Button
          onClick={() => setIsOpen((prev) => !prev)}
          variant="unstyled"
          display="flex"
          justifyContent="space-between"
          w="full"
          size="sm"
          overflow="hidden"
        >
          <Checkbox
            height={20}
            width={20}
            isChecked={state.enabled}
            onChange={(e) => {
              setState((prev: any) => ({
                ...prev,
                enabled: !prev.enabled,
              }))
              setIsOpen(e.target.checked)
            }}
          >
            <Text fontSize="14px">{name}</Text>
          </Checkbox>
          {isOpen ? (
            <ChevronUpIcon height={18} />
          ) : (
            <ChevronDownIcon height={18} />
          )}
        </Button>
      </Box>
      {isOpen && (
        <Flex p={2} rounded="sm" gap={2}>
          <Select
            size="sm"
            w={20}
            onChange={(e) =>
              setState((prev: any) => ({
                ...prev,
                type: e.target.value,
              }))
            }
          >
            <option value="eq" selected={state.type === "eq"}>
              {" "}
              ={" "}
            </option>
            <option value="gte" selected={state.type === "gte"}>
              {" "}
              ≥{" "}
            </option>
            <option value="lte" selected={state.type === "lte"}>
              {" "}
              ≤{" "}
            </option>
          </Select>
          <Input
            type="number"
            placeholder="eg. 46"
            w={48}
            size="sm"
            value={state.value || ""}
            onChange={(e) =>
              setState((prev: any) => ({
                ...prev,
                value: Number(e.target.value),
              }))
            }
          />
        </Flex>
      )}
    </Box>
  )
}

export const LeaderboardFilters = ({ setFilters, filters }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  // form states
  const [batch, setBatch] = useState({ type: "eq", enabled: false, value: 0 })
  const [totalSolved, setTotalSolved] = useState({
    type: "gte",
    enabled: false,
    value: 0,
  })

  // filter object
  const [localFilters, setLocalFilters] = useState<any>([])

  useEffect(() => {
    const filters: any = {}

    if (batch.value > 0 && batch.enabled) filters.batch = batch

    if (totalSolved.value > 0 && totalSolved.enabled)
      filters.totalSolved = totalSolved

    setLocalFilters(filters)
  }, [batch, totalSolved])

  useEffect(() => {
    if (!filters.batch) {
      setBatch({ type: "eq", enabled: false, value: 0 })
    }
    if (!filters.totalSolved) {
      setTotalSolved({ type: "gte", enabled: false, value: 0 })
    }
    setLocalFilters(filters)
  }, [filters])

  return (
    <Menu
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      closeOnSelect={false}
    >
      <MenuButton
        as={Button}
        colorScheme={Object.keys(filters).length > 0 ? "blue" : "gray"}
        size="sm"
        leftIcon={<FilterIcon height={16} />}
      >
        Filter
      </MenuButton>
      <MenuList py={0}>
        <NumberFilter name="Batch" state={batch} setState={setBatch} />
        <NumberFilter
          name="Solve Count"
          state={totalSolved}
          setState={setTotalSolved}
        />
        <Box px={4}>
          <Button
            size="sm"
            colorScheme="gray"
            my={2}
            w="full"
            onClick={() => {
              setFilters(localFilters)
              onClose()
            }}
          >
            Apply
          </Button>
        </Box>
      </MenuList>
    </Menu>
  )
}
