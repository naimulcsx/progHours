import { deleteHandle } from "@/api/handle"
import { TrashIcon } from "@/components/Icons"
import PopupBuilder from "@/components/PopupBuilder"
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

const DeleteHandle = ({ title, id }: any) => {
  const [isOpen, setIsOpen] = useState(false)
  const toast = useToast(DEFAULT_TOAST_OPTIONS)

  const client = useQueryClient()
  const { mutate } = useMutation(deleteHandle, {
    onSuccess() {
      client.invalidateQueries("handles")
      toast({
        status: "success",
        title: "handle deleted",
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
        aria-label="delete handle button"
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
          <Text>Are you sure you want to delete ?</Text>
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
    </Box>
  )
}

export default DeleteHandle
