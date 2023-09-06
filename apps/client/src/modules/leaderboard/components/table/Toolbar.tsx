import {
  Badge,
  Box,
  Button,
  Checkbox,
  Group,
  Menu,
  ScrollArea,
  TextInput,
  useMantineTheme
} from "@mantine/core";
import { Table } from "@tanstack/react-table";
import { IconAdjustmentsAlt, IconCirclePlus } from "@tabler/icons-react";
import { Key, useEffect, useState } from "react";
import { useDebouncedState, useLocalStorage } from "@mantine/hooks";

export function DataGridToolbar<TData>({
  table,
  withGlobalFilter = false,
  columnFilters = []
}: {
  table: Table<TData>;
  withGlobalFilter?: boolean;
  columnFilters?: Array<{
    id: string;
    label: string;
  }>;
}) {
  const theme = useMantineTheme();
  const [value, setValue] = useDebouncedState(
    table?.getState()?.globalFilter,
    500
  );
  // useEffect(() => {
  //   table?.setGlobalFilter(value);
  // }, [value]);

  const [visibleColumns, setVisibleColumns] = useLocalStorage<Array<string>>({
    key: "submissions_columns",
    defaultValue: table
      ?.getAllColumns()
      ?.filter((column) => column.getCanHide())
      ?.map((column) => column.id)
  });

  // useEffect(() => {
  //   table
  //     ?.getAllColumns()
  //     ?.filter((column) => column.getCanHide())
  //     ?.forEach((column) => {
  //       if (visibleColumns.includes(column.id)) {
  //         column.toggleVisibility(true);
  //       } else {
  //         column.toggleVisibility(false);
  //       }
  //     });
  // }, [table, visibleColumns]);

  return (
    <Group position="apart">
      <Group>
        {withGlobalFilter && (
          <TextInput
            size="xs"
            placeholder="Search your submissions"
            sx={{ minWidth: 260 }}
            styles={{
              input: { background: theme.colors.dark[8], borderStyle: "dashed" }
            }}
            defaultValue={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        )}
        {columnFilters.map((columnFilter) => {
          return (
            <ColumnFilter<TData>
              key={columnFilter.id}
              table={table}
              id={columnFilter.id}
              label={columnFilter.label}
            />
          );
        })}
      </Group>

      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button
            size="xs"
            leftIcon={<IconAdjustmentsAlt size={16} stroke={1.5} />}
          >
            View
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .filter((column) => !["problem_name"].includes(column.id))
            .map((column) => {
              const handleChange = () => {
                if (visibleColumns.includes(column.id)) {
                  setVisibleColumns(
                    visibleColumns.filter((c) => c !== column.id)
                  );
                } else {
                  setVisibleColumns(visibleColumns.concat(column.id));
                }
              };
              return (
                <Menu.Item
                  key={column.id}
                  onClick={handleChange}
                  closeMenuOnClick={false}
                >
                  <Checkbox
                    size="sm"
                    label={column.columnDef.header as string}
                    checked={visibleColumns.includes(column.id)}
                    onChange={handleChange}
                  />
                </Menu.Item>
              );
            })}
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}

export interface ColumnFilterProps<TTable> {
  id: string;
  label: string;
  table: Table<TTable>;
}

function ColumnFilter<TTable>({ id, table, label }: ColumnFilterProps<TTable>) {
  const theme = useMantineTheme();
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [filterState, setFilterState] = useState<Set<any>>(new Set());
  const items = table?.getColumn(id)?.getFacetedUniqueValues()?.entries();

  const options: Array<{
    /* eslint-disable @typescript-eslint/no-explicit-any */
    value: any;
    label: string;
    freq: number;
  }> = [];
  /* eslint-disable @typescript-eslint/no-explicit-any */
  for (const val of items as IterableIterator<[any, number]>) {
    options.push({
      value: val[0],
      freq: val[1],
      label: `${val[0]} (${val[1]})`
    });
  }

  useEffect(() => {
    const currentState = table?.getState().columnFilters;
    table?.setColumnFilters([
      ...currentState.filter((item) => item.id !== id),
      {
        id,
        value: filterState
      }
    ]);
  }, [id, table, filterState]);

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button
          size="xs"
          sx={{
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
            border: `1px dashed ${
              theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.gray[4]
            }`,
            color:
              theme.colorScheme === "dark"
                ? theme.colors.dark[2]
                : theme.colors.dark[9],
            fontWeight: 500
          }}
          leftIcon={<IconCirclePlus size={18} stroke={1.5} />}
          variant="light"
        >
          {label}
          <Box ml={8}>
            {filterState.size <= 2 ? (
              <Group spacing={4}>
                {[...filterState].map((item) => {
                  return (
                    <Badge
                      size="sm"
                      key={item as string}
                      sx={{
                        backgroundColor: theme.colors.dark[9],
                        color: theme.colors.dark[2]
                      }}
                    >
                      {item as string}
                    </Badge>
                  );
                })}
              </Group>
            ) : (
              <Badge
                size="xs"
                sx={{
                  backgroundColor: theme.colors.dark[7],
                  color: theme.colors.dark[2]
                }}
              >
                {filterState.size} Selected
              </Badge>
            )}
          </Box>
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>{label}</Menu.Label>
        <ScrollArea h={200}>
          {options.map((option) => {
            return (
              <Menu.Item key={option.value as Key} closeMenuOnClick={false}>
                <Checkbox
                  size="sm"
                  label={option.label}
                  checked={filterState.has(option.value)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    if (checked) {
                      setFilterState((prevSet) => {
                        const nextSet = new Set(prevSet);
                        nextSet.add(option.value);
                        return nextSet;
                      });
                    } else {
                      setFilterState((prevSet) => {
                        const nextSet = new Set(prevSet);
                        nextSet.delete(option.value);
                        return nextSet;
                      });
                    }
                  }}
                />
              </Menu.Item>
            );
          })}
        </ScrollArea>

        <Menu.Item component="div">
          <Button
            size="xs"
            variant="outline"
            fullWidth
            onClick={() => {
              setFilterState(() => new Set());
            }}
          >
            Clear Filters
          </Button>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
