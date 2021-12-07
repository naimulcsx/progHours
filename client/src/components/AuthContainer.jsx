import Logo from "./Logo"

const AuthContainer = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-light">
      <div className="w-full max-w-md p-12 mx-auto bg-white rounded-lg shadow">
        {/* logo  */}
        <Logo />
        <div className="mt-6">{children}</div>
      </div>
    </div>
  )
}

export default AuthContainer
