import { useState } from "react"
import { AxiosError } from "axios"
import { Cell } from "react-table"
import { useMutation, useQueryClient } from "react-query"
import { useColorModeValue as mode } from "@chakra-ui/react"
import { MantineTheme, Select } from "@mantine/core"

/**
 * Import Components
 */
import { useToast } from "@chakra-ui/react"
import { updateSubmission } from "@/api/submissions"

/**
 * Import types
 */
import { Submission } from "@/types/Submission"
import { Practice } from "@/types/Practice"
import { DEFAULT_TOAST_OPTIONS } from "@/configs/toast-config"
import { CellContext } from "@tanstack/react-table"

const Verdict = (cell: CellContext<Submission, unknown>) => {
  const toast = useToast(DEFAULT_TOAST_OPTIONS)
  const client = useQueryClient()
  const [selected, setSelected] = useState<string>(cell.getValue() as string)

  const { mutate } = useMutation(updateSubmission, {
    onSuccess: (res) => {
      toast({ title: res.message, status: "success" })
    },
    onError: (err: AxiosError) => {},
  })

  const handleSelected = (value: any) => {
    const oldData: Practice | undefined = client.getQueryData("submissions")
    /**
     * If this submission is the one, we updated on, update it's verdict
     */
    const newData = oldData?.body.submissions.map((el) => {
      if (cell.row.original.id == el.id) {
        return { ...el, verdict: value }
      }
      return el
    })
    /**
     * Update the new client state
     */
    client.setQueryData("submissions", { body: { submissions: newData } })

    /**
     * Update the data in the server
     */
    if (value !== cell.row.original.verdict) {
      mutate({ id: cell.row.original.id, verdict: value })
    }

    setSelected(value)
  }

  const getStyles: any = (theme: MantineTheme) => ({
    AC: {
      borderColor: theme.colors.green[3],
      background: theme.colors.green[2],
      color: theme.colors.green[9],
      fontWeight: 600,
    },
    WA: {
      borderColor: theme.colors.red[3],
      background: theme.colors.red[2],
      color: theme.colors.red[9],
      fontWeight: 600,
    },
    TLE: {
      borderColor: theme.colors.yellow[3],
      background: theme.colors.yellow[2],
      color: theme.colors.yellow[9],
      fontWeight: 600,
    },
  })

  return (
    <Select
      value={selected}
      onChange={handleSelected}
      sx={(theme) => ({
        input: getStyles(theme)[selected],
      })}
      data={[
        { value: "AC", label: "AC" },
        { value: "WA", label: "WA" },
        { value: "TLE", label: "TLE" },
      ]}
    />
  )
}

export default Verdict
