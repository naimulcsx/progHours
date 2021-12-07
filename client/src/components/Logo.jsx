import { LogoIcon } from "./Icons"

const Logo = () => {
  return (
    <div className="flex items-center space-x-3 text-primary">
      {/* color of the logo is picked from its parents text-color */}
      <LogoIcon width={40} height={40} />
      <h4 className="text-xl font-bold tracking-wider">ProgHours</h4>
    </div>
  )
}

export default Logo
