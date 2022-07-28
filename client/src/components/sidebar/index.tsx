/**
 * Import Components
 */
import { NavLink } from "./NavLink"
import { UserProfile } from "./UserProfile"
import { Box, Divider, Flex, Spacer, Stack } from "@chakra-ui/react"
import Logo from "@/components/Logo"

/**
 * Import hooks
 */
import { useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"

/**
 * Global context
 */
import { GlobalContext } from "@/GlobalStateProvider"

/**
 * Import Icons
 */
import {
  ClipboardListIcon,
  ViewGridIcon,
  ChartBarIcon,
  CogIcon,
  DocumentTextIcon,
} from "@heroicons/react/solid"
import { useColorModeValue as mode } from "@chakra-ui/react"

export const SIDEBAR_ICON_SIZE = 24

export const Sidebar: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useContext(GlobalContext)
  return (
    <Flex
      height="100vh"
      width={{ base: "full", sm: "256px" }}
      direction="column"
      borderRightWidth="1px"
      flexShrink={0}
      flexGrow={0}
      pt={6}
      px={4}
      pb={6}
      bg={mode("white", "gray.800")}
      zIndex={100}
    >
      <Stack spacing={6} mt={16}>
        <Stack>
          <NavLink
            label="Dashboard"
            icon={<ViewGridIcon width={SIDEBAR_ICON_SIZE} />}
            onClick={() => navigate("/dashboard")}
            isActive={location.pathname === "/dashboard"}
          />
          <NavLink
            label="Submissions"
            icon={<ClipboardListIcon width={SIDEBAR_ICON_SIZE} />}
            onClick={() => navigate("/submissions")}
            isActive={location.pathname === "/submissions"}
          />
          <NavLink
            label="Study List"
            icon={<DocumentTextIcon width={SIDEBAR_ICON_SIZE} />}
            onClick={() => navigate("/study")}
            isActive={location.pathname === "/study"}
          />
          <NavLink
            label="Leaderboard"
            icon={<ChartBarIcon width={SIDEBAR_ICON_SIZE} />}
            onClick={() => navigate("/leaderboard")}
            isActive={location.pathname === "/leaderboard"}
          />
        </Stack>
        <Divider />
        <Stack>
          <NavLink
            label="Settings"
            icon={<CogIcon width={SIDEBAR_ICON_SIZE} />}
            onClick={() => navigate("/settings")}
            isActive={location.pathname === "/settings"}
          />
        </Stack>
      </Stack>
      <Spacer />
      {user && <UserProfile name={user.name} email={user.email} />}
    </Flex>
  )
}
