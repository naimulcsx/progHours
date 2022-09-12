import { DashboardLayout } from "@/components/layouts/Dashboard"
import { Helmet } from "react-helmet-async"
import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { useEffect, useState } from "react"

import { Spinner, Tag, useToast } from "@chakra-ui/react"
import { DEFAULT_TOAST_OPTIONS } from "@/configs/toast-config"
import { getProblemByPid, updateProblemInfo } from "@/api/problems"
import { Problem } from "@/types/Problem"
import { useFormik } from "formik"
import showErrorToasts from "@/utils/showErrorToasts"
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react"

import Tags from "./Tags"

export default function EditProblemTable() {
  const [problem, setProblem] = useState<Problem>()
  const [tags, setTags] = useState([])
  const [selected, setSelected] = useState([])

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
      tags: problem?.tags || "",
    },
    onSubmit: (values) => {
      console.log(values)
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
  useEffect(() => {
    console.log(selected)
    if (selected.length != 0) {
      let temp = []
      selected.map((value) => {
        temp.push({ tag: { name: value.label } })
        console.log(value, "value")
      })
      console.log(temp)
      formik.setFieldValue("tags", temp)
    }
  }, [selected])

  useEffect(() => {
    if (problem) {
      console.log(problem)
      setTags(() => {
        let temp = []
        for (let key in problem.tags) {
          temp.push({
            label: problem.tags[key].tag.name,
            value: problem.tags[key].tag.name,
          })
        }
        return temp
      })
    }
  }, [problem])

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
                {tags.length != 0 ? (
                  <Tags data={tags} setSelected={setSelected}></Tags>
                ) : null}
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
                {/* {tags.length === 0 ? null : <Tags tags={tags} />} */}
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
