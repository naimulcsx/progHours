import { Input } from "@chakra-ui/react"
import { useFormik } from "formik"
export default function InputFilter({ setFilter }) {
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <Input
        w={32}
        ml={4}
        id="search"
        name="search"
        type="text"
        placeholder="Search"
        onChange={(e) => {
          //console.log(e.target.value)
          setFilter(e.target.value)
          return formik.handleChange(e)
        }}
        value={formik.values.search}
      />
    </form>
  )
}
