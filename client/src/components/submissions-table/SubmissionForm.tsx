import React, { useState } from "react"
import { TextInput, Button, Select, LoadingOverlay, Box } from "@mantine/core"
import { useForm, yupResolver } from "@mantine/form"
import { DatePicker as MantineDatePicker } from "@mantine/dates"
import * as Yup from "yup"
import { useQueryClient, useMutation } from "react-query"
import type { AxiosError } from "axios"
import { IconPlus } from "@tabler/icons"
import { createSubmission } from "~/api/submissions"
import showToast from "~/utils/showToast"

// Yup validation schema
const submissionSchema = Yup.object().shape({
  link: Yup.string().url().trim().required("Problem link is required"),
  solveTime: Yup.number().typeError("Solve time must be a number"),
  verdict: Yup.string().required("Verdict is required"),
  solvedAt: Yup.date().required("Date is required"),
})

const SubmissionForm = ({ serial }: { serial: number }) => {
  const queryClient = useQueryClient()
  const [contestId, setContestId] = useState(0)
  const [contestPasswordDialogue, setContestPasswordDialogue] = useState(false)

  // mutation
  const createSubmissionMutation = useMutation(createSubmission, {
    onSuccess: (data) => {
      // show success message
      showToast("success", data.message)

      // invalidate the query after 250ms
      setTimeout(() => {
        queryClient.invalidateQueries("submissions")
      }, 250)
    },
    onError: (err: AxiosError) => {
      if (err.response) {
        const { contest_id, error_code, message } = err.response.data
        setContestId(contest_id)
        // show contest password dialouge
        if (error_code === 1003) setContestPasswordDialogue(true)
        else showToast("error", message)
      }
    },
  })

  // default verdict state
  const [selected, setSelected] = useState("AC")

  // form states
  const form = useForm({
    initialValues: {
      link: "",
      solveTime: "",
      verdict: "AC",
      solvedAt: new Date(),
    },
    validate: yupResolver(submissionSchema),
  })

  /**
   * On change handler for Select component
   */
  const handleSelected = (value: string) => {
    setSelected(value)
    form.setFieldValue("verdict", value)
  }

  /**
   * On submit handler for the form element
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = form.validate()
    if (result.hasErrors) {
      Object.keys(result.errors).forEach((key) => {
        showToast("error", result.errors[key] as string)
      })
      return
    }
    // form data is valid
    createSubmissionMutation.mutate({
      ...form.values,
      solveTime: parseInt(form.values.solveTime),
    })

    // reset the form after submission
    form.reset()
  }

  return (
    <>
      {/* table row starts here */}

      <tr style={{ position: "relative" }}>
        {/* serial */}
        <td>
          {serial} <LoadingOverlay visible={createSubmissionMutation.isLoading} overlayBlur={1.0} />
        </td>

        {/* problem link */}
        <td>
          <form id="add-submission" onSubmit={handleSubmit}></form>
          <TextInput
            sx={{ width: 260 }}
            form="add-submission"
            placeholder="Problem Link"
            size="sm"
            {...form.getInputProps("link")}
            error={false}
          />
        </td>

        {/* verdict */}
        <td role="cell">
          <Select
            sx={{ width: 80 }}
            value={selected}
            onChange={handleSelected}
            size="sm"
            data={[
              { value: "AC", label: "AC" },
              { value: "WA", label: "WA" },
              { value: "TLE", label: "TLE" },
            ]}
          />
        </td>

        {/* solve time */}
        <td>
          <TextInput
            sx={{ width: 95 }}
            type="number"
            placeholder="eg. 80"
            form="add-submission"
            size="sm"
            {...form.getInputProps("solveTime")}
            error={false}
          />
        </td>

        {/* tags  */}
        <td> — </td>

        {/* difficulty  */}
        <td> — </td>

        {/* solved at */}
        <td>
          <MantineDatePicker sx={{ width: 170 }} {...form.getInputProps("solvedAt")} error={false} />
        </td>

        {/* actions */}
        <td>
          <Button
            variant="outline"
            color="purple"
            form="add-submission"
            size="xs"
            type="submit"
            sx={(theme) => ({
              height: 24,
              paddingLeft: 6,
              paddingRight: 6,
            })}
          >
            <IconPlus size={16} />
          </Button>
        </td>
      </tr>
    </>
  )
}

export default SubmissionForm
