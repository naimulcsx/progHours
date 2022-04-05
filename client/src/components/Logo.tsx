import { LogoIcon } from "./Icons"

const Logo = ({ className }: { className: string }) => {
  return (
    <div className="flex items-center space-x-3 text-primary">
      {/* color of the logo is picked from its parents text-color */}
      <LogoIcon width={32} height={32} />
      <h4 className={`text-xl font-semibold ${className}`}>progHours</h4>
    </div>
  )
}

export default Logo
