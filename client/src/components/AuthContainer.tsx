import Logo from "./Logo"

const AuthContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-light">
      <div className="w-full max-w-md p-8 mx-auto bg-white rounded-lg shadow">
        {/* logo  */}
        <Logo className="text-dark" />
        <div className="mt-6">{children}</div>
      </div>
    </div>
  )
}

export default AuthContainer
