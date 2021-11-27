import { InputField } from "./base/InputBox"
import { useFormik } from "formik"
import * as Yup from "yup"

const profileFormSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required"),
  uid: Yup.string()
    .trim()
    .required("University ID is required")
    .length(7, "Invalid University ID"),
})

export default function EditProfileForm() {
  const formik = useFormik({
    initialValues: { name: "", uid: "" },
    validationSchema: profileFormSchema,

    onSubmit: (values) => {
      console.log(values)
    },
  })

  const hasError = (field) => formik.touched[field] && formik.errors[field]

  return (
    <form className="mt-10 space-y-10">
      <InputField
        id="name"
        label="Full Name"
        formik={formik}
        hasError={hasError("name")}
        msg={formik.errors.name}
      />

      <InputField
        id="uid"
        label="University ID"
        formik={formik}
        hasError={hasError("uid")}
        msg={formik.errors.uid}
      />

      <h4 className="my-8 text-mainDark">Online Judge Handles</h4>

      <InputField id="codeforces" label="Codeforces Handle" />

      <InputField id="codechef" label="CodeChef Handle" />

      <InputField id="uva" label="UVa Handle" />

      <InputField id="spoj" label="SPOJ Handle" />

      <InputField id="atcoder" label="AtCoder Handle" />

      <div className="mt-20 flex items-center space-x-6">
        <button className="btn-outline-primary" type="button">
          Cancel
        </button>
        <button className="btn-primary">Save Changes</button>
      </div>
    </form>
  )
}
