import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";

import { Container, Group, Tabs, Title } from "@mantine/core";

import { AppearanceSettings } from "~/modules/dashboard/settings/AppearanceSettings";
import { HandlesSettings } from "~/modules/dashboard/settings/HandleSettings";
import { ProfileSettings } from "~/modules/dashboard/settings/ProfileSettings";
import { SecuritySettings } from "~/modules/dashboard/settings/SecuritySettings";

// import { HandlesSettings } from "~/components/core/settings/HandlesSettings";
// import { ProfileSettings } from "~/components/core/settings/ProfileSettings";
// import { SecuritySettings } from "~/components/core/settings/SecuritySettings";

export default function SettingsPage() {
  const navigate = useNavigate();
  const { tabValue } = useParams();
  const value = ["profile", "security", "handles"].includes(tabValue ?? "")
    ? tabValue
    : "appearance";
  return (
    <>
      <Helmet>
        <title>Settings - progHours</title>
      </Helmet>
      <Container size="md">
        <Group>
          <Title order={3}>Settings</Title>
        </Group>
        <Tabs
          mt="md"
          value={value}
          onChange={(value) => navigate(`/settings/${value}`)}
        >
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
    </>
  );
}
