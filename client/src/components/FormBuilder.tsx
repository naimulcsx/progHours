import * as Yup from "yup"
import { useFormik } from "formik"
import { useMutation } from "react-query"
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Box,
  VStack,
  Button,
  Spinner,
  HStack,
  Select,
  BoxProps,
  FormHelperText,
  ButtonProps,
  ModalBody,
  ModalFooter,
  InputLeftAddon,
  InputGroup,
  Textarea,
  useColorModeValue as mode,
} from "@chakra-ui/react"
import React from "react"

const FormBuilder = ({
  fields,
  mutation,
  onError,
  onSuccess,
  button,
  isModal = false,
  ...props
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
    // onMutate: async () => {},
  })
  const {
    handleSubmit,
    getFieldProps,
    errors,
    touched,
    setFieldValue,
    values: formikValues,
  } = useFormik({
    initialValues: values,
    validationSchema: Yup.object().shape(validationRules),
    onSubmit: async (values) => {
      console.log(values)
      await mutateAsync(values)
    },
  })
  return (
    <Box {...props}>
      <form onSubmit={handleSubmit}>
        {React.createElement(
          isModal ? ModalBody : "div",
          {},
          <VStack spacing={3}>
            {Object.keys(fields).map((key) => {
              return (
                <FormControl
                  key={key}
                  isInvalid={touched[key] && (errors[key] ? true : false)}
                >
                  <FormLabel>{fields[key].label}</FormLabel>
                  {fields[key].type === "select" ? (
                    <Select
                      {...getFieldProps(key)}
                      placeholder={fields[key].placeholder}
                    >
                      {fields[key].options?.map((item, i) => {
                        const isArray = Array.isArray(item)
                        if (isArray)
                          return (
                            <option key={i} value={item[1]}>
                              {item[0]}
                            </option>
                          )
                        return (
                          <option key={i} value={item}>
                            {item}
                          </option>
                        )
                      })}
                    </Select>
                  ) : fields[key].type === "textarea" ? (
                    <Textarea
                      placeholder={fields[key].placeholder}
                      {...getFieldProps(key)}
                    />
                  ) : (
                    <InputGroup>
                      {fields[key].leftAddon && (
                        <InputLeftAddon children={fields[key].leftAddon} />
                      )}
                      <Input
                        type={fields[key].type}
                        {...getFieldProps(key)}
                        disabled={!!fields[key].disabled}
                      />
                    </InputGroup>
                  )}
                  {fields[key].helperText && (
                    <FormHelperText>{fields[key].helperText}</FormHelperText>
                  )}
                  <FormErrorMessage>{errors[key] as string}</FormErrorMessage>
                </FormControl>
              )
            })}
          </VStack>
        )}
        {React.createElement(
          isModal ? ModalFooter : "div",
          {},
          <Button
            type="submit"
            disabled={isLoading}
            mt={isModal ? "0" : "6"}
            w="full"
            variant={button.variant ?? "solid"}
            colorScheme={button.colorScheme ?? "blue"}
          >
            <HStack spacing="2">
              {isLoading && <Spinner color="white" size="sm" />}
              <span>{isLoading ? button.loadingLabel : button.label}</span>
            </HStack>
          </Button>
        )}
      </form>
    </Box>
  )
}

export default FormBuilder

interface FormButton extends ButtonProps {
  label: string
  loadingLabel: string
}

interface FormBuilderProps extends BoxProps {
  isModal?: boolean
  className?: string
  fields: {
    [key: string]: {
      type: string
      label: string
      initialValue?: string
      validate: Yup.AnySchema
      value?: string
      options?: Array<string> | [string, string][]
      helperText?: string
      disabled?: boolean
      placeholder?: string
      leftAddon?: string
    }
  }
  mutation: any
  onSuccess: (value: any) => void
  onError: (err: any) => void
  button: FormButton
}
