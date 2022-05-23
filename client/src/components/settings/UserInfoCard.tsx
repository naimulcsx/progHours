import { GlobalContext } from "@/GlobalStateProvider"
import { MailIcon, UserIcon } from "@heroicons/react/solid"
import { useContext } from "react"
import { Link } from "react-router-dom"
import Avatar from "@/components/Avatar"

const UserInfoCard = () => {
  const user = useContext(GlobalContext).user!
  return (
    <div className="p-8 bg-white rounded-lg shadow">
      <div className="flex space-x-8">
        <Avatar name={user.name} size="xl" />
        <div>
          <h2 className="flex items-center mb-2 space-x-2 text-2xl">
            <span>{user.name}</span>
            <span className="bg-purple-100 text-purple-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-purple-200 dark:text-purple-900">
              Admin
            </span>
          </h2>
          <div className="space-y-1 text-gray-700">
            <p className="flex items-center space-x-2">
              <UserIcon className="w-5 h-5" />
              <span>{user.username.toUpperCase()}</span>
            </p>
            <p className="flex items-center space-x-2">
              <MailIcon className="w-5 h-5" />
              <span>{user.email}</span>
            </p>
            <Link to={`/users/${user.username}`}>
              <a className="inline-block mt-4 btn-primary-sm">View Profile</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfoCard
