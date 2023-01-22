import * as Yup from "yup"
import moment from "moment"
import { useMutation, useQueryClient } from "react-query"
import { createUserStudy, updateUserStudy } from "~/api/userStudies"
import { Button, Group, Modal, NumberInput, Select, Stack, TextInput, Title } from "@mantine/core"
import { useForm, yupResolver } from "@mantine/form"
import { DatePicker } from "@mantine/dates"
import { Dispatch, SetStateAction } from "react"
import showToast from "~/utils/showToast"

const studyFormSchema = Yup.object().shape({
  title: Yup.string().trim().required("Title is required"),
  type: Yup.string().trim().required("Resource type is required"),
  link: Yup.string().url().trim().required("Resource link is required"),
  studyTime: Yup.string().trim().required("Study time is required"),
  studyDate: Yup.string().trim().required("Date of study is required"),
  difficulty: Yup.string().trim().required("Resource difficulty is required"),
  language: Yup.string().trim().required("Resource language is required"),
})

export interface StudyFormModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  forUpdate?: boolean
  study?: any
}

export default function StudyFormModal({
  open,
  setOpen,
  study,
  forUpdate = false,
}: StudyFormModalProps) {
  const client = useQueryClient()

  const mutation = useMutation(
    (data) => (forUpdate ? updateUserStudy(study.id, data) : createUserStudy(data)),
    {
      onSuccess: () => {
        client.invalidateQueries("userStudies")
        forUpdate
          ? showToast("success", "Resource updated!")
          : showToast("success", "Resource added!")
        setOpen(false)
      },
      onError: (err: any) => {
        showToast("error", err.response.data.message)
        setOpen(false)
      },
    }
  )

  const form = useForm({
    initialValues: {
      title: study?.title,
      type: study ? study.type : "Article",
      link: study?.link,
      studyTime: study?.studyTime,
      studyDate: study ? moment(study.studyDate).toDate() : "",
      difficulty: study ? study.difficulty : "Beginner",
      language: study ? study.language : "English",
    },
    validate: yupResolver(studyFormSchema),
  })

  const handleSubmit = form.onSubmit(async (values: any) => {
    const value: any = {
      ...values,
      studyTime: Number(values.studyTime),
      studyDate: moment(values.studyDate).format(),
    }
    mutation.mutateAsync(value)
  })

  return (
    <Modal
      opened={open}
      onClose={() => setOpen(false)}
      title={<Title order={4}>{forUpdate ? `Edit: ${study.title}` : "Add new resource"}</Title>}
    >
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
    </Modal>
  )
}
