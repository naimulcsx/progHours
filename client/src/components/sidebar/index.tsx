/**
 * Import Components
 */
import { NavLink } from "./NavLink"
import { UserProfile } from "./UserProfile"
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  Spacer,
  Stack,
} from "@chakra-ui/react"

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
  UserGroupIcon,
  TrendingUpIcon,
  UsersIcon,
  ViewGridAddIcon,
} from "@heroicons/react/outline"
import { useColorModeValue as mode } from "@chakra-ui/react"
import { AdminIcon } from "../Icons"

export const SIDEBAR_ICON_SIZE = 24

export const Sidebar: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useContext(GlobalContext)

  return (
    <Flex
      height="100vh"
      width={{ base: "full", sm: "220px" }}
      direction="column"
      borderRightWidth="1px"
      borderRightColor={mode("gray.200", "gray.700")}
      flexShrink={0}
      flexGrow={0}
      pt={6}
      px={2.5}
      pb={6}
      bg={mode("white", "gray.800")}
      zIndex={100}
    >
      <Stack spacing={6} mt={16}>
        <Stack spacing={1}>
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
            label="Groups"
            icon={<UserGroupIcon width={SIDEBAR_ICON_SIZE} />}
            onClick={() => navigate("/groups")}
            isActive={location.pathname === "/groups"}
          />
          <NavLink
            label="Leaderboard"
            icon={<ChartBarIcon width={SIDEBAR_ICON_SIZE} />}
            onClick={() => navigate("/leaderboard")}
            isActive={location.pathname === "/leaderboard"}
          />
          <NavLink
            label="Activities"
            icon={<TrendingUpIcon width={SIDEBAR_ICON_SIZE} />}
            onClick={() => navigate("/activities")}
            isActive={location.pathname === "/activities"}
          />
        </Stack>
        <Divider />

        {user?.role === "ADMIN" && (
          <>
            <Stack>
              <Heading size="sm" mb={2} ml={2}>
                Admin Panel
              </Heading>
              <NavLink
                label="Users"
                icon={<UsersIcon width={SIDEBAR_ICON_SIZE} />}
                onClick={() => navigate("/admin/users")}
                isActive={location.pathname === "/admin/users"}
              />
              {/* <NavLink
                label="Problems"
                icon={<ViewGridAddIcon width={SIDEBAR_ICON_SIZE} />}
                onClick={() => navigate("/admin/problems")}
                isActive={location.pathname === "/admin/problems"}
              />  */}
            </Stack>
            <Divider />
          </>
        )}

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
      {user && (
        <UserProfile name={user.name} email={user.email} role={user?.role} />
      )}
    </Flex>
  )
}
