import { FormControl, FormLabel } from "@chakra-ui/react"
import { Select } from "chakra-react-select"
export default function Tags({ tags }) {
    console.log(tags)
  return (
    <FormControl>
      <FormLabel>Tags</FormLabel>
      <Select
        isMulti
        id="color-select"
        name="colors"
        placeholder="Select some colors..."
        closeMenuOnSelect={true}
        size="md"
        defaultInputValue={tags}
      />
    </FormControl>
  )
}
// defaultValue={tags ? tags : tags}
//{...(tags ? { defaultValue: tags } : null)}
