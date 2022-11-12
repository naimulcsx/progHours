import { useQueryClient } from "react-query"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Alert, Button, Paper, Stack, TextInput } from "@mantine/core"
import { IconAlertCircle } from "@tabler/icons"

const UpdateGroup = ({ group }: any) => {
  return (
    <Paper
      sx={(theme) => ({
        background: theme.white,
        padding: theme.spacing.xl,
        boxShadow: theme.shadows.xs,
        borderRadius: theme.radius.md,
        overflow: "hiddeen",
      })}
    >
      <Stack>
        <TextInput
          withAsterisk
          label="Group Name"
          type="text"
          defaultValue={group?.name}
        />
        <TextInput
          withAsterisk
          description="Slug to be used in the URL of the groups. Space is not allowed."
          label="Slug"
          type="text"
          defaultValue={group?.hashtag}
        />
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Warning!"
          color="red"
        >
          This will delete your group permanently.
        </Alert>
        <Button sx={{ alignSelf: "start" }}>Update</Button>
      </Stack>

      {/* <FormBuilder
        fields={{
          name: {
            type: "text",
            label: "Group Name",
            validate: Yup.string().trim().required("Group Name is required"),
            initialValue: group?.name,
          },
          hashtag: {
            type: "text",
            label: "Hashtag",
            leftAddon: "#",
            validate: Yup.string().trim().required("Group tag is required"),
            initialValue: group?.hashtag,
          },
        }}
        mutation={(values: any) => {
          return editGroup(group.id, values)
        }}
        onSuccess={(data) => {
          queryClient.invalidateQueries(`groups/${group?.hashtag}`)
          toast({ status: "success", title: "Group Info updated" })

          navigate(`/groups/${data?.body.group.hashtag}`)
        }}
        onError={(err) => {
          const errorMessage =
            err?.response?.data?.message || "Something went wrong!"
          toast({ status: "error", title: errorMessage })
        }}
        button={{
          label: "Save",
          loadingLabel: "Saving...",
        }}
      /> */}

      {/* <Stack mt={"8"} align="start" spacing={4}>
        <Alert status="warning">
          <AlertIcon />
          Warning! This will delete your group permanently.
        </Alert>
        <Button
          leftIcon={<TrashIcon height={20} />}
          colorScheme="red"
          variant="solid"
          onClick={() => setIsOpen(true)}
        >
          Delete Group
        </Button>
      </Stack> */}

      {/* delete popup */}
      {/* <DeleteGroupModal
        id={group.id}
        name={group.name}
        hashtag={group.hashtag}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      /> */}
    </Paper>
  )
}

export default UpdateGroup
