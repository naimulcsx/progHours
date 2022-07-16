import { Box, HStack, Flex } from "@chakra-ui/react"
import { useLocation, useNavigate } from "react-router-dom"

/**
 * Import Components
 */
import { NavLink } from "./sidebar/NavLink"

/**
 * Import icons
 */
export const SIDEBAR_ICON_SIZE = 24
import {
  ClipboardListIcon,
  ViewGridIcon,
  ChartBarIcon,
  CogIcon,
  LogoutIcon,
  DocumentTextIcon,
} from "@heroicons/react/solid"

export default function MobileNav() {
  const location = useLocation()
  const navigate = useNavigate()
  return (
    <Box
      position="fixed"
      bottom={0}
      left="0"
      right={0}
      zIndex={200}
      bg="white"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      paddingY={2}
      paddingX={[8, 16, 16]}
    >
      <NavLink
        label=""
        icon={<ViewGridIcon width={SIDEBAR_ICON_SIZE} />}
        onClick={() => navigate("/dashboard")}
        isActive={location.pathname === "/dashboard"}
      />
      <NavLink
        label=""
        icon={<ClipboardListIcon width={SIDEBAR_ICON_SIZE} />}
        onClick={() => navigate("/submissions")}
        isActive={location.pathname === "/submissions"}
      />
      <NavLink
        label=""
        icon={<DocumentTextIcon width={SIDEBAR_ICON_SIZE} />}
        onClick={() => navigate("/study")}
        isActive={location.pathname === "/study"}
      />
      <NavLink
        label=""
        icon={<ChartBarIcon width={SIDEBAR_ICON_SIZE} />}
        onClick={() => navigate("/leaderboard")}
        isActive={location.pathname === "/leaderboard"}
      />
    </Box>
  )
}
