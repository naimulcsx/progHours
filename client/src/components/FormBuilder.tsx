import * as Yup from "yup"
import { useFormik } from "formik"
import { twMerge } from "tailwind-merge"
import axios, { AxiosResponse } from "axios"
import { useNavigate } from "react-router-dom"
import { ErrorMessage, FormControl, Input, Label } from "@/components/Form"

interface FormBuilderProps {
  className?: string
  fields: {
    [key: string]: {
      type: string
      label: string
      initialValue?: string
      validate: Yup.AnySchema
    }
  }
  api: string
  onSuccess: (value: AxiosResponse<any, any>) => void
  onError: (err: any) => void
  button: {
    className?: string
    type?: string
    label: string
  }
}

const FormBuilder = ({
  className,
  fields,
  api,
  onError,
  onSuccess,
  button,
}: FormBuilderProps) => {
  const navigate = useNavigate()
  const values: any = {}
  const validationRules: { [key: string]: Yup.AnySchema } = {}
  Object.keys(fields).map((key) => {
    values[key] = fields[key].initialValue ? fields[key].initialValue : ""
    validationRules[key] = fields[key].validate
  })
  const { handleSubmit, getFieldProps, errors, touched } = useFormik({
    initialValues: values,
    validationSchema: Yup.object().shape(validationRules),
    onSubmit: (values) => {
      axios.post(api, values).then(onSuccess).catch(onError)
    },
  })
  return (
    <form onSubmit={handleSubmit}>
      <div className={twMerge("space-y-4", className)}>
        {Object.keys(fields).map((key) => {
          return (
            <FormControl
              isInvalid={touched[key] && (errors[key] ? true : false)}
            >
              <Label>{fields[key].label}</Label>
              <Input type={fields[key].type} {...getFieldProps(key)} />
              <ErrorMessage>{errors[key]}</ErrorMessage>
            </FormControl>
          )
        })}
      </div>
      <button
        type="submit"
        className={twMerge(
          "block w-full bg-primary text-white py-3 mt-4 rounded-lg",
          button.className
        )}
      >
        {button.label}
      </button>
    </form>
  )
}

export default FormBuilder
