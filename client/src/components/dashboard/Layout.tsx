import Navbar from "@/components/Navbar"
import Sidebar from "@/components/dashboard/Sidebar"
import MobileNav from "../MobileNav"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-auto">
      {/* topbar */}
      <Navbar />
      {/* sidebar */}
      <div className="flex">
        <Sidebar />
        {/* main content */}
        <div className="md:ml-[250px] bg-light w-full min-h-screen px-5 md:px-8 pt-20 lg:pt-10 space-y-4 md:space-y-8 pb-20">
          {children}
        </div>
      </div>
      <MobileNav></MobileNav>
    </div>
  )
}

export default Layout
