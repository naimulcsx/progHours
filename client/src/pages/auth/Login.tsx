import axios from "axios"
import * as Yup from "yup"
import { useFormik } from "formik"
// import toast from "react-hot-toast"
import { Helmet } from "react-helmet-async"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

/**
 * Import Components / Utilities
 */
import showErrorToasts from "@/utils/showErrorToasts"
import AuthContainer from "@/components/AuthContainer"
import { FormControl, Input, ErrorMessage, Label } from "@/components/Form"

/**
 * Yup validation schema for login form
 */
const loginSchema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .required("University ID is required")
    .length(7, "Invalid University ID"),
  password: Yup.string().trim().required("Password is required"),
})

/**
 * Component for login page
 */
const Login = (): JSX.Element => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        /**
         * TODO: REPLACE THIS WITH REACT-QUERY MUTATION
         */
        const { data } = await axios.post("/api/auth/login", values)
        const { user } = data
        localStorage.setItem("isLoggedIn", "1")
        localStorage.setItem("role", "user")
        localStorage.setItem("userId", user.id)
        localStorage.setItem("name", user.name)
        navigate("/dashboard")
        toast.success("Successfully logged in", { className: "toast" })
      } catch (error: any) {
        const { data, status, statusText } = error.response
        // handle bad gateway errors
        if (status === 502) toast.error(statusText)
        showErrorToasts(data.message)
      }
    },
  })
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
      <form onSubmit={formik.handleSubmit} className="mt-8 space-y-4">
        <FormControl
          isInvalid={formik.touched.username && formik.errors.username}
        >
          <Label>University ID</Label>
          <Input type="text" {...formik.getFieldProps("username")}></Input>
          <ErrorMessage>{formik.errors.username}</ErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={formik.touched.password && formik.errors.password}
        >
          <Label>Password</Label>
          <Input type="password" {...formik.getFieldProps("password")}></Input>

          <ErrorMessage>{formik.errors.password}</ErrorMessage>
        </FormControl>
        <div>
          <button type="submit" className="block mt-6 btn-primary">
            Login
          </button>
        </div>
      </form>
    </AuthContainer>
  )
}

export default Login
