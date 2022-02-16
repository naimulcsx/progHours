import {
  CFIcon,
  SPOJIcon,
  CCIcon,
  LightOJIcon,
  UVAIcon,
  CSESIcon,
  TophIcon,
} from "@/components/Icons"

const ProblemName = (cell) => {
  const [pid, name] = cell.value.split("|-|")
  return (
    <div className="flex space-x-4">
      <div className="flex items-center justify-center h-10 bg-white border rounded-full basis-10">
        {pid.includes("CF-") && <CFIcon />}
        {pid.includes("SPOJ-") && <SPOJIcon />}
        {pid.includes("CC-") && <CCIcon />}
        {pid.includes("LOJ-") && <LightOJIcon />}
        {pid.includes("UVA-") && <UVAIcon />}
        {pid.includes("CSES-") && <CSESIcon />}
        {pid.includes("TH-") && <TophIcon />}
      </div>
      <div>
        <p className="font-medium text-gray-900">{pid}</p>
        <p className="text-sm text-gray-600">{name}</p>
      </div>
    </div>
  )
}

export default ProblemName
