import React, { HTMLProps, useState } from "react";
import {
  SubmissionRow,
  getSubmissions,
  useCreateSubmission
} from "@proghours/data-access";
import { TextInput, Select, ActionIcon } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { DatePickerInput } from "@mantine/dates";
import {
  IconAlertCircle,
  IconCheck,
  IconCirclePlus
} from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { Table } from "@tanstack/react-table";
import { z } from "zod";
import { notifications } from "@mantine/notifications";

const submissionSchema = z.object({
  url: z.string().url().trim().min(1, "Problem link is required"),
  solveTime: z.coerce.number().min(1, "Solve time must be a number"),
  verdict: z.string().min(1, "Verdict is required"),
  solvedAt: z.date()
});

export function CreateSubmissionRow({
  table,
  ...props
}: HTMLProps<HTMLTableRowElement> & {
  table: Table<SubmissionRow>;
}): JSX.Element {
  const client = useQueryClient();

  const tableColumns = table?.getAllColumns();
  const problemNameColumn = tableColumns?.find(
    (col) => col.id === "problem_name"
  );
  const verdictColumn = tableColumns?.find((col) => col.id === "verdict");
  const solveTimeColumn = tableColumns?.find((col) => col.id === "solve_time");
  const tagsColumn = tableColumns?.find((col) => col.id === "tags");
  const difficultyColumn = tableColumns?.find(
    (col) => col.id === "problem_difficulty"
  );
  const solvedAtColumn = tableColumns?.find((col) => col.id === "solved_at");
  const actionsColumn = tableColumns?.find((col) => col.id === "actions");

  const { mutate } = useCreateSubmission({
    config: {
      async onSuccess(res) {
        notifications.show({
          color: "green",
          title: "Success",
          message: "Submission added!",
          icon: <IconCheck />
        });
        const submissions = await client.ensureQueryData({
          queryKey: ["submissions"],
          queryFn: getSubmissions
        });
        client.setQueryData(["submissions"], [res, ...submissions]);
      }
    }
  });

  /**
   * On change handler for Select component
   */
  const [selected, setSelected] = useState("AC");
  const handleSelected = (value: string) => {
    setSelected(value);
    form.setFieldValue("verdict", value);
  };

  // form states
  const form = useForm({
    initialValues: {
      url: "",
      solveTime: "0",
      verdict: "AC",
      solvedAt: new Date()
    },
    validate: zodResolver(submissionSchema)
  });

  /**
   * On submit handler for the form element
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = form.validate();
    if (result.hasErrors) {
      Object.keys(result.errors).forEach((key) => {
        notifications.show({
          color: "red",
          title: "Success",
          message: result.errors[key],
          icon: <IconAlertCircle />
        });
      });
      return;
    }
    mutate({
      ...form.values,
      solveTime: Number(form.values.solveTime)
    });
    // reset the form after submission
    form.reset();
  };

  return (
    <tr role="row" {...props} style={{ padding: "2px 0" }}>
      {/* problem link */}
      {problemNameColumn?.getIsVisible() && (
        <td
          role="cell"
          style={{
            flex: `${problemNameColumn?.getSize()} 0 auto`,
            width: problemNameColumn?.getSize(),
            maxWidth: problemNameColumn?.columnDef.maxSize,
            minWidth: problemNameColumn?.columnDef.minSize
          }}
        >
          <form id="add-submission" onSubmit={handleSubmit}></form>
          <TextInput
            sx={{ marginLeft: -8 }}
            form="add-submission"
            placeholder="Problem Link"
            size="xs"
            {...form.getInputProps("url")}
            error={false}
          />
        </td>
      )}

      {/* verdict */}
      {verdictColumn?.getIsVisible() && (
        <td
          role="cell"
          style={{
            flex: `${verdictColumn?.getSize()} 0 auto`,
            width: verdictColumn?.getSize(),
            maxWidth: verdictColumn?.columnDef.maxSize,
            minWidth: verdictColumn?.columnDef.minSize
          }}
        >
          <Select
            value={selected}
            onChange={handleSelected}
            size="xs"
            data={[
              { value: "AC", label: "AC" },
              { value: "WA", label: "WA" },
              { value: "TLE", label: "TLE" }
            ]}
          />
        </td>
      )}
      {/* solve time */}
      {solveTimeColumn?.getIsVisible() && (
        <td
          role="cell"
          style={{
            flex: `${solveTimeColumn?.getSize()} 0 auto`,
            width: solveTimeColumn?.getSize(),
            maxWidth: solveTimeColumn?.columnDef.maxSize,
            minWidth: solveTimeColumn?.columnDef.minSize
          }}
        >
          <TextInput
            type="number"
            placeholder="e.g. 80"
            form="add-submission"
            size="xs"
            {...form.getInputProps("solveTime")}
            error={false}
          />
        </td>
      )}

      {/* tags  */}
      {tagsColumn?.getIsVisible() && (
        <td
          role="cell"
          style={{
            flex: `${tagsColumn?.getSize()} 0 auto`,
            width: tagsColumn?.getSize(),
            maxWidth: tagsColumn?.columnDef.maxSize,
            minWidth: tagsColumn?.columnDef.minSize
          }}
        >
          —{" "}
        </td>
      )}

      {/* difficulty  */}
      <td
        role="cell"
        style={{
          flex: `${difficultyColumn?.getSize()} 0 auto`,
          width: difficultyColumn?.getSize(),
          maxWidth: difficultyColumn?.columnDef.maxSize,
          minWidth: difficultyColumn?.columnDef.minSize
        }}
      >
        —{" "}
      </td>

      {/* solved at */}
      <td
        role="cell"
        style={{
          flex: `${solvedAtColumn?.getSize()} 0 auto`,
          width: solvedAtColumn?.getSize(),
          maxWidth: solvedAtColumn?.columnDef.maxSize,
          minWidth: solvedAtColumn?.columnDef.minSize
        }}
      >
        <DatePickerInput
          size="xs"
          sx={{ maxWidth: 100 }}
          valueFormat="DD-MM-YYYY"
          {...form.getInputProps("solvedAt")}
        />
      </td>

      {/* actions */}
      <td
        role="cell"
        style={{
          flex: `${actionsColumn?.getSize()} 0 auto`,
          width: actionsColumn?.getSize(),
          maxWidth: actionsColumn?.columnDef.maxSize,
          minWidth: actionsColumn?.columnDef.minSize
        }}
      >
        {/* <Button
          variant="outline"
          color="purple"
          form="add-submission"
          size="xs"
          type="submit"
          sx={(theme) => ({
            height: 24,
            paddingLeft: 6,
            paddingRight: 6
          })}
        >
          Add
        </Button> */}
        <ActionIcon type="submit" form="add-submission">
          <IconCirclePlus size={18} stroke={1.5} />
        </ActionIcon>
      </td>
    </tr>
  );
}
