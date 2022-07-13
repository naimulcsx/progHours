import * as Yup from "yup"
import { Helmet } from "react-helmet-async"
import { Link as ReactRouterLink, useNavigate } from "react-router-dom"
import { Text, useToast, Link, HStack, VStack, Flex } from "@chakra-ui/react"

/**
 * Import Components / Utilities
 */
import showErrorToasts from "@/utils/showErrorToasts"
import AuthLayout from "@/components/layouts/Auth"
import FormBuilder from "@/components/FormBuilder"
import { loginMutation } from "@/api/auth"
import { Heading } from "@chakra-ui/react"
import { DEFAULT_TOAST_OPTIONS } from "@/configs/toast-config"

/**
 * Component for login page
 */
const Login = (): JSX.Element => {
  const toast = useToast(DEFAULT_TOAST_OPTIONS)
  const navigate = useNavigate()
  return (
    <AuthLayout>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <VStack align="start" spacing={2}>
        <Heading size="lg">Login to Account</Heading>
        <Flex as="p" gap={2}>
          Don't have an account?
          <Link as={ReactRouterLink} to="/register">
            Register
          </Link>
        </Flex>
      </VStack>
      <FormBuilder
        mt={6}
        fields={{
          username: {
            type: "text",
            label: "University ID",
            validate: Yup.string()
              .trim()
              .required("University ID is required")
              .length(7, "Invalid University ID"),
          },
          password: {
            type: "password",
            label: "Password",
            validate: Yup.string().trim().required("Password is required"),
          },
        }}
        mutation={loginMutation}
        onSuccess={(res) => {
          const { user } = res.body
          localStorage.setItem("isLoggedIn", "1")
          localStorage.setItem("userId", user.id)
          localStorage.setItem("name", user.name)
          localStorage.setItem("username", user.username)
          localStorage.setItem("role", user.role)
          navigate("/dashboard") // redirect to dashboard
          // create a toast
          toast({
            status: "success",
            title: res.message,
          })
        }}
        onError={(err) => {
          const { data, status, statusText } = err.response
          // handle bad gateway errors
          if (status === 502) toast({ status: "error", title: statusText })
          showErrorToasts(toast, data.message)
        }}
        button={{
          label: "Login",
          className: "mt-6",
          loadingLabel: "Logging in",
        }}
      />
    </AuthLayout>
  )
}

export default Login
