import { toast } from "react-toastify"

function showErrorToasts(messages) {
  messages?.forEach((errorMsg) => {
    toast.error(errorMsg, { className: "toast" })
  })
}

export default showErrorToasts
