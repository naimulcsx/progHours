import { Button, Box, Flex, Spacer, Text, Grid } from "@chakra-ui/react"
import {
  CCIcon,
  CFIcon,
  EditIcon,
  LightOJIcon,
  OpenLinkIcon,
  TophIcon,
  TrashIcon,
} from "../../Icons"
import { getAllHandles } from "@/api/handle"
import { useQuery } from "react-query"
import { useState } from "react"
import HandleForm from "./HandleForm"
import DeleteHandle from "./DeleteHandle"
import EditHandle from "./EditHandle"

const HandleSettings = () => {
  const [handles, setHandles] = useState([])

  /**
   * find handle
   */
  useQuery("handles", getAllHandles, {
    onSuccess: (data) => {
      setHandles(data?.body.handles)
    },
  })
  return (
    <Flex justifyContent={"space-between"} columnGap={20}>
      <Box flex={"1"}>
        <Grid templateColumns="repeat(4, 1fr)" gap={5}>
          {handles.map((item: any) => {
            const iconMap: any = {
              Codeforces: <CFIcon />,
              CodeChef: <CCIcon />,
              Toph: <TophIcon />,
              LightOJ: <LightOJIcon />,
            }
            return (
              <HandleOJBox
                key={item.id}
                icon={iconMap[item.onlineJudge.name]}
                handle={item.handle}
                onlineJudge={item.onlineJudge}
              />
            )
          })}
        </Grid>
      </Box>

      <HandleForm />
    </Flex>
  )
}

export default HandleSettings

const HandleOJBox = ({ icon, handle, onlineJudge }: any) => {
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
              {onlineJudge.name}
            </Text>
            <Text fontSize={"sm"} color={"gray.400"}>
              {handle}
            </Text>
          </Box>
          <a href={getProfileURL(onlineJudge.name, handle)} target="_blank">
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
          <EditHandle handle={handle} onlineJudge={onlineJudge} />
          <DeleteHandle title={onlineJudge.name} id={onlineJudge.id} />
        </Flex>
      </Flex>
    </Flex>
  )
}
