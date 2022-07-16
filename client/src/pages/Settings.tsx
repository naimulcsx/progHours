import { Helmet } from "react-helmet-async"
import { DashboardLayout } from "@/components/layouts/Dashboard"
import { useContext } from "react"
import { GlobalContext } from "@/GlobalStateProvider"
import { GeneralInformationForm } from "@/components/settings/GeneralInformationForm"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import { UpdatePasswordForm } from "@/components/settings/UpdatePasswordForm"
import HandleSettings from "@/components/settings/handles/HandleSettings"

const Settings = () => {
  const { user } = useContext(GlobalContext)

  return (
    <DashboardLayout>
      <Helmet>
        <title>Settings</title>
      </Helmet>
      {user && (
        <Tabs>
          <TabList>
            <Tab>General Information</Tab>
            <Tab>Update Password</Tab>
            <Tab>Online Judge Handles</Tab>
            <Tab>Preferences</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <GeneralInformationForm />
            </TabPanel>
            <TabPanel>
              <UpdatePasswordForm />
            </TabPanel>
            <TabPanel>
              <HandleSettings />
            </TabPanel>
            <TabPanel>Upcoming!</TabPanel>
          </TabPanels>
        </Tabs>
      )}
    </DashboardLayout>
  )
}

export default Settings
