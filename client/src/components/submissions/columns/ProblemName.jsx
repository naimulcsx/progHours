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
} from "@/components/Icons"
import { useRef, useState } from "react"
import { useMutation } from "react-query"
import { updateSubmission } from "@/api/submissions"
import { toast } from "react-toastify"

const ProblemName = (cell) => {
  const [pid, name, link] = cell.value.split("|-|")
  const iconMap = [
    { prefix: "CF-", icon: CFIcon },
    { prefix: "SPOJ-", icon: SPOJIcon },
    { prefix: "CC-", icon: CCIcon },
    { prefix: "LOJ-", icon: LightOJIcon },
    { prefix: "UVA-", icon: UVAIcon },
    { prefix: "CSES-", icon: CSESIcon },
    { prefix: "TH-", icon: TophIcon },
    { prefix: "AC-", icon: AtCoder },
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
    onSuccess: (data) => {
      console.log(data)
      toast.success("Problem updated", { className: "toast" })
    },
    onError: (err) => {
      toast.error(err.response.data.message, { className: "toast" })
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
      <div className="flex items-center justify-center h-10 bg-white border rounded-full basis-10">
        {icons.length > 0 && icons}
        {icons.length === 0 && <UnknownIcon size={20} />}
      </div>
      <div>
        {/* {link} */}
        <p className="flex space-x-3 font-medium text-gray-900">
          <span>{pid}</span>
          <a href={link} target="_blank">
            <OpenLinkIcon
              size={16}
              className="relative top-[2px]"
            ></OpenLinkIcon>
          </a>
        </p>
        {icons.length > 0 && <p className="text-sm text-gray-600">{name}</p>}
        {icons.length === 0 && (
          <p className="text-sm">
            <input
              className={focused ? "inset" : ""}
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
