import { deleteUserStudy } from "@/api/userStudies"
import { DEFAULT_TOAST_OPTIONS } from "@/configs/toast-config"
import {
  Box,
  Button,
  HStack,
  IconButton,
  ModalBody,
  ModalFooter,
  Text,
  useToast,
} from "@chakra-ui/react"
import { useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { TrashIcon } from "../Icons"
import PopupBuilder from "../PopupBuilder"

const DeleteStudyList = ({ item }: any) => {
  const { title, id } = item

  const [isOpen, setIsOpen] = useState(false)
  const toast = useToast(DEFAULT_TOAST_OPTIONS)

  const client = useQueryClient()
  const { mutate } = useMutation(deleteUserStudy, {
    onSuccess() {
      client.invalidateQueries("studies")
      toast({
        status: "success",
        title: "study deleted",
      })
      setIsOpen(false)
    },
    onError(err: any) {
      toast({
        status: "error",
        title: err.response.data.message,
      })
      setIsOpen(false)
    },
  })

  return (
    <Box>
      <IconButton
        aria-label="delete study button"
        variant={"outline"}
        border="none"
        color={"red.500"}
        onClick={() => setIsOpen(true)}
        icon={<TrashIcon />}
      />
      <PopupBuilder
        size="lg"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={`Delete ${title}`}
      >
        <ModalBody>
          <Text>
            <Text>Are you sure you want to delete ?</Text>
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
            <Button colorScheme="red" type="button" onClick={() => mutate(id)}>
              Delete
            </Button>
          </HStack>
        </ModalFooter>
      </PopupBuilder>
    </Box>
  )
}

export default DeleteStudyList
