import Navbar from "@/components/Navbar"
import Sidebar from "@/components/dashboard/Sidebar"
import MobileNav from "../MobileNav"
import { Transition } from "@headlessui/react"
import { Fragment } from "react"

const Layout = ({
  children,
  dataDependency,
}: {
  children: React.ReactNode
  dataDependency: Array<any>
}) => {
  return (
    <div className="min-h-screen w-auto">
      {/* topbar */}
      <Navbar />
      {/* sidebar */}
      <div className="flex">
        <Sidebar />
        {/* main content */}
        <Transition
          as={Fragment}
          show={dataDependency.every((el) => {
            return ![null, undefined].includes(el)
          })}
          enter="transform transition duration-[400ms]"
          enterFrom="opacity-0 scale-[0.995]"
          enterTo="opacity-100 rotate-0 scale-100"
          leave="transform duration-200 transition ease-in-out"
          leaveFrom="opacity-100 rotate-0 scale-100"
          leaveTo="opacity-0 scale-98"
        >
          <div className="md:ml-[250px] bg-light w-full min-h-screen px-5 md:px-8 pt-20 lg:pt-10 space-y-4 md:space-y-8 pb-20">
            {children}
          </div>
        </Transition>
      </div>
      <MobileNav></MobileNav>
    </div>
  )
}

export default Layout
