import * as Yup from "yup"
import toast from "react-hot-toast"
import { Helmet } from "react-helmet-async"
import { Link, useNavigate } from "react-router-dom"

/**
 * Import Components / Utilities
 */
import showErrorToasts from "@/utils/showErrorToasts"
import AuthContainer from "@/components/AuthContainer"
import FormBuilder from "@/components/FormBuilder"

/**
 * Component for registration page
 */
const Register = (): JSX.Element => {
  const navigate = useNavigate()
  return (
    <AuthContainer>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="space-y-3">
        <h2>Create New Account</h2>
        <p>
          Already have an account?
          <Link to="/login" className="ml-1 text-primary">
            Login
          </Link>
        </p>
      </div>
      <FormBuilder
        className="mt-6 space-y-4"
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
          },
        }}
        api="/api/auth/register"
        onSuccess={(res) => {
          // redirect to the login page
          navigate("/login")
          // create a toast
          toast.success("Account created!")
        }}
        onError={(err) => {
          const { data, status, statusText } = err.response
          // handle bad gateway errors
          if (status === 502) toast.error(statusText)
          showErrorToasts(data.message)
        }}
        button={{
          label: "Register",
          className: "mt-6",
        }}
      />
    </AuthContainer>
  )
}

export default Register
