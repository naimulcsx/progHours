import {
  Container,
  FormControl,
  FormLabel,
  Code,
  Link,
  FormErrorMessage,
} from "@chakra-ui/react"
import { Select } from "chakra-react-select"

export default function Tags({ data, setSelected }) {
  return (
    <FormControl>
      <FormLabel>Tags</FormLabel>
      <Select
        useBasicStyles
        isMulti
        name="colors"
        placeholder="Select some colors..."
        closeMenuOnSelect={false}
        defaultValue={data}
        variant="filled"
        onChange={(e) => {
          setSelected(e)
        }}
      />
    </FormControl>
  )
}
