import { useState } from "react"
import { useMutation, useQueryClient } from "react-query"

/**
 * Import Components
 */
// import { TrashIcon } from "@/components/Icons"
import { TrashIcon } from "@heroicons/react/outline"

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
import { useToast } from "@chakra-ui/react"
import { DEFAULT_TOAST_OPTIONS } from "@/configs/toast-config"
import { CellContext } from "@tanstack/react-table"
import { Box, Button, Group } from "@mantine/core"
import { IconPencil, IconTrash } from "@tabler/icons"

interface Practice {
  body: {
    submissions: Submission[]
  }
}

const Actions = (cell: CellContext<Submission, unknown>) => {
  const toast = useToast(DEFAULT_TOAST_OPTIONS)
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)

  /**
   * Delete submission
   */
  const { mutate } = useMutation((id) => deleteSubmission(id), {
    onSuccess: (res) => {
      setIsOpen(false)
      const prevState: Practice | undefined =
        queryClient.getQueryData("submissions")
      /**
       * Update the state by removing the submission with the id
       */
      queryClient.setQueryData("submissions", {
        body: {
          submissions: prevState?.body.submissions.filter(
            (el: Submission) => el.id !== cell.row.original.id
          ),
        },
      })
      /**
       * Show toast message
       */
      toast({
        status: "success",
        title: res.message,
      })
    },
    onError: (err: AxiosError) => {
      setIsOpen(false)
      /**
       * Show toast message
       */
      // toast.error(err.response?.data.message, { className: "toast" })
    },
  })

  return (
    <Group>
      <Button
        variant="outline"
        color="purple"
        size="xs"
        sx={(theme) => ({
          height: 24,
          paddingLeft: 6,
          paddingRight: 6,
        })}
      >
        <IconPencil size={16} />
      </Button>
      <Button
        variant="outline"
        color="red"
        size="xs"
        sx={(theme) => ({
          height: 24,
          paddingLeft: 6,
          paddingRight: 6,
        })}
      >
        <IconTrash size={16} />
      </Button>
    </Group>
    // <div className="flex space-x-4">
    //   <Button
    //     size="xs"
    //     variant="outline"
    //     colorScheme="red"
    //     onClick={() => setIsOpen(true)}
    //     type="button"
    //   >
    //     <TrashIcon width={16} height={16} />
    //   </Button>
    //   <PopupBuilder
    //     size="lg"
    //     isOpen={isOpen}
    //     setIsOpen={setIsOpen}
    //     title={`Delete ${cell.row.original.problem.pid}`}
    //   >
    //     <ModalBody>
    //       <Text>
    //         Are you sure you want to delete{" "}
    //         <Box as="span" fontWeight={500}>
    //           {cell.row.original.problem.name} ({cell.row.original.problem.pid})
    //         </Box>
    //         ?
    //       </Text>
    //     </ModalBody>
    //     <ModalFooter>
    //       <HStack>
    //         <Button
    //           colorScheme="gray"
    //           type="button"
    //           onClick={() => setIsOpen(false)}
    //         >
    //           Cancel
    //         </Button>
    //         <Button
    //           colorScheme="red"
    //           type="button"
    //           onClick={() => mutate(cell.value)}
    //         >
    //           Delete
    //         </Button>
    //       </HStack>
    //     </ModalFooter>
    //   </PopupBuilder>
    // </div>
  )
}

export default Actions
