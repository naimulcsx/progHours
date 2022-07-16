import { Button, Box, Flex, Spacer, Text, Grid } from "@chakra-ui/react"
import {
  CCIcon,
  CFIcon,
  EditIcon,
  LightOJIcon,
  OpenLinkIcon,
  TophIcon,
  TrashIcon,
} from "../Icons"
import { getAllHandles } from "@/api/handle"
import { useQuery } from "react-query"
import { useState } from "react"
import HandleForm from "./HandleForm"

const HandleSettings = () => {
  const [handles, setHandles] = useState([])
  /**
   * find handle
   */
  useQuery("handles", getAllHandles, {
    onSuccess: (data) => {
      setHandles(data?.handles)
    },
  })
  return (
    <Box>
      <Flex>
        <Box>
          <Text fontSize={"sm"} fontWeight={"semibold"}>
            Save your Online Judge Handles
          </Text>
        </Box>
        <Spacer />
        <Box>
          <HandleForm />
        </Box>
      </Flex>
      <Box maxW={"xl"} mt={"5"}>
        {/* <Grid templateColumns="repeat(2, 1fr)" gap={5}>
          {handles.map((item) => {
            console.log(item)
            const iconMap = {
              Codeforces: <CFIcon />,
              CodeChef: <CCIcon />,
              Toph: <TophIcon />,
              LightOJ: <LightOJIcon />,
            }
            return (
              <HandleOJBox
                icon={iconMap[item.judge_id.name]}
                handle={item.handle}
                judge_id={item.judge_id}
              />
            )
          })}
        </Grid> */}
      </Box>
    </Box>
  )
}

export default HandleSettings

const HandleOJBox = ({ icon, handle, judge_id }) => {
  /**
   * Get user online judge profile
   */
  const getProfileURL = (oj: string, handle: string) => {
    switch (oj) {
      case "Codeforces":
        return `https://codeforces.com/profile/${handle}`
      case "Toph":
        return `https://toph.co/u/${handle}`
      case "LightOJ":
        return `https://lightoj.com/user/${handle}`
      case "CodeChef":
        return `https://www.codechef.com/users/${handle}`
      default:
        return ""
    }
  }
  return (
    <Flex
      alignItems={"start"}
      gap={"10px"}
      border="1px"
      borderColor={"gray.200"}
      borderRadius="12px"
      p={4}
    >
      <Box
        h={14}
        w={14}
        p={2}
        rounded={"full"}
        border={"1px"}
        borderColor="gray.200"
        display={"flex"}
        justifyContent="center"
        alignItems={"center"}
      >
        {icon}
      </Box>

      <Flex flexDirection={"column"} flex={1}>
        <Flex alignItems={"center"} justifyContent="space-between">
          <Box>
            <Text
              fontSize={"lg"}
              fontWeight={"semibold"}
              color={"blackAlpha.800"}
            >
              {judge_id.name}
            </Text>
            <Text fontSize={"sm"} color={"gray.400"}>
              {handle}
            </Text>
          </Box>
          <a href={getProfileURL(judge_id.name, handle)} target="_blank">
            <Button
              variant={"outline"}
              border={"none"}
              bgColor="transparent"
              color={"blue.500"}
              p={0}
            >
              <OpenLinkIcon size={18} />
            </Button>
          </a>
        </Flex>
        <Flex alignItems={"center"} justifyContent="flex-end">
          <Button
            variant={"outline"}
            border={"none"}
            bgColor="transparent"
            color={"green.700"}
            p={0}
          >
            <EditIcon width={19} height={19} />
          </Button>

          <Button
            variant={"outline"}
            border={"none"}
            bgColor="transparent"
            color={"red.400"}
            p={0}
          >
            <TrashIcon width={19} height={19} />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
