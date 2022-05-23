interface DashboardHeaderProps {
  title: string
}

const DashboardHeader = ({ title }: DashboardHeaderProps) => {
  return (
    <div className="mb-4">
      <h3 className="flex items-center space-x-4 font-bold">{title}</h3>
    </div>
  )
}

export default DashboardHeader
