import { Logo } from "./Icon"

const LogoBox = () => {
  return (
    <div className="flex items-center mb-6 space-x-2 text-primary">
      {/* color of the logo is picked from its parents text-color */}
      <Logo width={40} height={40} />
      <h4 className="text-xl font-bold">ProgHours</h4>
    </div>
  )
}

export default LogoBox
