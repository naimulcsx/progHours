import {
  IconAlertCircle,
  IconCheck,
  IconCirclePlus
} from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { z } from "zod";

import {
  ActionIcon,
  Select,
  TableTd,
  TableTr,
  TableTrProps,
  TextInput
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { getSubmissions, useCreateSubmission } from "@proghours/data-access";

const submissionSchema = z.object({
  url: z.string().url().trim().min(1, "Problem link is required"),
  solveTime: z.coerce.number().min(1, "Solve time must be a number"),
  verdict: z.string().min(1, "Verdict is required"),
  solvedAt: z.date()
});

export function CreateSubmissionRow({ ...props }: TableTrProps): JSX.Element {
  const client = useQueryClient();

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
        setTimeout(() => {
          client.invalidateQueries(["submissions"]);
        }, 5000);
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
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
    <TableTr role="row" {...props} style={{ padding: "10px 100px" }}>
      {/* problem link */}

      <TableTd role="cell">
        <form id="add-submission" onSubmit={handleSubmit}></form>
        <TextInput
          style={{ maxWidth: 280 }}
          form="add-submission"
          placeholder="Problem Link"
          size="xs"
          {...form.getInputProps("url")}
          error={false}
        />
      </TableTd>

      {/* verdict */}
      <TableTd role="cell">
        <Select
          style={{ maxWidth: 70 }}
          value={selected}
          onChange={handleSelected}
          size="xs"
          data={[
            { value: "AC", label: "AC" },
            { value: "WA", label: "WA" },
            { value: "TLE", label: "TLE" }
          ]}
        />
      </TableTd>
      {/* solve time */}
      <TableTd role="cell">
        <TextInput
          style={{ maxWidth: 80 }}
          type="number"
          placeholder="e.g. 80"
          form="add-submission"
          size="xs"
          {...form.getInputProps("solveTime")}
          error={false}
        />
      </TableTd>

      {/* tags  */}
      <TableTd role="cell">— </TableTd>

      {/* difficulty  */}
      <TableTd role="cell">— </TableTd>

      {/* solved at */}
      <TableTd role="cell">
        <DatePickerInput
          size="xs"
          valueFormat="DD-MM-YYYY"
          {...form.getInputProps("solvedAt")}
        />
      </TableTd>

      {/* actions */}
      <TableTd role="cell">
        <ActionIcon type="submit" form="add-submission">
          <IconCirclePlus size={18} stroke={1.5} />
        </ActionIcon>
      </TableTd>
    </TableTr>
  );
}
