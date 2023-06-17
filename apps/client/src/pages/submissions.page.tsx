import { Button } from "@mantine/core";
import { useActiveUser } from "@proghours/data-access";
import { DashboardLayout } from "~/components/common/dashboard/Layout";
import { useLogout } from "~/hooks/useLogout";

export default function SubmissionsPage() {
  const { data } = useActiveUser();
  const { handleLogout } = useLogout();
  return (
    <DashboardLayout>
      Submissions page
      <Button onClick={handleLogout}>Log out</Button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </DashboardLayout>
  );
}
