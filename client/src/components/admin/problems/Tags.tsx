import {
  Container,
  FormControl,
  FormLabel,
  Code,
  Link,
  FormErrorMessage,
} from "@chakra-ui/react"
import { Select } from "chakra-react-select"
import { useQuery } from "react-query"
import { getAllTags } from "@/api/tags"
import { useState } from "react"
export default function Tags({ data, setSelected }) {
  let [tags, setTags] = useState([])
  useQuery("tags", getAllTags, {
    onSuccess: (res) => {
      //setTags(res.body.tags)
      let tempTags = [...res.body.tags]
      tempTags.map((value, index) => {
        console.log(value, index)
        tempTags[index] = { ...value, label: value.name, value: value.name }
      })

      setTags(() => tempTags)
      console.log(tempTags, "tags", tags)
    },
  })
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
        {...(tags.length != 0 ? { options: tags } : null)}
      />
    </FormControl>
  )
}
