import { useMutation, useQueryClient } from "react-query"
import { TrashIcon, EditIcon } from "@/components/Icons"
import { getSubmissions, deleteSubmission } from "@/api/submissions"
import { toast } from "react-toastify"

const Actions = (cell) => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation((id) => deleteSubmission(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("practice", getSubmissions)
      toast.success("Problem Deleted", { className: "toast" })
    },
    onError: (err) => {
      toast.error(err.response.data.message, { className: "toast" })
    },
  })
  return (
    <div className="flex space-x-4">
      <EditIcon className="w-[22px] h-[22px] text-dark" aria-hidden="true" />
      <button onClick={() => mutate(cell.value)}>
        <TrashIcon
          className="w-[22px] h-[22px] text-red-500"
          aria-hidden="true"
        />
      </button>
    </div>
  )
}

export default Actions
