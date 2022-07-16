import { Button, Box, Flex, Grid } from "@chakra-ui/react"
import { CCIcon, CFIcon, LightOJIcon, PlusIcon, TophIcon } from "../../Icons"
import { getAllHandles } from "@/api/handle"
import { useQuery } from "react-query"
import { useState } from "react"
import HandleForm from "./HandleForm"
import PopupBuilder from "@/components/PopupBuilder"
import HandleOJBox from "./HandleOJBox"

const HandleSettings = () => {
  const [handles, setHandles] = useState([])
  const [isOpen, setIsOpen] = useState(false)

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

      <Flex justifyContent={"flex-end"}>
        <Button
          size="sm"
          onClick={() => setIsOpen(true)}
          leftIcon={<PlusIcon height={24} width={24} />}
        >
          Add Handle
        </Button>
      </Flex>
      <PopupBuilder
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Add a new handle"
      >
        <HandleForm setIsOpen={setIsOpen} isCreate={true} />
      </PopupBuilder>
    </Flex>
  )
}

export default HandleSettings
