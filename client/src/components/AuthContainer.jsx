import LogoBox from "./base/LogoBox"

const AuthContainer = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-10 mx-auto bg-white rounded shadow">
        {/* logo  */}
        <LogoBox />
        <div>{children}</div>
      </div>
    </div>
  )
}

export default AuthContainer
