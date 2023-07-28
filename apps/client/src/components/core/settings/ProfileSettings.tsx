import { useForm, zodResolver } from "@mantine/form";
import { Box, Button, Divider, Grid, Select, TextInput } from "@mantine/core";
import { useActiveUser, useUserMutation } from "@proghours/data-access";
import { useEffect } from "react";
import { z } from "zod";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";

const userUpdateSchema = z.object({
  fullName: z.string().min(8),
  email: z.string().email("Invalid email").nonempty("Email is required"),
  mobile: z.string().optional(),
  department: z.string().optional(),
  section: z.string().optional(),
  batch: z.coerce.number().optional(),
  cgpa: z.coerce.number().min(0).max(4).optional()
});

export function ProfileSettings() {
  const { data: user } = useActiveUser();
  const { mutate } = useUserMutation({
    config: {
      onSuccess() {
        notifications.show({
          title: "🎉 Congratulations!",
          message: "Your profile has been successfully updated.",
          icon: <IconCheck />,
          color: "green"
        });
      }
    }
  });
  const form = useForm({
    initialValues: {
      fullName: "",
      username: "",
      email: "",
      phone: "",
      department: "",
      batch: "",
      section: "",
      cgpa: ""
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
        cgpa: user.metaData?.cgpa?.toString() || ""
      });
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [user]);

  const handleSubmit = form.onSubmit((values) => {
    const { fullName, email, phone, department, batch, section, cgpa } = values;
    const data = {
      fullName,
      email,
      ...(phone !== "" && { phone }),
      metaData: {
        ...(department !== "" && { department }),
        ...(batch !== "" && { batch: parseInt(batch) }),
        ...(section !== "" && { section }),
        ...(cgpa !== "" && { cgpa: parseInt(cgpa) })
      }
    };
    const username: string = user!.username;
    mutate({
      username,
      ...data
    });
  });

  return (
    <Box>
      {user && (
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

            <Grid.Col span={12}>
              <Divider label="University Details" />
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
              <Select
                label="Section"
                {...form.getInputProps("section")}
                placeholder="Select"
                data={[
                  { value: "AM", label: "AM" },
                  { value: "BM", label: "BM" },
                  { value: "CM", label: "CM" },
                  { value: "DM", label: "DM" },
                  { value: "EM", label: "EM" },
                  { value: "FM", label: "FM" },
                  { value: "AF", label: "AF" },
                  { value: "BF", label: "BF" },
                  { value: "CF", label: "CF" }
                ]}
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
              <Divider label="Contact Details" />
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
              <Divider label="Social" />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInput label="Facebook" placeholder="facebook profile URL" />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput label="Whatsapp" placeholder="Whatsapp number" />
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
