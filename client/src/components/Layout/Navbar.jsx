import { Link } from "react-router-dom"
import { AddBtn, Notification, Profile, Search } from "../base/Icon"
import LogoBox from "../base/LogoBox"

export default function Navbar() {
  return (
    <div className="flex w-full items-center justify-between px-8 pt-6">
      <Link to="/">
        <LogoBox />
      </Link>

      <div className="flex items-center space-x-8">
        <div className="cursor-pointer">
          <AddBtn width={45} height={30} />
        </div>
        <div className="cursor-pointer">
          <Search width={30} height={30} />
        </div>
        <div className="cursor-pointer">
          <Notification width={22} height={25} />
        </div>
        <div className="cursor-pointer">
          <Profile width={62} height={48} />
        </div>
      </div>
    </div>
  )
}
