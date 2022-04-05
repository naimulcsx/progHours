import Navbar from "@/components/Navbar"
import Sidebar from "@/components/dashboard/Sidebar"
import MobileNav from "../MobileNav"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen  w-auto">
      {/* topbar */}
      <Navbar />
      {/* sidebar */}
      <div className="flex">
        <Sidebar />
        {/* main content */}
        <div className="bg-light w-full min-h-screen px-8 pt-20 lg:pt-12 pb-10">
          {children}
        </div>
      </div>
      <MobileNav></MobileNav>
    </div>
  )
}

export default Layout
