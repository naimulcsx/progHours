import { Helmet } from "react-helmet-async"
import { DashboardLayout } from "@/components/layouts/Dashboard"
import AccountSettings from "@/components/settings/AccountSettings"
import UserInfoCard from "@/components/settings/UserInfoCard"
import HandleSettings from "@/components/settings/HandleSettings"
import { useContext, useState } from "react"
import { GlobalContext } from "@/GlobalStateProvider"
import { UpdateUserForm } from "@/components/settings/UpdateUserForm"
import { Button, GridItem, SimpleGrid, VStack } from "@chakra-ui/react"
import { NavLink } from "@/components/sidebar/NavLink"
import { ViewGridIcon } from "@heroicons/react/solid"
import { SIDEBAR_ICON_SIZE } from "@/components/sidebar"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import { UpdatePasswordForm } from "@/components/settings/UpdatePasswordForm"

const Settings = () => {
  const { user } = useContext(GlobalContext)
  const [panel, setPanel] = useState(null)

  return (
    <DashboardLayout>
      <Helmet>
        <title>Settings</title>
      </Helmet>
      {user && (
        <Tabs>
          <TabList>
            <Tab>Account Settings</Tab>
            <Tab>Change Password</Tab>
            <Tab>Online Judge Handles</Tab>
            <Tab>Preferences</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <UpdateUserForm />
            </TabPanel>
            <TabPanel>
              <UpdatePasswordForm />
            </TabPanel>
            <TabPanel>Upcoming!</TabPanel>
            <TabPanel>Upcoming!</TabPanel>
          </TabPanels>
        </Tabs>
      )}
    </DashboardLayout>
  )
}

export default Settings
