import { DashboardLayout } from "@/components/layouts/Dashboard"
import { Helmet } from "react-helmet-async"
import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { useState } from "react"

import FormBuilder from "@/components/FormBuilder"
import * as Yup from "yup"
import { Show, Spinner, useToast } from "@chakra-ui/react"
import { DEFAULT_TOAST_OPTIONS } from "@/configs/toast-config"
import { getProblemByPid, updateProblemInfo } from "@/api/problems"
import { Problem } from "@/types/Problem"
import showErrorToasts from "@/utils/showErrorToasts"

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
            pid: {
              type: "text",
              label: "Problem ID",
              placeholder: "ex: CF-1720E",
              validate: Yup.string().trim(),
              initialValue: problem.pid || "",
            },
            name: {
              type: "text",
              label: "Problem Name",
              validate: Yup.string().trim(),
              initialValue: problem.name || "",
            },
            difficulty: {
              type: "number",
              label: "Difficulty",
              validate: Yup.string().trim(),
              initialValue: problem.difficulty || "",
            },
            link: {
              type: "text",
              label: "Link",
              validate: Yup.string().trim(),
              initialValue: problem.link || "",
              isReadOnly:true
            },
            onlineJudgeId: {
              type: "select",
              label: "Select Online Judge",
              placeholder: "Select",
              options: [
                ["Codeforces", 1],
                ["CodeChef", 2],
                ["Toph", 5],
                ["LightOJ", 8],
              ],
              initialValue: problem.onlineJudge.id,
              validate: Yup.string()
                .trim()
                .required("Online Judge is required"),
            },
          }}
          mutation={(values: any) => {
            const body = {
              ...values,
              difficulty: Number(values.difficulty),
              onlineJudgeId: Number(values.onlineJudgeId),
            }

            return updateProblemInfo(pid, body)
          }}
          onSuccess={() => {
            toast({ status: "success", title: "Problem updated!" })
          }}
          onError={(err) => {
            showErrorToasts(toast, err.response.data.message)
          }}
          button={{
            label: "Update",
            loadingLabel: "Updating",
            colorScheme: "gray",
          }}
        />
      ) : (
        <Spinner />
      )}
    </DashboardLayout>
  )
}

interface OJ {
  Codeforces: number
  CodeChef: number
  Toph: number
  LightOJ: number
}
