import Navbar from "@/components/Navbar"
import Sidebar from "@/components/dashboard/Sidebar"

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen">
      {/* topbar */}
      <Navbar />
      {/* sidebar */}
      <Sidebar />
      {/* main content */}
      <div className="ml-[250px] bg-light min-h-screen px-8 pt-20 pb-10">
        {children}
      </div>
    </div>
  )
}

export default Layout
