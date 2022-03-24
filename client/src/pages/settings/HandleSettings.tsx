import SettingsLayout from "@/components/SettingsLayout"
import { useFormik } from "formik"
import * as Yup from "yup"
import { FormControl, Input, Label, ErrorMessage } from "@/components/Form"
import { Helmet } from "react-helmet-async"

const profileSchema = Yup.object().shape({
  codeforces: Yup.string().trim(),
  codechef: Yup.string(),
  uva: Yup.string(),
  spoj: Yup.string(),
  atcoder: Yup.string(),
})

const EditProfile = () => {
  const formik = useFormik({
    initialValues: {
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

  return (
    <SettingsLayout>
      <Helmet>
        <title>Settings</title>
      </Helmet>
      <div className="grid items-start grid-cols-3 gap-8">
        <div className="col-span-2">
          <form className="space-y-12" onSubmit={formik.handleSubmit}>
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
        {/* <Avatar name="Fahim Shahrier" size={210} color="#5542F6" round={true} /> */}
      </div>
    </SettingsLayout>
  )
}

export default EditProfile
