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
import { Button } from "@chakra-ui/react"

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
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Delete Submission"
      >
        <p className="test-sm">
          Are you sure you want to delete this submission?
        </p>

        <div className="flex justify-end mt-12 space-x-4">
          <button
            type="button"
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-600 border border-transparent rounded-md bg-gray-200/75 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-[#d11a2a]/75 border border-transparent rounded-md hover:bg-[#d11a2a] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
            onClick={() => mutate(cell.value)}
          >
            Delete
          </button>
        </div>
      </PopupBuilder>
    </div>
  )
}

export default Actions
