import { Fragment, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { useMutation, useQueryClient } from "react-query"
import toast from "react-hot-toast"

/**
 * Import Components
 */
import { TrashIcon } from "@/components/Icons"

/**
 * Import helpers
 */
import { deleteSubmission } from "@/api/submissions"

/**
 * Import Types / Interfaces
 */
import { Cell } from "react-table"
import { Submission } from "@/types/Submission"
import { AxiosError } from "axios"
import PopupBuilder from "@/components/PopupBuilder"
import {
  Box,
  Button,
  HStack,
  ModalBody,
  ModalFooter,
  Text,
} from "@chakra-ui/react"

interface Practice {
  submissions: Submission[]
}

const Actions = (cell: Cell<Submission>) => {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)

  /**
   * Delete submission
   */
  const { mutate } = useMutation((id) => deleteSubmission(id), {
    onSuccess: () => {
      setIsOpen(false)
      const practice: Practice | undefined =
        queryClient.getQueryData("practice")
      /**
       * Update the state by removing the submission with the id
       */
      queryClient.setQueryData("practice", {
        submissions: practice?.submissions.filter(
          (el: Submission) => el.id !== cell.row.original.id
        ),
      })
      /**
       * Show toast message
       */
      toast.success("Problem deleted", { className: "toast" })
    },
    onError: (err: AxiosError) => {
      setIsOpen(false)
      /**
       * Show toast message
       */
      toast.error(err.response?.data.message, { className: "toast" })
    },
  })

  return (
    <div className="flex space-x-4">
      <Button
        size="sm"
        variant="outline"
        colorScheme="red"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        <TrashIcon width={16} height={16} />
      </Button>
      <PopupBuilder
        size="lg"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={`Delete ${cell.row.original.problem.pid}`}
      >
        <ModalBody>
          <Text>
            Are you sure you want to delete{" "}
            <Box as="span" fontWeight={500}>
              {cell.row.original.problem.name} ({cell.row.original.problem.pid})
            </Box>
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
              onClick={() => mutate(cell.value)}
            >
              Delete
            </Button>
          </HStack>
        </ModalFooter>
      </PopupBuilder>
    </div>
  )
}

export default Actions
