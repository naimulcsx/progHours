import SettingsLayout from "components/SettingsLayout"
import Avatar from "react-avatar"
import { useFormik } from "formik"
import * as Yup from "yup"
import { FormControl, Input, Label, ErrorMessage } from "components/Form"

const profileSchema = Yup.object().shape({
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
    validationSchema: profileSchema,

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

              <FormControl
                isInvalid={formik.touched.name && formik.errors.name}
              >
                <Input
                  type="text"
                  placeholder=" "
                  {...formik.getFieldProps("name")}
                />
                <Label>Full Name</Label>
                <ErrorMessage>{formik.errors.name}</ErrorMessage>
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
            </div>

            {/* edit profile: online judge handles */}
            <div className="space-y-6">
              <h3 className="mb-8">Online Judge Handles</h3>

              <FormControl>
                <Input
                  type="text"
                  placeholder=" "
                  {...formik.getFieldProps("codeforces")}
                />
                <Label>Codeforces Handle</Label>
              </FormControl>

              <FormControl>
                <Input
                  type="text"
                  placeholder=" "
                  {...formik.getFieldProps("codechef")}
                />
                <Label>CodeChef Handle</Label>
              </FormControl>

              <FormControl>
                <Input
                  type="text"
                  placeholder=" "
                  {...formik.getFieldProps("uva")}
                />
                <Label>UVa Handle</Label>
              </FormControl>

              <FormControl>
                <Input
                  type="text"
                  placeholder=" "
                  {...formik.getFieldProps("spoj")}
                />
                <Label>SPOJ Handle</Label>
              </FormControl>

              <FormControl>
                <Input
                  type="text"
                  placeholder=" "
                  {...formik.getFieldProps("atcoder")}
                />
                <Label>AtCoder Handle</Label>
              </FormControl>
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
