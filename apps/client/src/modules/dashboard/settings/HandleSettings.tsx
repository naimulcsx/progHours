import { Alert, Box, Button, Grid, TextInput } from "@mantine/core";
import { IconInfoSquare } from "~/assets/icons/IconInfoSquare";

export function HandlesSettings() {
  return (
    <Box>
      <Alert icon={<IconInfoSquare />} color="red">
        You can only update your handles once. After that, you won't be able to
        edit them. If you need to make changes, please contact the
        administrator.
      </Alert>
      <Grid mt="sm">
        <Grid.Col span={4}>
          <TextInput label="Codeforces" placeholder="Codeforces handle" />
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput label="Codechef" placeholder="CodeChef handle" />
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput label="SPOJ" placeholder="SPOJ handle" />
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput label="AtCoder" placeholder="AtCoder handle" />
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput label="UVa" placeholder="UVa handle" />
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput label="Toph" placeholder="Toph handle" />
        </Grid.Col>
        <Grid.Col span={12}>
          <Button mt="sm" type="submit" w="100%">
            Save
          </Button>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
