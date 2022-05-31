import * as Yup from "yup"
import { useFormik } from "formik"
import { twMerge } from "tailwind-merge"
import { ErrorMessage, FormControl, Input, Label } from "@/components/Form"
import { useMutation } from "react-query"
import Spinner from "./Spinner"

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
  mutation: any
  onSuccess: (value: any) => void
  onError: (err: any) => void
  button: {
    className?: string
    type?: string
    label: string
    loadingLabel: string
  }
}

const FormBuilder = ({
  className,
  fields,
  mutation,
  onError,
  onSuccess,
  button,
}: FormBuilderProps) => {
  const values: any = {}
  const validationRules: { [key: string]: Yup.AnySchema } = {}
  Object.keys(fields).map((key) => {
    values[key] = fields[key].initialValue ? fields[key].initialValue : ""
    validationRules[key] = fields[key].validate
  })
  const { mutateAsync, isLoading } = useMutation(mutation, {
    onSuccess,
    onError,
    onMutate: async () => {},
  })
  const { handleSubmit, getFieldProps, errors, touched } = useFormik({
    initialValues: values,
    validationSchema: Yup.object().shape(validationRules),
    onSubmit: async (values) => {
      await mutateAsync(values)
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
          "block w-full bg-primary text-white h-11 mt-4 rounded-lg disabled:bg-slate-300",
          button.className
        )}
        disabled={isLoading}
      >
        <span className="inline-flex items-center space-x-2">
          {isLoading && <Spinner />}
          {isLoading ? button.loadingLabel : button.label}
        </span>
      </button>
    </form>
  )
}

export default FormBuilder
