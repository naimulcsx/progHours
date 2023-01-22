import { createContext, ReactNode } from "react"
import { useQuery } from "react-query"
import { getSubmissions } from "~/api/submissions"

import type { Submission } from "~/types/Submission"

export const SubmissionsContext = createContext<
  { submissions: Submission[] | undefined } | undefined
>(undefined)

export default function SubmissionsProvider({ children }: { children?: ReactNode }) {
  const { data } = useQuery("submissions", getSubmissions, {
    refetchOnWindowFocus: false,
  })
  return (
    <SubmissionsContext.Provider value={{ submissions: data?.body.submissions }}>
      {children}
    </SubmissionsContext.Provider>
  )
}
