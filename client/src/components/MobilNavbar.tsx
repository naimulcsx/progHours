import { Box, useColorModeValue as mode } from "@chakra-ui/react"
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
  DocumentTextIcon,
  UserGroupIcon,
  TrendingUpIcon,
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
      bg={mode("white", "gray.800")}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      h="14"
      py={2}
      paddingX={[4, 16, 16]}
      shadow="lg"
      borderTop="1px solid"
      borderColor={mode("gray.200", "gray.700")}
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
        icon={<UserGroupIcon width={SIDEBAR_ICON_SIZE} />}
        onClick={() => navigate("/groups")}
        isActive={location.pathname === "/groups"}
      />
      <NavLink
        label=""
        icon={<ChartBarIcon width={SIDEBAR_ICON_SIZE} />}
        onClick={() => navigate("/leaderboard")}
        isActive={location.pathname === "/leaderboard"}
      />
      <NavLink
        label=""
        icon={<TrendingUpIcon width={SIDEBAR_ICON_SIZE} />}
        onClick={() => navigate("/activities")}
        isActive={location.pathname === "/activities"}
      />
    </Box>
  )
}
