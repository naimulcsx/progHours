import Navbar from "@/components/Navbar"
import Sidebar from "@/components/dashboard/Sidebar"

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen w-auto">
      {/* topbar */}
      <Navbar />
      {/* sidebar */}
      <div className="flex">
        <Sidebar />
        {/* main content */}
        <div className=" bg-light w-full min-h-screen px-8 pt-20 pb-10">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
