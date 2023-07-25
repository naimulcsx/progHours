import { Container, Group, Tabs, Title } from "@mantine/core";
import { DashboardLayout } from "~/components/common/dashboard/Layout";
import { AppearanceSettings } from "~/components/core/settings/AppearanceSettings";
import { ProfileSettings } from "~/components/core/settings/ProfileSettings";

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
            <Tabs.Tab value="password">Security</Tabs.Tab>
            <Tabs.Tab value="handle">Handle</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="appearance" mt="lg">
            <AppearanceSettings />
          </Tabs.Panel>
          <Tabs.Panel value="profile" mt="lg">
            <ProfileSettings />
          </Tabs.Panel>
        </Tabs>
      </Container>
    </DashboardLayout>
  );
}
