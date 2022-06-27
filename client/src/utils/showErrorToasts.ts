import { useToast } from "@chakra-ui/react"

function showErrorToasts(toast, messages: string[]) {
  if (typeof messages === "string") {
    toast({ status: "error", title: messages })
  } else {
    messages?.forEach((errorMsg) => {
      toast({ status: "error", title: errorMsg })
    })
  }
}

export default showErrorToasts
