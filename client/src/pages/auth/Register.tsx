import * as Yup from "yup"
import { useToast } from "@chakra-ui/react"
import { Helmet } from "react-helmet-async"
import { Link as ReactRouterLink, useNavigate } from "react-router-dom"

/**
 * Import Components / Utilities
 */
import showErrorToasts from "@/utils/showErrorToasts"
import AuthLayout from "@/components/layouts/Auth"
import FormBuilder from "@/components/FormBuilder"
import { registerMutation } from "@/api/auth"
import { Flex, Heading, VStack, Link } from "@chakra-ui/react"
import { DEFAULT_TOAST_OPTIONS } from "@/configs/toast-config"

/**
 * Component for registration page
 */
const Register = (): JSX.Element => {
  const toast = useToast(DEFAULT_TOAST_OPTIONS)
  const navigate = useNavigate()
  return (
    <AuthLayout>
      {/* @ts-ignore */}
      <Helmet>
        <title>Register</title>
      </Helmet>
      <VStack align="start" spacing={2}>
        <Heading size="lg">Login to Account</Heading>
        <Flex as="p" gap={2}>
          Already an account?
          <Link as={ReactRouterLink} to="/login">
            Login
          </Link>
        </Flex>
      </VStack>
      {/* regitstration form */}
      <FormBuilder
        mt={6}
        fields={{
          name: {
            type: "text",
            label: "Full Name",
            validate: Yup.string().trim().required("Name is required"),
          },
          email: {
            type: "text",
            label: "Email",
            validate: Yup.string()
              .trim()
              .required("Email is required")
              .email("Invalid email"),
          },
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
            helperText: "Must contain at least 8 charecters.",
          },
        }}
        button={{
          label: "Register",
          className: "mt-6",
          loadingLabel: "Registering",
        }}
        mutation={registerMutation}
        onSuccess={(res) => {
          // redirect to the login page
          navigate("/login")
          // show the toast message
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
      />
    </AuthLayout>
  )
}

export default Register
