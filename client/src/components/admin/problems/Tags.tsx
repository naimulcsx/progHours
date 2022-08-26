import { FormControl, FormLabel } from "@chakra-ui/react"
import { Select } from "chakra-react-select"
export default function Tags({ tags }) {
  const options = [
    {
      label: "Apple",
      value: "apple",
    },
    {
      label: "Mango",
      value: "mango",
    },
    {
      label: "Banana",
      value: "banana",
    },
    {
      label: "Pineapple",
      value: "pineapple",
    },
  ]
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
        defaultValue={tags.length === 0 ? undefined : options}
      />
    </FormControl>
  )
}
// defaultValue={tags ? tags : tags}
//{...(tags ? { defaultValue: tags } : null)}
