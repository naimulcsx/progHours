import { Container, Group, Tabs, Title } from "@mantine/core";
import { DashboardLayout } from "~/components/common/dashboard/Layout";
import { AppearanceSettings } from "~/components/core/settings/AppearanceSettings";
import { HandlesSettings } from "~/components/core/settings/HandlesSettings";
import { ProfileSettings } from "~/components/core/settings/ProfileSettings";
import { SecuritySettings } from "~/components/core/settings/SecuritySettings";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <Container>
        <Group>
          <Title order={2}>Settings</Title>
        </Group>
        <Tabs mt="md" defaultValue="appearance">
          <Tabs.List>
            <Tabs.Tab value="appearance">Appearance</Tabs.Tab>
            <Tabs.Tab value="profile">Profile</Tabs.Tab>
            <Tabs.Tab value="security">Security</Tabs.Tab>
            <Tabs.Tab value="handles">Handles</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="appearance" mt="lg">
            <AppearanceSettings />
          </Tabs.Panel>
          <Tabs.Panel value="profile" mt="lg">
            <ProfileSettings />
          </Tabs.Panel>
          <Tabs.Panel value="security" mt="lg">
            <SecuritySettings />
          </Tabs.Panel>
          <Tabs.Panel value="handles" mt="lg">
            <HandlesSettings />
          </Tabs.Panel>
        </Tabs>
      </Container>
    </DashboardLayout>
  );
}
