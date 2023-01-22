import { TextInput } from "@mantine/core"
import { FilterFn, Table } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import { IconSearch } from "@tabler/icons"
import { DataGridLocale } from "./types"

type GlobalFilterProps<TData> = {
  table: Table<TData>
  className: string
  locale?: DataGridLocale
}

export function GlobalFilter<TData>({ table, className, locale }: GlobalFilterProps<TData>) {
  const globalFilter = table.getState().globalFilter
  const [value, setValue] = useState(globalFilter || "")

  useEffect(() => {
    setValue(globalFilter || "")
  }, [globalFilter])

  useEffect(() => {
    const timeout = setTimeout(() => {
      table.setGlobalFilter(value)
    }, 200)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <TextInput
      mb="md"
      sx={{
        maxWidth: 400,
        "@media (max-width: 755px)": {
          maxWidth: 160,
        },
      }}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={locale?.globalSearch || "Search..."}
      rightSection={<IconSearch size={16} />}
      className={className}
      size="xs"
    />
  )
}

export const globalFilterFn: FilterFn<any> = (row, columnId: string, filterValue: string) => {
  const value = row.getValue<string>(columnId)
  if (!value) return false
  return value.toString().toLowerCase().includes(filterValue.toString().toLowerCase())
}
