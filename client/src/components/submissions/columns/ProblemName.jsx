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
        <p className="text-sm text-gray-600">{name}</p>
      </div>
    </div>
  )
}

export default ProblemName
