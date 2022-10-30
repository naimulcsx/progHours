import { Helmet } from "react-helmet-async"
import { DashboardLayout } from "@/components/layouts/Dashboard"
import { GeneralInformationForm } from "@/components/settings/GeneralInformationForm"
import { UpdatePasswordForm } from "@/components/settings/UpdatePasswordForm"
import HandleSettings from "@/components/settings/handles/HandleSettings"
import useUser from "@/hooks/useUser"
import { Tabs } from "@mantine/core"
import { IconAxe, IconFileInfo, IconKey } from "@tabler/icons"

const Settings = () => {
  const { user } = useUser()

  return (
    <DashboardLayout>
      {/* @ts-ignore */}
      <Helmet>
        <title>Settings</title>
      </Helmet>
      {user && (
        <Tabs defaultValue="gallery">
          <Tabs.List>
            <Tabs.Tab value="gallery" icon={<IconFileInfo size={14} />}>
              General Information
            </Tabs.Tab>
            <Tabs.Tab value="messages" icon={<IconKey size={14} />}>
              Update Password
            </Tabs.Tab>
            <Tabs.Tab value="settings" icon={<IconAxe size={14} />}>
              Online Judge Handles
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="gallery" pt="xs">
            <GeneralInformationForm />
          </Tabs.Panel>

          <Tabs.Panel value="messages" pt="xs">
            <UpdatePasswordForm />
          </Tabs.Panel>

          <Tabs.Panel value="settings" pt="xs">
            <HandleSettings />
          </Tabs.Panel>
        </Tabs>
      )}
    </DashboardLayout>
  )
}

export default Settings
