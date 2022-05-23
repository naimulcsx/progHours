import toast from "react-hot-toast"

function showErrorToasts(messages: string[]) {
  if (typeof messages === "string") {
    toast.error(messages)
  } else {
    messages?.forEach((errorMsg) => {
      toast.error(errorMsg, { className: "toast" })
    })
  }
}

export default showErrorToasts
