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
} from "@heroicons/react/solid"
import { useColorModeValue as mode } from "@chakra-ui/react"
import { AdminIcon } from "../Icons"

export const SIDEBAR_ICON_SIZE = 24

export const Sidebar: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useContext(GlobalContext)

  const role = localStorage.getItem("role")

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
        <Stack spacing={2}>
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
        <Stack>
          <NavLink
            label="Settings"
            icon={<CogIcon width={SIDEBAR_ICON_SIZE} />}
            onClick={() => navigate("/settings")}
            isActive={location.pathname === "/settings"}
          />

          {role === "ADMIN" && (
            <Accordion allowToggle>
              <AccordionItem border={0}>
                <h2>
                  <AccordionButton p={3}>
                    <Box
                      flex="1"
                      textAlign="left"
                      borderRadius="lg"
                      fontWeight={600}
                      lineHeight="1.5rem"
                      fontSize="16px"
                      letterSpacing={-0.1}
                      transition="none"
                    >
                      <HStack spacing={3} bg={mode("white", "gray.800")}>
                        <AdminIcon width={21} height={21} />
                        <span>Admin</span>
                      </HStack>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Stack>
                    <NavLink
                      label="User"
                      icon={<UsersIcon width={SIDEBAR_ICON_SIZE} />}
                      onClick={() => navigate("/admin/users")}
                      isActive={location.pathname === "/admin/users"}
                    />
                    <NavLink
                      label="Problem"
                      icon={<ViewGridAddIcon width={SIDEBAR_ICON_SIZE} />}
                      onClick={() => navigate("/admin/problem")}
                      isActive={location.pathname === "/admin/problem"}
                    />
                  </Stack>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          )}
        </Stack>
      </Stack>
      <Spacer />
      {user && <UserProfile name={user.name} email={user.email} />}
    </Flex>
  )
}
