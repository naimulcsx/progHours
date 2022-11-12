import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { DashboardLayout } from "~/components/layouts/Dashboard"
import { GeneralInformationForm } from "~/components/settings/GeneralInformationForm"
import { UpdatePasswordForm } from "~/components/settings/UpdatePasswordForm"
import HandleSettings from "~/components/settings/handles/HandleSettings"
import useUser from "~/hooks/useUser"
import { Box, Tabs, Title } from "@mantine/core"
import { IconAxe, IconFileInfo, IconKey } from "@tabler/icons"

const Settings = () => {
  const { user } = useUser()
  const params = new URLSearchParams(window.location.search)
  const [currentTab, setCurrentTab] = useState<string>(params.get("tab") || "user")
  useEffect(() => {
    window.history.pushState({}, "", `/settings?tab=${currentTab}`)
  }, [currentTab])
  return (
    <DashboardLayout>
      <Helmet>
        <title>Settings</title>
      </Helmet>

      {user && (
        <Box sx={{ maxWidth: "1024px", margin: "0 auto" }}>
          <Title order={3} mb="md" sx={{ color: "white" }}>
            Settings
          </Title>
          <Tabs defaultValue={currentTab}>
            <Tabs.List>
              <Tabs.Tab value="user" icon={<IconFileInfo size={14} />} onClick={() => setCurrentTab("user")}>
                Your Profile
              </Tabs.Tab>
              <Tabs.Tab value="password" icon={<IconKey size={14} />} onClick={() => setCurrentTab("password")}>
                Change Password
              </Tabs.Tab>
              <Tabs.Tab value="handle" icon={<IconAxe size={14} />} onClick={() => setCurrentTab("handle")}>
                Handles
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="user" pt="xs">
              <GeneralInformationForm />
            </Tabs.Panel>

            <Tabs.Panel value="password" pt="xs">
              <UpdatePasswordForm />
            </Tabs.Panel>

            <Tabs.Panel value="handle" pt="xs">
              <HandleSettings />
            </Tabs.Panel>
          </Tabs>
        </Box>
      )}
    </DashboardLayout>
  )
}

export default Settings
