import { deleteGroup } from "@/api/groups"
import { DEFAULT_TOAST_OPTIONS } from "@/configs/toast-config"
import {
  ModalBody,
  ModalFooter,
  HStack,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react"
import { useMutation, useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"
import PopupBuilder from "../PopupBuilder"

export const DeleteGroupModal = ({
  isOpen,
  setIsOpen,
  name,
  hashtag,
  id,
}: any) => {
  const toast = useToast(DEFAULT_TOAST_OPTIONS)
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const { mutate } = useMutation(deleteGroup, {
    onSuccess: () => {
      toast({ status: "success", title: "Group deleted!" })
      queryClient.invalidateQueries("groups")
      navigate("/groups")
    },
  })
  return (
    <PopupBuilder
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={`Delete group: ${name}?`}
    >
      <ModalBody>
        <Text>
          Are you sure you want to delete:{" "}
          <Text as="span" color="blue.500" fontWeight={500}>
            #{hashtag}
          </Text>
          ?
        </Text>
      </ModalBody>
      <ModalFooter>
        <HStack>
          <Button
            colorScheme="gray"
            type="button"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            colorScheme="red"
            type="button"
            onClick={() => {
              mutate(id)
              setIsOpen(false)
            }}
          >
            Delete
          </Button>
        </HStack>
      </ModalFooter>
    </PopupBuilder>
  )
}
