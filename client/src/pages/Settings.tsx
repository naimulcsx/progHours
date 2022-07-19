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
      {/* @ts-ignore */}
      <Helmet>
        <title>Settings</title>
      </Helmet>
      {user && (
        <Tabs>
          <TabList>
            <Tab fontSize={["xs", "sm", "base"]}>General Information</Tab>
            <Tab fontSize={["xs", "sm", "base"]}>Update Password</Tab>
            <Tab fontSize={["xs", "sm", "base"]}>Online Judge Handles</Tab>
            {/* <Tab>Preferences</Tab> */}
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
            {/* <TabPanel>Upcoming!</TabPanel> */}
          </TabPanels>
        </Tabs>
      )}
    </DashboardLayout>
  )
}

export default Settings
