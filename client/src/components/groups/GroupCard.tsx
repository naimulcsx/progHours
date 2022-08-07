import {
  Heading,
  Badge,
  Box,
  Text,
  useColorModeValue as mode,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react"
import { DotsVerticalIcon, TrashIcon } from "@heroicons/react/solid"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { DeleteGroupModal } from "../modals/DeleteGroupModal"

const GroupCard = ({ group, role }: any) => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  return (
    <Box
      position="relative"
      bg={mode("white", "gray.700")}
      key={group.id}
      shadow="base"
      rounded="lg"
      p={6}
    >
      <Link to={`/groups/${group.hashtag}`}>
        <Heading size="md">{group.name}</Heading>
      </Link>

      <Link to={`/groups/${group.hashtag}`}>
        <Text color={mode("blue.500", "blue.300")} fontWeight="500">
          #{group.hashtag}
        </Text>
      </Link>
      <Badge colorScheme="purple">{role}</Badge>
      <Menu>
        <MenuButton
          position="absolute"
          right={2}
          top={2}
          as={IconButton}
          aria-label="Options"
          icon={<DotsVerticalIcon height={20} />}
          variant="ghost"
          colorScheme="gray"
          size="sm"
        />
        <MenuList>
          <MenuItem
            icon={<TrashIcon height={20} />}
            onClick={() => setIsOpen(true)}
          >
            Delete Group
          </MenuItem>
        </MenuList>
      </Menu>

      {/* delete popup */}
      <DeleteGroupModal
        id={group.id}
        name={group.name}
        hashtag={group.hashtag}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </Box>
  )
}

export default GroupCard
