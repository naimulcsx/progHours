import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"
import { registerMutation } from "~/api/auth"
import RegisterTemplate from "~/components/templates/register/Register"
import showToast from "~/utils/showToast"

export default function RegisterPage() {
  const navigate = useNavigate()
  const mutation = useMutation(registerMutation, {
    onSuccess: ({ message, body }) => {
      showToast("success", message)
      navigate("/dashboard")
    },
    onError: ({ response }) => {
      const { message } = response.data
      showToast("error", message)
    },
  })
  return (
    <RegisterTemplate
      onSubmit={(values) => {
        mutation.mutate(values)
      }}
      isLoading={mutation.isLoading}
    />
  )
}
