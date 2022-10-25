import * as Yup from "yup"
import React, { useState } from "react"
import { useFormik } from "formik"
import axios, { AxiosError } from "axios"
import { useQueryClient, useMutation } from "react-query"
// import { FormControl, Select, option, Input } from "@/components/Form"
import { PlusIcon } from "@heroicons/react/outline"
import { useColorModeValue as mode } from "@chakra-ui/react"

/**
 * Import utils
 */
import showErrorToasts from "@/utils/showErrorToasts"
import { createSubmission } from "@/api/submissions"

/**
 * Date picker component and styles
 */
import PopupBuilder from "../PopupBuilder"
import FormBuilder from "../FormBuilder"
import {
  FormControl,
  Input,
  Spinner,
  Td,
  useToast,
  Text,
  Tr,
} from "@chakra-ui/react"
import { Button, MantineTheme, NumberInput, Select } from "@mantine/core"
import { DEFAULT_TOAST_OPTIONS } from "@/configs/toast-config"
import { CELL_STYLES } from "./cells/cellStyles"
import { TextInput } from "@mantine/core"
import { useForm, yupResolver } from "@mantine/form"
import { showNotification } from "@mantine/notifications"
import { IconPlus } from "@tabler/icons"

const submissionSchema = Yup.object().shape({
  link: Yup.string().url().trim().required("Problem link is required"),
  solveTime: Yup.number().typeError("Solve time must be a number"),
  verdict: Yup.string().required("Verdict is required"),
  solvedAt: Yup.date().required("Date is required"),
})

const SubmissionForm = ({ serial }: { serial: number }) => {
  const toast = useToast(DEFAULT_TOAST_OPTIONS)
  const queryClient = useQueryClient()
  const [contestId, setContestId] = useState(0)
  const [contestPasswordDialogue, setContestPasswordDialogue] = useState(false)

  /**
   * Create submission mutation
   */
  const createSubmissionMutation = useMutation(createSubmission, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("submissions")

      showNotification({ message: data.message })
    },
    onError: (err: AxiosError) => {
      if (err.response) {
        const { contest_id, error_code, message } = err.response.data
        setContestId(contest_id)
        if (error_code === 1003) setContestPasswordDialogue(true)
        // show contest password dialouge
        else showNotification({ message, color: "red" })
      }
    },
  })

  /**
   * Default selected state
   */
  const [selected, setSelected] = useState("AC")

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
        showNotification({
          message: result.errors[key],
        })
      })
      return
    }
    // form data is valid
    createSubmissionMutation.mutate({
      ...form.values,
      solveTime: parseInt(form.values.solveTime),
    })
  }

  return (
    <>
      {/* <PopupBuilder
        title="Password Protected Contest"
        description="Please enter the contest password below"
        isOpen={contestPasswordDialogue}
        setIsOpen={setContestPasswordDialogue}
      >
        <FormBuilder
          isModal
          fields={{
            password: {
              type: "password",
              label: "Password",
              validate: Yup.string().trim().required("Password is required"),
            },
          }}
          mutation={(values: any) =>
            axios
              .post(
                `/api/submissions/vjudge-contest-login/${contestId}`,
                values
              )
              .then((res) => res.data)
          }
          onSuccess={(data) => {
            setContestPasswordDialogue(false)
            formik.submitForm()
          }}
          onError={(err) => {
            showErrorToasts(toast, err.response.data.message!)
          }}
          button={{
            label: "Submit",
            loadingLabel: "Submitting",
          }}
        />
      </PopupBuilder> */}

      {/* table row starts here */}

      <tr>
        {/* serial */}
        <td>{serial}</td>

        {/* problem link */}
        <td>
          <form id="add-submission" onSubmit={handleSubmit}></form>
          <TextInput
            form="add-submission"
            placeholder="Problem Link"
            size="sm"
            {...form.getInputProps("link")}
            error={false}
          />
        </td>

        {/* verdict */}
        <td>
          <Select
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
          <FormControl className="form">
            <TextInput
              type="number"
              placeholder="eg. 80"
              form="add-submission"
              size="sm"
              {...form.getInputProps("solveTime")}
              error={false}
            />
          </FormControl>
        </td>

        {/* tags  */}
        <td>—</td>
        {/* difficulty  */}
        <td>—</td>

        {/* solved at */}
        <td>
          {/* <ReactDatePicker
            dateFormat="EEE, dd MMM yyyy"
            showTimeSelect
            selected={formik.values.solvedAt}
            customInput={<Input fontSize="sm" />}
            onChange={(date) => {
              //
              // const currentDate = new Date()
              // const dateToSend = moment(date)
              //   .set("hour", currentDate.getHours())
              //   .set("minute", currentDate.getMinutes())
              //   .set("second", currentDate.getSeconds())
              //   .set("millisecond", currentDate.getMilliseconds())
              formik.setFieldValue("solvedAt", date)
            }}
          /> */}
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
