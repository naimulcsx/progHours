import Navbar from "@/components/Navbar"
import ProgressBox from "@/components/ProgressBox"

export default function Profile() {
  const name = localStorage.getItem("name")
  return (
    <div className="">
      <Navbar />
      <div className="relative flex items-center justify-center py-48 bg-primary">
        <div className="space-y-3 text-center">
          <h1 className="text-white">{name}</h1>
          <h3 className="text-white">C181065</h3>
        </div>
      </div>
      <div className="relative -top-20">
        <ProgressBox />
      </div>
      {/* tracking problem table */}
    </div>
  )
}
