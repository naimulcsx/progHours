import { useContext } from "react"
import { SubmissionsContext } from "@/contexts/SubmissionsContext"

function useSubmissions() {
  const submissions = useContext(SubmissionsContext)
  if (submissions === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return submissions
}

export default useSubmissions
