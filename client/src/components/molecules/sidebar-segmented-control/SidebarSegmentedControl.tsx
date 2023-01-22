import { SegmentedControl, useMantineTheme } from "@mantine/core"
import { Dispatch, SetStateAction } from "react"

export default function SidebarSegmentedControl({ role, setRole }: SidebarSegmentedControlProps) {
  const theme = useMantineTheme()
  return (
    <SegmentedControl
      sx={{
        background: theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[1],
      }}
      mb="xl"
      fullWidth
      value={role}
      onChange={setRole}
      data={[
        { label: "User", value: "user" },
        { label: "Admin", value: "admin" },
      ]}
    />
  )
}

export interface SidebarSegmentedControlProps {
  role: string
  setRole: Dispatch<SetStateAction<string>>
}
