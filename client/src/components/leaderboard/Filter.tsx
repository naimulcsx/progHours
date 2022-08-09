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
import { useState } from "react"

const NumberFilter = ({
  name,
  state,
  setState,
}: {
  name: string
  state: number
  setState: any
}) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Box w="full" borderBottom="1px" borderColor="gray.200" py={2}>
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
            onChange={(e) => setIsOpen(e.target.checked)}
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
        <Flex p={2} background="blue.50" rounded="sm">
          <Select size="sm" w={20}>
            <option value="gte"> ≥ </option>
            <option value="eq"> = </option>
            <option value="lte"> ≤ </option>
          </Select>
          <Input
            type="number"
            placeholder="eg. 46"
            w={48}
            size="sm"
            onChange={(e) => setState(Number(e.target.value))}
          />
        </Flex>
      )}
    </Box>
  )
}

export const Filter = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [filters, setFilters] = useState<any>([])
  const [batch, setBatch] = useState(0)

  const applyFilters = () => {
    setFilters(
      filters.concat({
        type: "batch",
        value: batch,
      })
    )
  }

  console.log(filters)

  return (
    <Menu>
      <MenuButton
        as={Button}
        colorScheme="gray"
        size="sm"
        leftIcon={<PlusIcon height={14} />}
      >
        Filter
      </MenuButton>
      <MenuList onMouseEnter={onOpen} py={0}>
        <NumberFilter name="Batch" state={batch} setState={setBatch} />

        <Button
          size="sm"
          colorScheme="gray"
          mt={4}
          mb={1}
          onClick={applyFilters}
        >
          Apply
        </Button>
      </MenuList>
    </Menu>
  )
}
