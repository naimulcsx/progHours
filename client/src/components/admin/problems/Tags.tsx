import {
  Container,
  FormControl,
  FormLabel,
  Code,
  Link,
  FormErrorMessage,
} from "@chakra-ui/react"
import { Select } from "chakra-react-select"

export default function Tags({ data }) {
  return (
    <FormControl>
      <FormLabel>
        Select Colors and Flavours <Code>size="md" (default)</Code>
      </FormLabel>
      <Select
        isMulti
        name="colors"
        placeholder="Select some colors..."
        closeMenuOnSelect={false}
        defaultValue={data}
        variant="filled"
      />
    </FormControl>
  )
}
