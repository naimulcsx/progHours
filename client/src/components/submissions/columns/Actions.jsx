import { useMutation, useQueryClient } from "react-query"
import { TrashIcon, EditIcon } from "@/components/Icons"

const Actions = (cell) => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation((id) => deleteSubmission(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("practice", getSubmissions)
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
