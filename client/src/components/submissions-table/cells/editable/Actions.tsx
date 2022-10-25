import { useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { Modal, Text, Title, useMantineTheme } from "@mantine/core"

/**
 * Import Components
 */
// import { TrashIcon } from "@/components/Icons"
import { TrashIcon } from "@heroicons/react/outline"

/**
 * Import helpers
 */
import { deleteSubmission } from "@/api/submissions"

/**
 * Import Types / Interfaces
 */
import { Cell } from "react-table"
import { Submission } from "@/types/Submission"
import { AxiosError } from "axios"
import PopupBuilder from "@/components/PopupBuilder"
import { useToast } from "@chakra-ui/react"
import { DEFAULT_TOAST_OPTIONS } from "@/configs/toast-config"
import { CellContext } from "@tanstack/react-table"
import { Box, Button, Group } from "@mantine/core"
import { IconPencil, IconTrash } from "@tabler/icons"
import { showNotification } from "@mantine/notifications"

interface Practice {
  body: {
    submissions: Submission[]
  }
}

const Actions = (cell: CellContext<Submission, unknown>) => {
  const toast = useToast(DEFAULT_TOAST_OPTIONS)
  const theme = useMantineTheme()

  const queryClient = useQueryClient()
  const [opened, setOpened] = useState(false)

  /**
   * Delete submission
   */
  const { mutate } = useMutation((id) => deleteSubmission(id), {
    onSuccess: (res) => {
      setOpened(false)
      const prevState: Practice | undefined =
        queryClient.getQueryData("submissions")
      /**
       * Update the state by removing the submission with the id
       */
      queryClient.setQueryData("submissions", {
        body: {
          submissions: prevState?.body.submissions.filter(
            (el: Submission) => el.id !== cell.row.original.id
          ),
        },
      })
      /**
       * Show toast message
       */
      toast({
        status: "success",
        title: res.message,
      })
    },
    onError: () => {
      setOpened(false)
      showNotification({ message: "Something went wrong!", color: "red" })
    },
  })

  return (
    <>
      <Group>
        {/* <Button
          variant="outline"
          color="purple"
          size="xs"
          sx={(theme) => ({
            height: 24,
            paddingLeft: 6,
            paddingRight: 6,
          })}
        >
          <IconPencil size={16} />
        </Button> */}
        <Button
          variant="outline"
          color="red"
          size="xs"
          sx={(theme) => ({
            height: 24,
            paddingLeft: 6,
            paddingRight: 6,
          })}
          onClick={() => setOpened(true)}
        >
          <IconTrash size={16} />
        </Button>
      </Group>
      <Modal
        opened={opened}
        lockScroll={false}
        overlayColor={theme.colors.dark[9]}
        overlayOpacity={0.5}
        onClose={() => setOpened(false)}
        title={<Title order={4}>Delete {cell.row.original.problem.pid}</Title>}
      >
        <Text>
          Are you sure you want to delete{" "}
          <strong>
            {cell.row.original.problem.name} ({cell.row.original.problem.pid})?
          </strong>
        </Text>
        <Group sx={{ justifyContent: "flex-end" }} mt="lg">
          <Button color="blue" variant="light" onClick={() => setOpened(false)}>
            Cancel
          </Button>
          <Button
            color="red"
            onClick={() => mutate(cell.row.original.id as any)}
          >
            Delete
          </Button>
        </Group>
      </Modal>
    </>
  )
}

export default Actions
