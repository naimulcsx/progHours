/**
 * Import Components
 */
import Navbar from "@/components/navbar"
import { NavLink } from "@/components/sidebar/NavLink"
import { Heading, Text, Stack } from "@chakra-ui/react"

/**
 * Import Icons
 */
import { CogIcon, UserIcon } from "@heroicons/react/outline"

export const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="grid items-start grid-cols-8 gap-20 mx-auto">
        {/* sidebar */}
        <div className="col-span-2">
          <Heading size="md">Settings</Heading>
          <Text>Update and manage your account</Text>
          <Stack spacing={6}>
            <Stack>
              <NavLink label="User Settings" icon={<CogIcon width={20} />} />
              <NavLink
                label="Online Judge Handles"
                icon={<CogIcon width={20} />}
              />
            </Stack>
          </Stack>
        </div>
        <div className="col-span-6 p-12 bg-white rounded-lg shadow">
          {children}
        </div>
      </div>
    </div>
  )
}
