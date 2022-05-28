import { Fragment, FunctionComponent } from "react"
import { Transition } from "@headlessui/react"

/**
 * Import Components
 */
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/dashboard/Sidebar"
import MobileNav from "@/components/MobileNav"
import { twMerge } from "tailwind-merge"

interface DashboardLayoutProps {
  dataDependency: Array<any>
  className?: string
}

export const DashboardLayout: FunctionComponent<DashboardLayoutProps> = ({
  children,
  dataDependency,
  className = "",
}) => {
  return (
    <div className="h-screen overflow-hidden">
      {/* topbar */}
      <Navbar />
      {/* sidebar */}
      <div className="flex h-full">
        <Sidebar />
        {/* main content */}
        <Transition
          as={Fragment}
          show={dataDependency.every((el) => {
            return ![null, undefined].includes(el)
          })}
          enter="transform transition duration-[400ms]"
          enterFrom="opacity-0"
          enterTo="opacity-100 rotate-0 scale-100"
          leave="transform duration-200 transition ease-in-out"
          leaveFrom="opacity-100 rotate-0 scale-100"
          leaveTo="opacity-0 scale-98"
        >
          <div
            className={twMerge(
              "w-full px-4 pt-4 pb-4 mt-14 overflow-y-auto bg-gray-50",
              className
            )}
          >
            {children}
          </div>
        </Transition>
      </div>
      <MobileNav></MobileNav>
    </div>
  )
}
