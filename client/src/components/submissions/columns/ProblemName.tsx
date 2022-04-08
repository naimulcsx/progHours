import {
  CFIcon,
  SPOJIcon,
  CCIcon,
  LightOJIcon,
  UVAIcon,
  CSESIcon,
  TophIcon,
  AtCoder,
  OpenLinkIcon,
  UnknownIcon,
  EOlympIcon,
  BeeCrowd,
  HackerRankIcon,
} from "@/components/Icons"
import { useRef, useState } from "react"
import { useMutation } from "react-query"
import { updateSubmission } from "@/api/submissions"
import { toast } from "react-toastify"
import { ExternalLinkIcon } from "@heroicons/react/outline"
import { Cell } from "react-table"
import { Submission } from "@/types/Submission"
import { AxiosError } from "axios"

const ProblemName = (cell: Cell<Submission>) => {
  const { pid, name, link } = cell.row.original.problem

  const iconMap = [
    { prefix: "Gym-", icon: CFIcon },
    { prefix: "CF-", icon: CFIcon },
    { prefix: "SPOJ-", icon: SPOJIcon },
    { prefix: "CC-", icon: CCIcon },
    { prefix: "LOJ-", icon: LightOJIcon },
    { prefix: "UVA-", icon: UVAIcon },
    { prefix: "CSES-", icon: CSESIcon },
    { prefix: "TH-", icon: TophIcon },
    { prefix: "AC-", icon: AtCoder },
    { prefix: "EOlymp-", icon: EOlympIcon },
    { prefix: "Bee-", icon: BeeCrowd },
    { prefix: "HR-", icon: HackerRankIcon },
  ]

  const icons = iconMap
    .map((item, i) =>
      pid.includes(item.prefix) ? <item.icon key={i} /> : null
    )
    .filter((item) => item !== null)

  const prevRef = useRef(name)
  const [pname, setpName] = useState(name)
  const [focused, setFocused] = useState(false)

  const { mutate } = useMutation(updateSubmission, {
    onSuccess: () => {
      toast.success("Problem updated", { className: "toast" })
    },
    onError: (err: AxiosError) => {
      toast.error(err.response?.data.message, { className: "toast" })
    },
  })

  const handleFocus = () => {
    setFocused(true)
  }

  const handleBlur = () => {
    setFocused(false)
    if (prevRef.current !== pname) {
      mutate({
        id: cell.row.original.id,
        problemId: cell.row.original.problem.id,
        name: pname,
      })
      prevRef.current = pname
    }
  }

  return (
    <div className="flex space-x-4">
      <div className="flex items-center justify-center h-10 overflow-hidden bg-white border rounded-full basis-10 grow-0 shrink-0">
        {icons.length > 0 && icons}
        {icons.length === 0 && <UnknownIcon size={20} />}
      </div>
      <div className="w-full">
        {/* {link} */}
        <p className="flex space-x-3 font-medium text-gray-900">
          <span>{pid}</span>
          <a href={link} target="_blank">
            <ExternalLinkIcon className="w-4 h-4 text-gray-600 relative top-[2px]"></ExternalLinkIcon>
          </a>
        </p>
        {icons.length > 0 && (
          <p className="-mt-[0.5px] text-sm text-gray-600 truncate">{name}</p>
        )}
        {icons.length === 0 && (
          <p className="-mt-[0.5px] text-sm">
            <input
              className={focused ? "inset" : "w-full"}
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={pname}
              onChange={(e) => setpName(e.target.value)}
            />
          </p>
        )}
      </div>
    </div>
  )
}

export default ProblemName
