import AuthContainer from "components/AuthContainer"
import { Link, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { toast } from "react-toastify"

const reigsterSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required"),
  email: Yup.string()
    .trim()
    .required("Email is required")
    .email("Invalid email"),
  uid: Yup.string()
    .trim()
    .required("University ID is required")
    .length(7, "Invalid University ID"),
  password: Yup.string().trim().required("Password is required"),
})

const Register = () => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      uid: "",
      password: "",
    },
    validationSchema: reigsterSchema,
    onSubmit: async (values) => {
      try {
        await axios.post("/api/auth/register", values)
        // redirect to the login page
        navigate("/login")
        // create a toast
        toast.success("Account successfully created")
      } catch (error) {
        const { data } = error.response
        data.errors.forEach(({ message }) => {
          toast.error(message, { className: "toast" })
        })
      }
      // console.log(values)
      // do something with the values
    },
  })
  const hasError = (field) => formik.touched[field] && formik.errors[field]
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
      <form className="mt-8" onSubmit={formik.handleSubmit}>
        <div className="space-y-4">
          <div className="form-group">
            <input
              id="name"
              placeholder=" "
              autoComplete="off"
              {...formik.getFieldProps("name")}
            />
            <label htmlFor="name">Name</label>
            {hasError("name") && (
              <div className="error-message">{formik.errors.name}</div>
            )}
          </div>
          <div className="form-group">
            <input
              id="email"
              placeholder=" "
              autoComplete="off"
              {...formik.getFieldProps("email")}
            />
            <label htmlFor="email">Email</label>
            {/* chcek for errors */}
            {hasError("email") && (
              <div className="error-message">{formik.errors.email}</div>
            )}
          </div>
          <div className="form-group">
            <input
              id="uid"
              placeholder=" "
              autoComplete="off"
              {...formik.getFieldProps("uid")}
            />
            <label htmlFor="uid">University ID</label>
            {hasError("uid") && (
              <div className="error-message">{formik.errors.uid}</div>
            )}
          </div>
          <div className="form-group">
            <input
              id="password"
              type="password"
              placeholder=" "
              autoComplete="off"
              {...formik.getFieldProps("password")}
            />
            <label htmlFor="password">Password</label>
            {hasError("password") && (
              <div className="error-message">{formik.errors.password}</div>
            )}
          </div>
        </div>
        <div className="mt-8 space-y-4">
          <p className="text-sm">
            By clicking below to signup, you're agreeing to our terms of
            service.
          </p>
          <button type="submit" className="block btn-primary">
            Register
          </button>
        </div>
      </form>
    </AuthContainer>
  )
}

export default Register
