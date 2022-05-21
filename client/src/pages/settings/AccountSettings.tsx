import { useFormik } from "formik"
import * as Yup from "yup"
import { FormControl, Input, Label, ErrorMessage } from "@/components/Form"
import { Helmet } from "react-helmet-async"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { getUser, updateUserAccount } from "@/api/user"
import toast from "react-hot-toast"
import showErrorToasts from "@/utils/showErrorToasts"
import { SettingsLayout } from "@/components/layouts/Settings"
import { DashboardLayout } from "@/components/layouts/Dashboard"
import EditProfile from "./HandleSettings"
import Avatar from "@/components/Avatar"
import { userInfo } from "os"
import { useContext } from "react"
import { GlobalContext } from "@/GlobalStateProvider"
import { MailIcon, UserIcon } from "@heroicons/react/solid"

const accountSchema = Yup.object().shape({
  name: Yup.string().trim(),
  uid: Yup.string().trim().length(7, "Invalid University ID"),
  email: Yup.string().trim().email("Invalid email"),
  currentPassword: Yup.string().trim(),
  newPassword: Yup.string().trim(),
  confirmPassword: Yup.string().trim(),
})

const Settings = () => {
  const user = useContext(GlobalContext).user!
  return (
    <DashboardLayout dataDependency={[]}>
      <Helmet>
        <title>Settings</title>
      </Helmet>
      <div className="grid items-start grid-cols-3 gap-4">
        <div className="space-y-4">
          <div className="p-8 bg-white rounded-lg shadow">
            <div className="flex items-center space-x-8">
              <Avatar name={user.name} size="xl" />
              <div>
                <h2 className="flex items-center mb-2 space-x-2 text-2xl">
                  <span>{user.name}</span>
                  <span className="bg-purple-100 text-purple-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-purple-200 dark:text-purple-900">
                    Admin
                  </span>
                </h2>
                <div className="space-y-1 text-gray-700">
                  <p className="flex items-center space-x-2">
                    <UserIcon className="w-5 h-5" />
                    <span>{user.username.toUpperCase()}</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <MailIcon className="w-5 h-5" />
                    <span>{user.email}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <EditProfile />
        </div>

        <div className="col-span-2">
          <AccountSettings />
        </div>
      </div>
    </DashboardLayout>
  )
}

const AccountSettings = () => {
  const client = useQueryClient()

  const formik = useFormik({
    initialValues: {
      name: "",
      uid: "",
      email: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: accountSchema,
    onSubmit: (values) => {
      const {
        name,
        email,
        uid,
        currentPassword,
        newPassword,
        confirmPassword,
      } = values

      // if (currentPassword || newPassword || confirmPassword) {
      //   if (!currentPassword || !newPassword || !confirmPassword) {
      //     return toast.error("field must be filled")
      //   }
      // }

      mutate({
        name,
        email,
        username: uid,
        currentPassword,
        newPassword,
        confirmPassword,
      })
    },
  })

  // update user account
  const { mutate } = useMutation(updateUserAccount, {
    onSuccess: () => {
      client.invalidateQueries("user")
      formik.resetForm()
      toast.success("update account")
    },
    onError: (err: any) => {
      showErrorToasts(err.response.data.message)
    },
  })

  // get user data
  useQuery("user", getUser, {
    onSuccess: (data) => {
      formik.setFieldValue("uid", data.username)
      formik.setFieldValue("name", data.name)
      formik.setFieldValue("email", data.email)
    },
  })
  return (
    <div className="p-8 bg-white rounded-lg shadow">
      <form className="space-y-8" onSubmit={formik.handleSubmit}>
        <div className="mb-12">
          <h4 className="mb-8 font-bold">Account Information</h4>
          <div className="grid grid-cols-2 gap-8">
            <FormControl
              isInvalid={formik.touched.name && !!formik.errors.name}
            >
              <Label>Full Name</Label>
              <Input type="text" {...formik.getFieldProps("name")} />
              <ErrorMessage>{formik.errors.name}</ErrorMessage>
            </FormControl>

            <FormControl isInvalid={formik.touched.uid && !!formik.errors.uid}>
              <Label>University ID</Label>
              <Input type="text" disabled {...formik.getFieldProps("uid")} />
              <ErrorMessage>{formik.errors.uid}</ErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={formik.touched.email && !!formik.errors.email}
            >
              <Label>Email</Label>
              <Input type="email" {...formik.getFieldProps("email")} />
              <ErrorMessage>{formik.errors.email}</ErrorMessage>
            </FormControl>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="mb-8">Change your Password</h4>
          <FormControl
            isInvalid={formik.touched && !!formik.errors.currentPassword}
          >
            <Label>Current Password</Label>
            <Input
              type="password"
              {...formik.getFieldProps("currentPassword")}
            />
            <ErrorMessage>{formik.errors.currentPassword}</ErrorMessage>
          </FormControl>

          <div className="grid grid-cols-2 gap-8">
            <FormControl
              isInvalid={formik.touched && !!formik.errors.newPassword}
            >
              <Label>New Password</Label>
              <Input type="password" {...formik.getFieldProps("newPassword")} />
              <ErrorMessage>{formik.errors.newPassword}</ErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={formik.touched && !!formik.errors.confirmPassword}
            >
              <Label>Confirm Password</Label>
              <Input
                type="password"
                {...formik.getFieldProps("confirmPassword")}
              />
              <ErrorMessage>{formik.errors.newPassword}</ErrorMessage>
            </FormControl>
          </div>
        </div>
        {/* save buttons */}
        <div className="flex items-center justify-end space-x-6">
          <button className="btn-primary" type="submit">
            Save All
          </button>
        </div>
      </form>
    </div>
  )
}

export default Settings
