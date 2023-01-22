import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"
import { loginMutation } from "~/api/auth"
import LoginTemplate from "~/components/templates/login/Login"
import showToast from "~/utils/showToast"

export default function LoginPage() {
  const navigate = useNavigate()
  const mutation = useMutation(loginMutation, {
    onSuccess: ({ message, body }) => {
      // const user = body.user
      navigate("/dashboard")
      showToast("success", message)
    },
    onError: ({ response }) => {
      const { error, message } = response.data
      showToast("error", message)
    },
  })
  return (
    <LoginTemplate
      onSubmit={(values) => {
        mutation.mutate(values)
      }}
      isLoading={mutation.isLoading}
    />
  )
}
