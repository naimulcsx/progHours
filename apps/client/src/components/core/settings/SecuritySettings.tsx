import {
  Box,
  Button,
  Checkbox,
  Divider,
  Grid,
  PasswordInput,
  Stack
} from "@mantine/core";

export function SecuritySettings() {
  return (
    <Box>
      <Stack>
        <Checkbox label="Allow others to view my email address" />
        <Checkbox label="Allow others to view my phone number" />
        <Divider label="Password" />
        <Grid>
          <Grid.Col span={6}>
            <PasswordInput withAsterisk label="Current Password" />
          </Grid.Col>
          <Grid.Col span={6}>
            <PasswordInput withAsterisk label="New Password" />
          </Grid.Col>
          <Grid.Col span={12}>
            <Button mt="sm" w="100%" type="submit">
              Save
            </Button>
          </Grid.Col>
        </Grid>
      </Stack>
    </Box>
  );
}
