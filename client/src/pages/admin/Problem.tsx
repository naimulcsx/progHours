import { DashboardLayout } from "@/components/layouts/Dashboard"
import { Helmet } from "react-helmet-async"
import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import axios from "axios"
import { useState } from "react"

import FormBuilder from "@/components/FormBuilder"
import * as Yup from "yup"
import {
  Box,
  Spinner,
  useColorModeValue as mode,
  useToast,
} from "@chakra-ui/react"
import { DEFAULT_TOAST_OPTIONS } from "@/configs/toast-config"

export default function Problem() {
  const [probInfo, setProbInfo] = useState(null)
  const toast = useToast(DEFAULT_TOAST_OPTIONS)
  const { pid } = useParams()
  console.log(pid)
  const getProblemInfo = () => {
    return axios(`/api/problems/${pid}`)
      .then((res) => res.data)
      .catch((err) => {
        console.log("err", err)
      })
  }
  useQuery("users", getProblemInfo, {
    onSuccess: (res) => {
      console.log(res)
      setProbInfo(res.body.problem)
      console.log()
    },
  })

  return (
    <DashboardLayout>
      {/* @ts-ignore */}
      <Helmet>
        <title>{pid}</title>
      </Helmet>
      {probInfo ? (
        <FormBuilder
          fields={{
            name: {
              type: "text",
              label: "Problem Name",
              validate: Yup.string().trim().required("Name is required"),
              initialValue: probInfo.name || "",
            },
            difficulty: {
              type: "text",
              label: "Problem Name",
              validate: Yup.string().trim().required("Name is required"),
              initialValue: probInfo.difficulty || "",
            },
          }}
          button={{
            label: "Update",
            loadingLabel: "Updating",
            colorScheme: "gray",
          }}
          mutation={(values: any) => {
            return axios.patch(`/api/problems/${pid}?update=data`, values)
          }}
          onSuccess={() => {
            toast({ status: "success", title: "Account updated!" })
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
