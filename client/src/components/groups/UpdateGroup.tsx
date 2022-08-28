import {
  Box,
  Button,
  Flex,
  useToast,
  useColorModeValue as mode,
  Heading,
  Alert,
  AlertIcon,
  Stack,
} from "@chakra-ui/react"
import FormBuilder from "../FormBuilder"
import * as Yup from "yup"
import { DEFAULT_TOAST_OPTIONS } from "@/configs/toast-config"
import { useQueryClient } from "react-query"
import { TrashIcon } from "@heroicons/react/outline"
import { DeleteGroupModal } from "../modals/DeleteGroupModal"
import { useState } from "react"
import { editGroup } from "@/api/groups"
import { useNavigate } from "react-router-dom"

const UpdateGroup = ({ group }: any) => {
  const [isOpen, setIsOpen] = useState(false)

  const toast = useToast(DEFAULT_TOAST_OPTIONS)
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  return (
    <Box
      p={[4, 4, 4, 8]}
      bg={mode("white", "gray.700")}
      shadow="base"
      rounded="lg"
      mx={-4}
    >
      <FormBuilder
        fields={{
          name: {
            type: "text",
            label: "Group Name",
            validate: Yup.string().trim().required("Group Name is required"),
            initialValue: group?.name,
          },
          hashtag: {
            type: "text",
            label: "Hashtag",
            leftAddon: "#",
            validate: Yup.string().trim().required("Group tag is required"),
            initialValue: group?.hashtag,
          },
        }}
        mutation={(values: any) => {
          return editGroup(group.id, values)
        }}
        onSuccess={(data) => {
          queryClient.invalidateQueries(`groups/${group?.hashtag}`)
          toast({ status: "success", title: "Group Info updated" })

          navigate(`/groups/${data?.body.group.hashtag}`)
        }}
        onError={(err) => {
          const errorMessage =
            err?.response?.data?.message || "Something went wrong!"
          toast({ status: "error", title: errorMessage })
        }}
        button={{
          label: "Save",
          loadingLabel: "Saving...",
        }}
      />

      <Stack mt={"8"} align="start" spacing={4}>
        <Alert status="warning">
          <AlertIcon />
          Warning! This will delete your group permanently.
        </Alert>
        <Button
          leftIcon={<TrashIcon height={20} />}
          colorScheme="red"
          variant="solid"
          onClick={() => setIsOpen(true)}
        >
          Delete Group
        </Button>
      </Stack>

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

export default UpdateGroup
