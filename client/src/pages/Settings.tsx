import { Helmet } from "react-helmet-async"
import { DashboardLayout } from "@/components/layouts/Dashboard"
import AccountSettings from "@/components/settings/AccountSettings"
import UserInfoCard from "@/components/settings/UserInfoCard"
import HandleSettings from "@/components/settings/HandleSettings"
import { useContext } from "react"
import { GlobalContext } from "@/GlobalStateProvider"

const Settings = () => {
  const { user } = useContext(GlobalContext)
  return (
    <DashboardLayout>
      <Helmet>
        <title>Settings</title>
      </Helmet>
      {user && (
        <div className="grid items-start grid-cols-3 gap-4">
          <div className="space-y-4">
            <UserInfoCard />
            <HandleSettings />
          </div>
          <div className="col-span-2">
            <AccountSettings />
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

export default Settings
