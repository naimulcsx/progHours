import { FC, ReactNode } from "react"

/**
 * Import Components
 */
import Navbar from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import MobileNav from "@/components/MobileNav"
import { twMerge } from "tailwind-merge"
import { Box, chakra } from "@chakra-ui/react"
import { useIsFetching, useQueryClient } from "react-query"
import { AnimatePresence } from "framer-motion"

interface DashboardLayoutProps {
  dataDependency: Array<any>
  className?: string
  children?: ReactNode
}

export const DashboardLayout: FC<DashboardLayoutProps> = ({
  children,
  dataDependency,
  className = "",
}) => {
  return (
    <Box className="h-screen overflow-hidden">
      {/* topbar */}
      <Navbar />
      {/* sidebar */}
      <Box className="flex h-full">
        {/* <Sidebar /> */}
        <Sidebar />
        {/* main content */}
        <Box w="full" p={4} mt={14}>
          {children}
        </Box>
      </Box>
      <MobileNav></MobileNav>
    </Box>
  )
}
