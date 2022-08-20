import { DashboardLayout } from "@/components/layouts/Dashboard"
import { Helmet } from "react-helmet-async"
import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import axios from "axios"
import { useState } from "react"
useState
export default function Problem() {
  const [probInfo, setProbInfo] = useState(null)
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
      setProbInfo(res.body)
    },
  })

  return (
    <DashboardLayout>
      {/* @ts-ignore */}
      <Helmet>
        <title>{pid}</title>
      </Helmet>
    </DashboardLayout>
  )
}
