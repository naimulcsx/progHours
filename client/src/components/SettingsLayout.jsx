import Navbar from "./Navbar"

const SettingsLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      <div className="grid max-w-6xl grid-cols-7 gap-20 px-4 mx-auto mt-24">
        <div className="col-span-2">
          <h2>Settings</h2>
          <p className="mt-2 text-gray-500">Update and manage your account</p>
        </div>
        <div className="col-span-5 p-12 bg-white rounded shadow">
          {children}
        </div>
      </div>
    </div>
  )
}

export default SettingsLayout
