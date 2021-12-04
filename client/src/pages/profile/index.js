import Navbar from "components/Navbar"
import ProgressBox from "components/ProgressBox"

export default function Profile() {
  return (
    <div className="">
      <Navbar />
      <div className="bg-primary flex items-center justify-center py-48 relative">
        <div className="text-center space-y-3 text-white">
          <h1 className="h1">Fahim Shahrier</h1>
          <h3 className="h3">C181059</h3>
        </div>
      </div>

      <div className="relative -top-20">
        <ProgressBox />
      </div>

      {/* tracking problem table */}
    </div>
  )
}
