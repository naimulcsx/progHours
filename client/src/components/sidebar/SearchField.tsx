// import { SearchIcon } from "@chakra-ui/icons"
import { SearchIcon } from "@heroicons/react/solid"
import {
  InputGroup,
  InputLeftElement,
  Input,
  useColorModeValue as mode,
  InputGroupProps,
} from "@chakra-ui/react"
import * as React from "react"

export const SearchField = (props: InputGroupProps) => {
  return (
    <InputGroup {...props}>
      <InputLeftElement pointerEvents="none">
        <SearchIcon />
      </InputLeftElement>
      <Input
        placeholder="Search"
        background={mode("gray.50", "gray.700")}
        focusBorderColor={mode("teal.500", "teal.300")}
        _placeholder={{ color: mode("black", "white") }}
      />
    </InputGroup>
  )
}
