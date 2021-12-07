import SettingsLayout from "components/SettingsLayout"
import InputField from "components/InputField"
import Avatar from "react-avatar"
import { useFormik } from "formik"
import * as Yup from "yup"

const profileFormSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required"),
  uid: Yup.string()
    .trim()
    .required("University ID is required")
    .length(7, "Invalid University ID"),
  codeforces: Yup.string().trim(),
  codechef: Yup.string(),
  uva: Yup.string(),
  spoj: Yup.string(),
  atcoder: Yup.string(),
})

const EditProfile = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      uid: "",
      codeforces: "",
      codechef: "",
      uva: "",
      spoj: "",
      atcoder: "",
    },
    validationSchema: profileFormSchema,

    onSubmit: (values) => {
      console.log(values)
    },
  })

  const hasError = (field) => formik.touched[field] && formik.errors[field]

  return (
    <SettingsLayout>
      <div className="grid items-start grid-cols-3 gap-8">
        <div className="col-span-2">
          <form className="space-y-12" onSubmit={formik.handleSubmit}>
            {/* edit profile: for name, email and uid  */}
            <div className="space-y-6">
              <h3 className="mb-8">Edit your profile</h3>
              <InputField
                id="name"
                label="Full Name"
                formik={formik}
                haserror={hasError("name")}
                msg={formik.errors.name}
              />
              <InputField
                id="uid"
                label="University ID"
                formik={formik}
                haserror={hasError("uid")}
                msg={formik.errors.uid}
              />
            </div>

            {/* edit profile: online judge handles */}
            <div className="space-y-6">
              <h3 className="mb-8">Online Judge Handles</h3>
              <InputField
                id="codeforces"
                formik={formik}
                label="Codeforces Handle"
              />
              <InputField
                id="codechef"
                formik={formik}
                label="CodeChef Handle"
              />
              <InputField id="uva" formik={formik} label="UVa Handle" />
              <InputField id="spoj" formik={formik} label="SPOJ Handle" />
              <InputField id="atcoder" formik={formik} label="AtCoder Handle" />
            </div>

            {/* save buttons */}
            <div className="flex items-center space-x-6">
              <button className="py-3 btn-outline" type="button">
                Cancel
              </button>
              <button className="btn-primary" type="submit">
                Save Changes
              </button>
            </div>
          </form>
        </div>
        <Avatar name="Fahim Shahrier" size={210} color="#5542F6" round={true} />
      </div>
    </SettingsLayout>
  )
}

export default EditProfile
