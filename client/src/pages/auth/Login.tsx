import * as Yup from "yup"
import { Helmet } from "react-helmet-async"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

/**
 * Import Components / Utilities
 */
import showErrorToasts from "@/utils/showErrorToasts"
import AuthContainer from "@/components/AuthContainer"
import FormBuilder from "@/components/FormBuilder"

/**
 * Component for login page
 */
const Login = (): JSX.Element => {
  const navigate = useNavigate()
  return (
    <AuthContainer>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="space-y-3">
        <h2>Login to Account</h2>
        <p>
          Don't have an account?
          <Link to="/register" className="ml-1 text-primary">
            Register
          </Link>
        </p>
      </div>
      <FormBuilder
        className="mt-6 space-y-4"
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
        api="/api/auth/login"
        onSuccess={(res) => {
          const { user } = res.data
          localStorage.setItem("isLoggedIn", "1")
          localStorage.setItem("role", "user")
          localStorage.setItem("userId", user.id)
          localStorage.setItem("name", user.name)
          navigate("/dashboard") // redirect to dashboard
          toast.success("Logged in") // create a toast
        }}
        onError={(err) => {
          const { data, status, statusText } = err.response
          // handle bad gateway errors
          if (status === 502) toast.error(statusText)
          showErrorToasts(data.message)
        }}
        button={{
          label: "Login",
          className: "mt-6",
        }}
      />
    </AuthContainer>
  )
}

export default Login
