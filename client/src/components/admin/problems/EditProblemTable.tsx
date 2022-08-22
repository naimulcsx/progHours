import { DashboardLayout } from "@/components/layouts/Dashboard"
import { Helmet } from "react-helmet-async"
import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { useState } from "react"

import FormBuilder from "@/components/FormBuilder"
import * as Yup from "yup"
import { Spinner, useToast } from "@chakra-ui/react"
import { DEFAULT_TOAST_OPTIONS } from "@/configs/toast-config"
import { getProblemByPid, updateProblemInfo } from "@/api/problems"
import { Problem } from "@/types/Problem"


export default function EditProblemTable() {
  const [problem, setProblem] = useState<Problem>()
  const toast = useToast(DEFAULT_TOAST_OPTIONS)
  const { pid } = useParams()
  useQuery("problem", () => getProblemByPid(pid), {
    onSuccess: (res) => {
      setProblem(res.body.problem)
    },
  })

  return (
    <DashboardLayout>
      {/* @ts-ignore */}
      <Helmet>
        <title>{pid}</title>
      </Helmet>
      {problem ? (
        <FormBuilder
          fields={{
            name: {
              type: "text",
              label: "Problem Name",
              validate: Yup.string().trim().required("Name is required"),
              initialValue: problem.name || "",
            },
            difficulty: {
              type: "text",
              label: "Difficulty",
              validate: Yup.string().trim().required("Name is required"),
              initialValue: problem.difficulty || "",
            },
          }}
          button={{
            label: "Update",
            loadingLabel: "Updating",
            colorScheme: "gray",
          }}
          mutation={(values: any) => {
            return updateProblemInfo(pid, values)
          }}
          onSuccess={() => {
            toast({ status: "success", title: "Problem updated!" })
          }}
          onError={() => {
            toast({ status: "error", title: "Some error occurred!" })
          }}
        />
      ) : (
        <Spinner />
      )}
    </DashboardLayout>
  )
}
