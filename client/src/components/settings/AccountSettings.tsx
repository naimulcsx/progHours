import toast from "react-hot-toast"
import {
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useFormik } from "formik"
import * as Yup from "yup"
import { getUser, updateUserAccount } from "@/api/user"
import showErrorToasts from "@/utils/showErrorToasts"
import { QuestionMarkCircleIcon } from "@heroicons/react/solid"

const accountSchema = Yup.object().shape({
  name: Yup.string().trim(),
  uid: Yup.string().trim().length(7, "Invalid University ID"),
  email: Yup.string().trim().email("Invalid email"),
  currentPassword: Yup.string().trim(),
  newPassword: Yup.string().trim(),
  confirmPassword: Yup.string().trim(),
})

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
              <FormLabel>Full Name</FormLabel>
              <Input type="text" {...formik.getFieldProps("name")} />
              <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={formik.touched.uid && !!formik.errors.uid}>
              <FormLabel>University ID</FormLabel>
              <Input type="text" disabled {...formik.getFieldProps("uid")} />
              <FormErrorMessage>{formik.errors.uid}</FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={formik.touched.email && !!formik.errors.email}
            >
              <FormLabel>Email</FormLabel>
              <Input type="email" {...formik.getFieldProps("email")} />
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="mb-8">Change your Password</h4>
          <FormControl
            isInvalid={formik.touched && !!formik.errors.currentPassword}
          >
            <FormLabel>Current Password</FormLabel>
            <Input
              type="password"
              {...formik.getFieldProps("currentPassword")}
            />
            <FormErrorMessage>{formik.errors.currentPassword}</FormErrorMessage>
          </FormControl>

          <div className="grid grid-cols-2 gap-8">
            <FormControl
              isInvalid={formik.touched && !!formik.errors.newPassword}
            >
              <FormLabel>New Password</FormLabel>
              <Input type="password" {...formik.getFieldProps("newPassword")} />
              <FormErrorMessage>{formik.errors.newPassword}</FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={formik.touched && !!formik.errors.confirmPassword}
            >
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                {...formik.getFieldProps("confirmPassword")}
              />
              <FormErrorMessage>{formik.errors.newPassword}</FormErrorMessage>
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

export default AccountSettings
