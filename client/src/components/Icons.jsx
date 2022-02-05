import {
  IoLogOutOutline as LogoutIcon,
  IoSettingsOutline as SettingsIcon,
  IoListOutline as ListViewIcon,
} from "react-icons/io5"
import {
  HiOutlineUser as UserIcon,
  HiOutlinePlusSm as PlusIcon,
  HiOutlineDotsVertical as VerticalDotsIcon,
  HiOutlineArrowNarrowDown as ArrowDown,
} from "react-icons/hi"
import {
  BiChevronDown as ChevronDownIcon,
  BiChevronUp as ChevronUpIcon,
  BiLineChart as LeaderboardIcon,
} from "react-icons/bi"
import { RiAppsLine as DashboardIcon } from "react-icons/ri"
import { MdOutlineListAlt as TrackingIcon } from "react-icons/md"
import { CgMenuGridO as GridViewIcon } from "react-icons/cg"

const LogoIcon = ({ width, height }) => {
  return (
    <svg
      width={width || 64}
      height={height || 64}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25.6924 1.97505C29.0954 0.141618 33.2047 0.141618 36.6077 1.97505L56.3361 12.6041C60.012 14.5845 62.3002 18.3973 62.3002 22.5419V42.658C62.3002 46.8026 60.012 50.6155 56.3361 52.5959L36.6077 63.2249C33.2047 65.0583 29.0954 65.0583 25.6924 63.2249L5.96405 52.5959C2.2882 50.6155 0 46.8026 0 42.658L0 22.5419C0 18.3973 2.2882 14.5845 5.96404 12.6041L25.6924 1.97505Z"
        fill="currentColor"
      />
      <ellipse
        cx="31.1503"
        cy="31.9381"
        rx="11.8649"
        ry="11.7519"
        fill="#FBFAFC"
      />
    </svg>
  )
}

const CFIcon = (props) => (
  <svg
    width={28}
    height={28}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    {...props}
  >
    <path
      d="M56.3 74.7H35c-5 0-9 4.1-9 9v64.7c0 5 4.1 9 9 9h21.3c5 0 9-4.1 9-9V83.7c.1-5-4-9-9-9Z"
      fill="url(#a)"
    />
    <path
      d="M110.6 42H89.3c-5 0-9 4.1-9 9v97.4c0 5 4.1 9 9 9h21.3c5 0 9-4.1 9-9V51c0-4.9-4-9-9-9Z"
      fill="url(#b)"
    />
    <path
      d="M164.7 87.1h-21.3c-5 0-9 4.1-9 9v52.3c0 5 4.1 9 9 9h21.3c5 0 9-4.1 9-9V96.1c0-5-4-9-9-9Z"
      fill="url(#c)"
    />
    <defs>
      <linearGradient
        id="a"
        x1={26}
        y1={116.083}
        x2={65.376}
        y2={116.083}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F6C43D" />
        <stop offset={1} stopColor="#FCD975" />
      </linearGradient>
      <linearGradient
        id="b"
        x1={80.253}
        y1={99.746}
        x2={119.628}
        y2={99.746}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1480C4" />
        <stop offset={1} stopColor="#1C99D4" />
      </linearGradient>
      <linearGradient
        id="c"
        x1={134.368}
        y1={122.283}
        x2={173.744}
        y2={122.283}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#B11E26" />
        <stop offset={1} stopColor="#C21C24" />
      </linearGradient>
    </defs>
  </svg>
)

function TrashIcon(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 10.25a.75.75 0 01.75.75v5a.75.75 0 01-1.5 0v-5a.75.75 0 01.75-.75zM14 10.25a.75.75 0 01.75.75v5a.75.75 0 01-1.5 0v-5a.75.75 0 01.75-.75z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 2.25A2.75 2.75 0 007.25 5v.25H3a.75.75 0 000 1.5h1.25V19A2.75 2.75 0 007 21.75h10A2.75 2.75 0 0019.75 19V6.75H21a.75.75 0 000-1.5h-4.25V5A2.75 2.75 0 0014 2.25h-4zm5.25 3V5c0-.69-.56-1.25-1.25-1.25h-4c-.69 0-1.25.56-1.25 1.25v.25h6.5zm-9.5 1.5V19c0 .69.56 1.25 1.25 1.25h10c.69 0 1.25-.56 1.25-1.25V6.75H5.75z"
        fill="currentColor"
      />
    </svg>
  )
}

function EditIcon(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 3.75c-.69 0-1.25.56-1.25 1.25v14c0 .69.56 1.25 1.25 1.25h12c.69 0 1.25-.56 1.25-1.25v-7a.75.75 0 011.5 0v7A2.75 2.75 0 0118 21.75H6A2.75 2.75 0 013.25 19V5A2.75 2.75 0 016 2.25h6a.75.75 0 010 1.5H6z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.607 4.121a3 3 0 114.242 4.243l-7.542 7.542a1 1 0 01-.566.283l-3.3.472a1 1 0 01-1.131-1.132l.471-3.3a1 1 0 01.283-.565l7.543-7.543zm1.237 5.127l-5.48 5.48-2.475.354.354-2.475 5.48-5.48 2.121 2.12zm1.06-1.06l.885-.885a1.5 1.5 0 10-2.122-2.121l-.884.884 2.122 2.121z"
        fill="currentColor"
      />
    </svg>
  )
}

export {
  LogoIcon,
  LogoutIcon,
  SettingsIcon,
  UserIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DashboardIcon,
  LeaderboardIcon,
  TrackingIcon,
  ListViewIcon,
  GridViewIcon,
  PlusIcon,
  VerticalDotsIcon,
  ArrowDown,
  CFIcon,
  TrashIcon,
  EditIcon,
}
