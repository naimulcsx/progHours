import { IconCheck } from "@tabler/icons-react";
import { useEffect } from "react";
import { z } from "zod";

import { Box, Button, Divider, Grid, Select, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import {
  useActiveUser,
  useInstitutions,
  useUserMutation
} from "@proghours/data-access";

const userUpdateSchema = z.object({
  fullName: z.string().min(8),
  email: z.string().email("Invalid email").nonempty("Email is required"),
  mobile: z.string().optional(),
  department: z.string().optional(),
  section: z.string().optional(),
  batch: z.coerce.number().optional(),
  cgpa: z.coerce.number().min(0).max(4).optional(),
  institutionId: z.string()
});

export function ProfileSettings() {
  const { data: user } = useActiveUser();
  const { mutate } = useUserMutation({
    config: {
      onSuccess() {
        notifications.show({
          variant: "proghours-ui",
          title: "🎉 Congratulations!",
          message: "Your profile has been successfully updated.",
          icon: <IconCheck />,
          color: "green"
        });
      }
    }
  });

  const { data: institutions } = useInstitutions();

  const form = useForm({
    initialValues: {
      fullName: "",
      username: "",
      email: "",
      phone: "",
      department: "",
      batch: "",
      section: "",
      cgpa: "",
      institutionId: ""
    },
    validate: zodResolver(userUpdateSchema)
  });
  useEffect(() => {
    if (user) {
      form.setValues({
        fullName: user.fullName,
        email: user.email,
        phone: user.phone || "",
        department: user.metaData?.department || "",
        section: user.metaData?.section || "",
        batch: user.metaData?.batch?.toString() || "",
        cgpa: user.metaData?.cgpa?.toString() || "",
        institutionId: user.institutionId ? user.institutionId.toString() : ""
      });
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [user]);

  const handleSubmit = form.onSubmit((values) => {
    const {
      fullName,
      email,
      phone,
      department,
      batch,
      section,
      cgpa,
      institutionId
    } = values;
    const data = {
      fullName,
      email,
      ...(phone !== "" && { phone }),
      ...(institutionId !== "" && { institutionId }),
      metaData: {
        ...(department !== "" && { department }),
        ...(batch !== "" && { batch: parseInt(batch) }),
        ...(section !== "" && { section }),
        ...(cgpa !== "" && { cgpa: parseFloat(cgpa) })
      }
    };
    if (user?.username) {
      mutate({
        username: user.username,
        ...data
      });
    }
  });

  return (
    <Box>
      {user && institutions && (
        <form onSubmit={handleSubmit}>
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Full Name"
                {...form.getInputProps("fullName")}
                withAsterisk
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                disabled
                label="University ID"
                defaultValue={user?.username.toUpperCase()}
                withAsterisk
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInput
                label="Email"
                {...form.getInputProps("email")}
                withAsterisk
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput label="Phone" {...form.getInputProps("phone")} />
            </Grid.Col>

            <Grid.Col span={12}>
              <Divider labelPosition="left" label="Institution Details" />
            </Grid.Col>

            <Grid.Col span={6}>
              <Select
                label="Institution Name"
                placeholder="Select your College / University"
                data={institutions.map((i) => ({
                  value: i.id.toString(),
                  label: i.name
                }))}
                searchable
                {...form.getInputProps("institutionId")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <Select
                label="Department"
                placeholder="Select"
                {...form.getInputProps("department")}
                data={[
                  "Computer Science and Engineering",
                  "Computer and Communication Engineering",
                  "Electrical and Electronics Engineering"
                ]}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                type="number"
                label="Batch"
                {...form.getInputProps("batch")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInput
                type="number"
                label="CGPA"
                {...form.getInputProps("cgpa")}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <Button mt="sm" type="submit" w="100%">
                Save
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      )}
    </Box>
  );
}
