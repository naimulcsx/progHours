import { addMember } from "@/api/groups"
import { Button, ModalBody, useToast } from "@chakra-ui/react"
import FormBuilder from "../FormBuilder"
import PopupBuilder from "../PopupBuilder"
import * as yup from "yup"
import { DEFAULT_TOAST_OPTIONS } from "@/configs/toast-config"
import { useQueryClient } from "react-query"
import { useState } from "react"
import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react"

export const AddUserToGroupModal = ({
  isOpen,
  setIsOpen,
  groupName,
  groupId,
  hashtag,
}: any) => {
  const toast = useToast(DEFAULT_TOAST_OPTIONS)
  const queryClient = useQueryClient()
  const [failed, setFailed] = useState([])

  const downloadFailed = () => {
    let fileContent = ""
    failed.forEach((el: any) => (fileContent += `${el.username}\n`))
    console.log(fileContent)
    const tempLink = document.createElement("a")
    var blob = new Blob([fileContent], { type: "text/plain" })
    tempLink.setAttribute("href", URL.createObjectURL(blob))
    tempLink.setAttribute("download", "failed.txt")
    tempLink.click()
    URL.revokeObjectURL(tempLink.href)
  }

  return (
    <PopupBuilder
      isOpen={isOpen}
      setIsOpen={(state: any) => {
        setIsOpen(state)
        setFailed([])
      }}
      title={`Add Members [${groupName}]`}
      description="Enter the University IDs of the users that you want to add to the group."
    >
      {failed.length > 0 && (
        <ModalBody>
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>
              Failed to add {failed.length} member(s).{" "}
              <Button variant="link" size="sm" onClick={downloadFailed}>
                Download list
              </Button>
            </AlertTitle>
          </Alert>
        </ModalBody>
      )}
      <FormBuilder
        isModal
        fields={{
          username: {
            type: "textarea",
            label: "University IDs",
            placeholder: "C181065\nC181066\nC181067\n...",
            validate: yup.string().trim().required("University ID is required"),
          },
        }}
        mutation={addMember(groupId)}
        onSuccess={(res) => {
          queryClient.invalidateQueries(`groups/${hashtag}`)
          toast({ status: "success", title: res.message })
          // close if there is no errors
          if (res.body.failed.length === 0) {
            setIsOpen(false)
          } else {
            // show the failed entries
            setFailed(res.body.failed)
          }
        }}
        onError={(err) => {
          const errorMessage =
            err?.response?.data?.message || "Something went wrong!"
          toast({ status: "error", title: errorMessage })
        }}
        button={{
          label: "Add members",
          className: "mt-6",
          loadingLabel: "Adding...",
        }}
      />
    </PopupBuilder>
  )
}
