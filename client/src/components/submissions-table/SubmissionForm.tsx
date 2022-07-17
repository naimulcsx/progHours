import * as Yup from "yup"
import React, { useState } from "react"
import { useFormik } from "formik"
import toast from "react-hot-toast"
import axios, { AxiosError } from "axios"
import { useQueryClient, useMutation } from "react-query"
// import { FormControl, Select, option, Input } from "@/components/Form"
import moment from "moment"
import { PlusIcon } from "@heroicons/react/solid"

/**
 * Import utils
 */
import showErrorToasts from "@/utils/showErrorToasts"
import { createSubmission } from "@/api/submissions"

/**
 * Date picker component and styles
 */
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "@/styles/datepicker.css"
import PopupBuilder from "../PopupBuilder"
import FormBuilder from "../FormBuilder"
import {
  FormControl,
  Select,
  Input,
  Button,
  Spinner,
  Td,
  useToast,
  Text,
  Tr,
} from "@chakra-ui/react"
import { DEFAULT_TOAST_OPTIONS } from "@/configs/toast-config"
import { CELL_STYLES } from "./cells/cellStyles"

const submissionSchema = Yup.object().shape({
  link: Yup.string().url().trim().required("Problem link is required"),
  solveTime: Yup.number().required("Solve time is required"),
  verdict: Yup.string().required("Verdict is required"),
  solvedAt: Yup.date().required("Date is required"),
})

const SubmissionForm = ({ id }: { id: number }) => {
  const toast = useToast(DEFAULT_TOAST_OPTIONS)
  const queryClient = useQueryClient()
  const [contestId, setContestId] = useState(0)
  const [contestPasswordDialogue, setContestPasswordDialogue] = useState(false)

  /**
   * Create submission mutation
   */
  const createSubmissionMutation = useMutation(createSubmission, {
    onSuccess: (data) => {
      formik.resetForm()
      queryClient.invalidateQueries("submissions")
      toast({ title: data.message, status: "success" })
    },
    onError: (err: AxiosError) => {
      if (typeof err.response !== "undefined") {
        const { contest_id, error_code, message } = err.response.data
        setContestId(contest_id)
        if (error_code === 1003) setContestPasswordDialogue(true)
        // show contest password dialouge
        else showErrorToasts(toast, message)
      }
    },
  })

  /**
   * Default selected state
   */
  const [selected, setSelected] = useState("AC")

  const formik = useFormik({
    initialValues: {
      link: "",
      solveTime: 0,
      verdict: "AC",
      solvedAt: new Date(),
    },
    validationSchema: submissionSchema,
    onSubmit: async (values) => {
      /**
       * Convert values.solveTime to number
       */
      values.solvedAt = new Date()
      const solveTimeString: string = values.solveTime.toString()
      values.solveTime = parseInt(solveTimeString)

      /**
       * Create the submission
       */
      createSubmissionMutation.mutate(values)
    },
  })

  /**
   * On change handler for Select component
   */
  const handleSelected = (value: string) => {
    setSelected(value)
    formik.setFieldValue("verdict", value)
  }

  /**
   * On submit handler for the form element
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fields = Object.keys(formik.errors) as Array<
      "link" | "solveTime" | "verdict" | "solvedAt"
    >
    if (fields.length === 0) {
      formik.handleSubmit()
      return
    }
    fields.forEach((el) => {
      toast({ title: formik.errors[el] as string, status: "error" })
    })
  }

  return (
    <>
      <PopupBuilder
        title="Password Protected Contest"
        isOpen={contestPasswordDialogue}
        setIsOpen={setContestPasswordDialogue}
      >
        <Text>Please enter the contest password below</Text>
        <FormBuilder
          className="mt-6 space-y-4"
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
            className: "mt-6",
            loadingLabel: "Submitting",
          }}
        />
      </PopupBuilder>

      {/* table row starts here */}

      <Tr bg="white">
        {/* serial */}
        <Td {...CELL_STYLES["Id"]}>{id}</Td>

        {/* problem name */}
        <Td py={2} {...CELL_STYLES["Problem Name"]}>
          <form id="add-submission" onSubmit={handleSubmit}></form>
          <FormControl className="form">
            <Input
              type="text"
              form="add-submission"
              placeholder="Problem Link"
              autoComplete="off"
              className="inset"
              {...formik.getFieldProps("link")}
            ></Input>
          </FormControl>
        </Td>

        {/* verdict */}
        <Td {...CELL_STYLES["Verdict"]}>
          <Select
            value={selected}
            onChange={(e) => handleSelected(e.target.value)}
            fontSize="sm"
          >
            <option value="AC">AC</option>
            <option value="WA">WA</option>
          </Select>
        </Td>

        {/* solve time */}
        <Td {...CELL_STYLES["Solve Time"]}>
          <FormControl className="form">
            <Input
              type="text"
              placeholder="eg. 80"
              autoComplete="off"
              form="add-submission"
              className="w-full p-2 focus:outline-none"
              {...formik.getFieldProps("solveTime")}
            ></Input>
          </FormControl>
        </Td>

        {/* tags  */}
        <Td {...CELL_STYLES["Tags"]}>—</Td>
        {/* difficulty  */}
        <Td {...CELL_STYLES["Difficulty"]}>—</Td>

        {/* solved at */}
        <Td {...CELL_STYLES["Solved On"]}>
          <ReactDatePicker
            dateFormat="EEE, dd MMM yyyy"
            selected={formik.values.solvedAt}
            customInput={<Input fontSize="sm" />}
            onChange={(date) => {
              const currentDate = new Date()
              const dateToSend = moment(date)
                .set("hour", currentDate.getHours())
                .set("minute", currentDate.getMinutes())
                .set("second", currentDate.getSeconds())
                .set("millisecond", currentDate.getMilliseconds())
              formik.setFieldValue("solvedAt", dateToSend.toDate())
            }}
          />
        </Td>

        {/* actions */}
        <Td>
          <Button
            type="submit"
            size="sm"
            form="add-submission"
            variant="outline"
          >
            {createSubmissionMutation.isLoading ? (
              <Spinner size="sm" />
            ) : (
              <PlusIcon width={16} height={16} />
            )}
          </Button>
        </Td>
      </Tr>
    </>
  )
}

export default SubmissionForm
