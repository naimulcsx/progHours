import { Box, Heading } from "@chakra-ui/react"

interface DashboardHeaderProps {
  title: string
}

const DashboardHeader = ({ title }: DashboardHeaderProps) => {
  return (
    <Box className="mb-4">
      <Heading fontSize="2xl" fontWeight={700}>
        {title}
      </Heading>
    </Box>
  )
}

export default DashboardHeader
