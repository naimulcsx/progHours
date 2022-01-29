import AuthContainer from "components/AuthContainer"
import { Link, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { toast } from "react-toastify"
import getHttpStatusError from "utils/getHttpStatusError"
import { FormControl, Label, ErrorMessage, Input } from "components/Form"

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
        console.dir(error)
        const { data, status } = error.response
        if (status != 200) {
          toast.error(getHttpStatusError(status), { className: "toast" })
        }
        data.errors?.forEach(({ message }) => {
          toast.error(message, { className: "toast" })
        })
      }
    },
  })

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
          <FormControl isInvalid={formik.touched.name && formik.errors.name}>
            <Input
              type="text"
              placeholder=" "
              {...formik.getFieldProps("name")}
            />
            <Label>Name</Label>
            <ErrorMessage>{formik.errors.name}</ErrorMessage>
          </FormControl>

          <FormControl isInvalid={formik.touched.email && formik.errors.email}>
            <Input
              type="email"
              placeholder=" "
              {...formik.getFieldProps("email")}
            />
            <Label>Email</Label>
            <ErrorMessage>{formik.errors.email}</ErrorMessage>
          </FormControl>

          <FormControl isInvalid={formik.touched.uid && formik.errors.uid}>
            <Input
              type="text"
              placeholder=" "
              {...formik.getFieldProps("uid")}
            />
            <Label>University ID</Label>
            <ErrorMessage>{formik.errors.uid}</ErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={formik.touched.password && formik.errors.password}
          >
            <Input
              type="password"
              placeholder=" "
              {...formik.getFieldProps("password")}
            />
            <Label>Password</Label>
            <ErrorMessage>{formik.errors.password}</ErrorMessage>
          </FormControl>
        </div>
        <div className="mt-8 space-y-4">
          <p className="text-sm">
            By clicking below to signup, you're agreeing to our terms of
            service.
          </p>
          <button type="submit" className="block w-full btn-primary">
            Register
          </button>
        </div>
      </form>
    </AuthContainer>
  )
}

export default Register
