import React, { HTMLProps, useState } from "react";
import { getSubmissions, useCreateSubmission } from "@proghours/data-access";
import { TextInput, Select, ActionIcon } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { DatePickerInput } from "@mantine/dates";
import {
  IconAlertCircle,
  IconCheck,
  IconCirclePlus
} from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { notifications } from "@mantine/notifications";

const submissionSchema = z.object({
  url: z.string().url().trim().min(1, "Problem link is required"),
  solveTime: z.coerce.number().min(1, "Solve time must be a number"),
  verdict: z.string().min(1, "Verdict is required"),
  solvedAt: z.date()
});

export function CreateSubmissionRow({
  ...props
}: HTMLProps<HTMLTableRowElement>): JSX.Element {
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
    <tr role="row" {...props} style={{ padding: "10px 100px" }}>
      {/* problem link */}

      <td role="cell">
        <form id="add-submission" onSubmit={handleSubmit}></form>
        <TextInput
          sx={{ maxWidth: 280 }}
          form="add-submission"
          placeholder="Problem Link"
          size="xs"
          {...form.getInputProps("url")}
          error={false}
        />
      </td>

      {/* verdict */}
      <td role="cell">
        <Select
          sx={{ maxWidth: 70 }}
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
      {/* solve time */}
      <td role="cell">
        <TextInput
          sx={{ maxWidth: 80 }}
          type="number"
          placeholder="e.g. 80"
          form="add-submission"
          size="xs"
          {...form.getInputProps("solveTime")}
          error={false}
        />
      </td>

      {/* tags  */}
      <td role="cell">— </td>

      {/* difficulty  */}
      <td role="cell">— </td>

      {/* solved at */}
      <td role="cell">
        <DatePickerInput
          size="xs"
          sx={{ maxWidth: 100 }}
          valueFormat="DD-MM-YYYY"
          {...form.getInputProps("solvedAt")}
        />
      </td>

      {/* actions */}
      <td role="cell">
        <ActionIcon type="submit" form="add-submission">
          <IconCirclePlus size={18} stroke={1.5} />
        </ActionIcon>
      </td>
    </tr>
  );
}
