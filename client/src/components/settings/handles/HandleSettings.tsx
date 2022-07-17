import { Button, Box, Flex, Grid } from "@chakra-ui/react"
import { CCIcon, CFIcon, LightOJIcon, TophIcon } from "../../Icons"
import { getAllHandles } from "@/api/handle"
import { useQuery } from "react-query"
import { useState } from "react"
import HandleForm from "./HandleForm"
import PopupBuilder from "@/components/PopupBuilder"
import HandleOJBox from "./HandleOJBox"
import { PlusIcon, PlusSmIcon } from "@heroicons/react/outline"

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
    <Box>
      <Flex justifyContent={"flex-end"} mb={4}>
        <Button
          size="sm"
          onClick={() => setIsOpen(true)}
          leftIcon={<PlusSmIcon height={24} width={24} />}
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
      <Box flex={"1"}>
        <Grid
          gridTemplateColumns={[
            "repeat(1, 1fr)",
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
            "repeat(4, 1fr)",
            "repeat(4, 1fr)",
          ]}
          gap={4}
        >
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
    </Box>
  )
}

export default HandleSettings
