import {
  useDisclosure,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Text,
  Box,
  Input,
  Checkbox,
  Select,
  Flex,
} from "@chakra-ui/react"
import { PlusIcon } from "@heroicons/react/outline"
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid"
import { useEffect, useState } from "react"

const NumberFilter = ({ name, setState }: { name: string; setState: any }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Box w="260px" borderBottom="1px" borderColor="gray.200" py={2}>
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
            <option value="eq"> = </option>
            <option value="gte"> ≥ </option>
            <option value="lte"> ≤ </option>
          </Select>
          <Input
            type="number"
            placeholder="eg. 46"
            w={48}
            size="sm"
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

export const FilterButton = ({ setFilters }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  // form states
  const [batch, setBatch] = useState({ type: "eq", enabled: false, value: 0 })
  const [totalSolved, setTotalSolved] = useState({
    type: "eq",
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

  return (
    <Menu isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <MenuButton
        as={Button}
        colorScheme="gray"
        size="sm"
        leftIcon={<PlusIcon height={14} />}
      >
        Filter
      </MenuButton>
      <MenuList py={0}>
        <NumberFilter name="Batch" setState={setBatch} />
        <NumberFilter name="Solve Count" setState={setTotalSolved} />
        {/* <NumberFilter name="Solve Time" state={batch} setState={setBatch} />
        <NumberFilter
          name="Average Difficulty"
          state={batch}
          setState={setBatch}
        /> */}
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
