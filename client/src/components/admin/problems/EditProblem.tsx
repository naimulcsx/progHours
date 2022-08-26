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
import { useFormik } from "formik"
import showErrorToasts from "@/utils/showErrorToasts"
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react"

export default function EditProblemTable() {
  const [problem, setProblem] = useState<Problem>(null)
  const toast = useToast(DEFAULT_TOAST_OPTIONS)
  const { pid } = useParams()
  useQuery("problem", () => getProblemByPid(pid), {
    onSuccess: (res) => {
      setProblem(res.body.problem)
    },
  })
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: problem?.name || "",
      pid: problem?.pid || "",
      difficulty: problem?.difficulty || "",
      link: problem?.link || "",
      onlineJudgeId: problem?.onlineJudgeId || "",
    },
    onSubmit: (values) => {
      const body = {
        ...values,
        difficulty: Number(values.difficulty),
        onlineJudgeId: Number(values.onlineJudgeId),
      }
      updateProblemInfo(pid, body)
        .then(() => {
          toast({ status: "success", title: "Problem updated!" })
        })
        .catch((err) => {
          showErrorToasts(toast, err.response.data.message)
        })
    },
  })
  return (
    <DashboardLayout>
      {/* @ts-ignore */}
      <Helmet>
        <title>{pid}</title>
      </Helmet>
      {problem ? (
        <Flex>
          <Box flexBasis="full" p={6} rounded="md">
            <form onSubmit={formik.handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <FormControl>
                  <FormLabel htmlFor="name">Problem name</FormLabel>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    variant="filled"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="pid">Problem ID</FormLabel>
                  <Input
                    id="pid"
                    name="pid"
                    type="text"
                    variant="filled"
                    isDisabled={true}
                    onChange={formik.handleChange}
                    value={formik.values.pid}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="difficulty">difficulty</FormLabel>
                  <Input
                    id="difficulty"
                    name="difficulty"
                    type="text"
                    variant="filled"
                    onChange={formik.handleChange}
                    value={formik.values.difficulty}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="link">Problem Link</FormLabel>
                  <Input
                    id="link"
                    name="link"
                    type="text"
                    variant="filled"
                    isDisabled={true}
                    onChange={formik.handleChange}
                    value={formik.values.link}
                  />
                </FormControl>

                <Button type="submit" colorScheme="gray" width="full">
                  Update
                </Button>
              </VStack>
            </form>
          </Box>
        </Flex>
      ) : (
        <Spinner />
      )}
    </DashboardLayout>
  )
}
