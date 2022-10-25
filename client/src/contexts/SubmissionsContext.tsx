import { createContext, ReactNode, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useQuery } from "react-query"
import { getSubmissions } from "@/api/submissions"

import type { Submission } from "@/types/Submission"

export const SubmissionsContext = createContext<
  { submissions: Submission[] | null | undefined } | undefined
>(undefined)

export const SubmissionsProvider = ({ children }: { children?: ReactNode }) => {
  const { data } = useQuery("submissions", getSubmissions, {
    refetchOnWindowFocus: false,
  })
  return (
    <SubmissionsContext.Provider
      value={{ submissions: data?.body.submissions }}
    >
      {children}
    </SubmissionsContext.Provider>
  )
}
