import * as Yup from "yup"
import { useMutation, useQueryClient } from "react-query"
import { createUserStudy, updateUserStudy } from "~/api/userStudies"
import moment from "moment"
import { Button, Group, NumberInput, Select, Stack, TextInput } from "@mantine/core"
import { useForm, yupResolver } from "@mantine/form"
import showToast from "~/utils/showToast"
import { DatePicker } from "@mantine/dates"

const studyFormSchema = Yup.object().shape({
  title: Yup.string().trim().required("Title is required"),
  type: Yup.string().trim().required("Resource type is required"),
  link: Yup.string().url().trim().required("Resource link is required"),
  studyTime: Yup.string().trim().required("Study time is required"),
  studyDate: Yup.string().trim().required("Date of study is required"),
  difficulty: Yup.string().trim().required("Resource difficulty is required"),
  language: Yup.string().trim().required("Resource language is required"),
})

export default function StudyForm({ setIsOpen, studies, isCreate }: any) {
  const client = useQueryClient()

  const mutation = useMutation((data) => (isCreate ? createUserStudy(data) : updateUserStudy(studies.id, data)), {
    onSuccess: () => {
      client.invalidateQueries("studies")
      isCreate ? showToast("success", "new study added") : showToast("success", "study updated")

      setIsOpen(false)
    },
    onError: (err: any) => {
      showToast("error", err.response.data.message)
      setIsOpen(false)
    },
  })

  const form = useForm({
    initialValues: {
      title: studies?.title,
      type: studies ? studies.type : "Article",
      link: studies?.link,
      studyTime: studies?.studyTime,
      studyDate: studies ? moment(studies.studyDate).format("YYYY-MM-DD") : "",
      difficulty: studies ? studies.difficulty : "Beginner",
      language: studies ? studies.language : "English",
    },
    validate: yupResolver(studyFormSchema),
  })

  const handleSubmit = form.onSubmit(async (values: any) => {
    const value: any = {
      ...values,
      studyTime: Number(values.studyTime),
      studyDate: moment(values.studyDate).format(),
    }

    console.log(value)

    mutation.mutateAsync(value)
  })

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput label="Title" {...form.getInputProps("title")} />
        <Select
          label="Type"
          {...form.getInputProps("type")}
          data={[
            {
              value: "Article",
              label: "Article",
            },
            {
              value: "Video",
              label: "Video",
            },
          ]}
        />

        <TextInput label="Link" {...form.getInputProps("link")} />
        <NumberInput label="Study Time" {...form.getInputProps("studyTime")} />
        {/* <TextInput label="Study Date" {...form.getInputProps("studyDate")} /> */}
        <DatePicker label="Study Date" {...form.getInputProps("studyDate")} />

        <Select
          label="Difficulty"
          {...form.getInputProps("difficulty")}
          data={[
            {
              value: "Beginner",
              label: "Beginner",
            },
            {
              value: "Intermediate",
              label: "Intermediate",
            },
            {
              value: "Advanced",
              label: "Advanced",
            },
          ]}
        />

        <Select
          label="Language"
          {...form.getInputProps("language")}
          data={[
            {
              value: "English",
              label: "English",
            },
            {
              value: "Bengali",
              label: "Bengali",
            },
          ]}
        />

        <Group position="right">
          <Button type="submit">Save</Button>
        </Group>
      </Stack>
    </form>
  )
}
