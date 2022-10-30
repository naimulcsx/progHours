// const HandleSettings = () => {
//   const [handles, setHandles] = useState([])
//   const [isOpen, setIsOpen] = useState(false)

//   /**
//    * find handle
//    */
//   useQuery("handles", getAllHandles, {
//     onSuccess: (data) => {
//       setHandles(data?.body.handles)
//     },
//   })
//   return (
//     <Box>
//       <Flex justifyContent="flex-end" mb={4}>
//         <Button
//           size="sm"
//           onClick={() => setIsOpen(true)}
//           leftIcon={<PlusSmIcon height={24} width={24} />}
//         >
//           Add Handle
//         </Button>
//       </Flex>
//       <PopupBuilder
//         isOpen={isOpen}
//         setIsOpen={setIsOpen}
//         title="Add a new handle"
//       >
//         <HandleForm setIsOpen={setIsOpen} isCreate={true} />
//       </PopupBuilder>
//       <Box flex={1} mx={-4}>
//         <Grid
//           gridTemplateColumns={[
//             "repeat(1, 1fr)",
//             "repeat(1, 1fr)",
//             "repeat(2, 1fr)",
//             "repeat(3, 1fr)",
//             "repeat(4, 1fr)",
//             "repeat(5, 1fr)",
//           ]}
//           gap={4}
//         >
//           {handles.map((item: any) => {
//             const iconMap: any = {
//               Codeforces: <CFIcon />,
//               CodeChef: <CCIcon />,
//               Toph: <TophIcon />,
//               LightOJ: <LightOJIcon />,
//             }
//             return (
//               <HandleOJBox
//                 key={item.id}
//                 icon={iconMap[item.onlineJudge.name]}
//                 handle={item.handle}
//                 onlineJudge={item.onlineJudge}
//               />
//             )
//           })}
//         </Grid>
//       </Box>
//     </Box>
//   )
// }

import { getAllHandles } from "@/api/handle"
import { CCIcon, CFIcon, LightOJIcon, TophIcon } from "@/components/Icons"
import PopupBuilder from "@/components/PopupBuilder"
import { PlusIcon, PlusSmIcon } from "@heroicons/react/outline"
import { Box, Button, Grid, Group } from "@mantine/core"
import { useState } from "react"
import { useQuery } from "react-query"
import HandleForm from "./HandleForm"
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
    <Box>
      <Group sx={{ justifyContent: "flex-end" }}>
        <Button
          onClick={() => setIsOpen(true)}
          leftIcon={<PlusSmIcon height={24} width={24} />}
        >
          Add Handle
        </Button>

        <PopupBuilder
          title="Add a new handle"
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        >
          <HandleForm setIsOpen={setIsOpen} isCreate={true} />
        </PopupBuilder>
      </Group>

      <Box mt={10}>
        <Grid>
          {handles.map((item: any) => {
            const iconMap: any = {
              Codeforces: <CFIcon />,
              CodeChef: <CCIcon />,
              Toph: <TophIcon />,
              LightOJ: <LightOJIcon />,
            }
            return (
              <Grid.Col md={6} lg={3} key={item.id}>
                <HandleOJBox
                  icon={iconMap[item.onlineJudge.name]}
                  handle={item.handle}
                  onlineJudge={item.onlineJudge}
                />
              </Grid.Col>
            )
          })}
        </Grid>
      </Box>
    </Box>
  )
}

export default HandleSettings
