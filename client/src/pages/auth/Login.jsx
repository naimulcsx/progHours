import AuthContainer from "@/components/AuthContainer"
import { Helmet } from "react-helmet-async"
import { Link, useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { toast } from "react-toastify"
import getHttpStatusError from "@/utils/getHttpStatusError"
import { FormControl, Input, ErrorMessage, Label } from "@/components/Form"
import showErrorToasts from "../../utils/showErrorToasts"

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .required("University ID is required")
    .length(7, "Invalid University ID"),
  password: Yup.string().trim().required("Password is required"),
})

const Login = () => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post("/api/auth/login", values)
        const { user } = data
        localStorage.setItem("isLoggedIn", 1)
        localStorage.setItem("role", "user")
        localStorage.setItem("userId", user.id)
        localStorage.setItem("name", user.name)
        navigate("/dashboard")
        toast.success("Successfully logged in", { className: "toast" })
      } catch (error) {
        const { data } = error.response
        // toast.error(data.error, { className: "toast" })
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
          <Input
            type="text"
            placeholder=" "
            {...formik.getFieldProps("username")}
          ></Input>
          <Label>University ID</Label>
          <ErrorMessage>{formik.errors.username}</ErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={formik.touched.password && formik.errors.password}
        >
          <Input
            type="password"
            placeholder=" "
            {...formik.getFieldProps("password")}
          ></Input>
          <Label>Password</Label>
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
