import { useNavigate, useParams } from "react-router-dom";

import { Box, Container, Tabs, Transition } from "@mantine/core";

import { useUserProfile } from "@proghours/data-access";

import { MedalsTab } from "~/modules/profile/components/MedalsTab";
import { OverviewTab } from "~/modules/profile/components/OverviewTab";
import { ProfileHeader } from "~/modules/profile/components/ProfileHeader";
import { ProfileTab } from "~/modules/profile/components/ProfileTab";
import { SubmissionsTab } from "~/modules/profile/components/SubmissionsTab";

export default function UserProfilePage() {
  const navigate = useNavigate();

  const { username, tabValue } = useParams();

  const { isSuccess } = useUserProfile({
    username: username!,
    config: { enabled: !!username }
  });

  return (
    <Transition
      mounted={isSuccess}
      transition="fade"
      duration={500}
      exitDuration={500}
    >
      {(styles) => (
        <div style={styles}>
          <Box py="lg">
            <ProfileHeader />
            <Container size="xl">
              <Tabs
                value={tabValue ?? "profile"}
                onChange={(value) => {
                  if (value !== "profile") navigate(`/@/${username}/${value}`);
                  else navigate(`/@/${username}`);
                }}
              >
                <Tabs.List>
                  <Tabs.Tab value="profile">Profile</Tabs.Tab>
                  <Tabs.Tab value="overview">Overview</Tabs.Tab>
                  <Tabs.Tab value="submissions">Submissions</Tabs.Tab>
                  <Tabs.Tab value="medals">Medals</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="profile">
                  <ProfileTab />
                </Tabs.Panel>

                <Tabs.Panel value="overview">
                  <OverviewTab />
                </Tabs.Panel>

                <Tabs.Panel value="submissions">
                  <SubmissionsTab />
                </Tabs.Panel>

                <Tabs.Panel value="medals">
                  <MedalsTab />
                </Tabs.Panel>
              </Tabs>
            </Container>
          </Box>
        </div>
      )}
    </Transition>
  );
}
