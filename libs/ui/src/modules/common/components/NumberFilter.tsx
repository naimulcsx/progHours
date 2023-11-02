import { IconFilter } from "@tabler/icons-react";
import { Table } from "@tanstack/react-table";

import { useState } from "react";

import {
  ActionIcon,
  Button,
  Menu,
  Select,
  Stack,
  TextInput
} from "@mantine/core";

type FilterType = "gte" | "lte" | "eq";

export function NumberFilter<TData>({
  table,
  columnId
}: {
  table: Table<TData>;
  columnId: string;
}) {
  const [opened, setOpened] = useState(false);
  const [type, setType] = useState<FilterType>("gte");
  const [value, setValue] = useState<number | undefined>();
  const handleSave = () => {
    let filterValue: (number | null)[] = [];
    if (value) {
      if (type === "eq") filterValue = [value, value];
      else if (type === "gte") filterValue = [value];
      else if (type === "lte") filterValue = [null, value];
    }
    setOpened(false);
    return table.getColumn(columnId)?.setFilterValue(filterValue);
  };
  return (
    <Menu shadow="md" width={200} opened={opened} onChange={setOpened}>
      <Menu.Target>
        <ActionIcon size="xs">
          <IconFilter size={14} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Stack gap="xs" p="xs">
          <Select
            size="xs"
            value={type}
            onChange={(value) => {
              setType(value as FilterType);
              setOpened(true);
            }}
            data={[
              { value: "gte", label: ">=" },
              { value: "lte", label: "<=" },
              { value: "eq", label: "==" }
            ]}
          />
          <TextInput
            size="xs"
            type="number"
            value={value}
            onChange={(event) => setValue(Number(event.currentTarget.value))}
          />
          <Button variant="light" size="xs" onClick={handleSave}>
            Apply Filter
          </Button>
        </Stack>
      </Menu.Dropdown>
    </Menu>
  );
}
