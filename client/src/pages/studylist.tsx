import { getAllUserStudy } from "~/api/userStudies"
import { DashboardLayout } from "~/components/layouts/Dashboard"
import PopupBuilder from "~/components/PopupBuilder"
import StudyCard from "~/components/study/StudyCard"
import StudyForm from "~/components/study/StudyForm"
import { Box, Button, Flex, Grid, GridItem } from "@chakra-ui/react"
import { PlusSmIcon } from "@heroicons/react/outline"
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { useQuery } from "react-query"

const StudyPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [userStudies, setUserStudies] = useState([])

  useQuery("studies", getAllUserStudy, {
    onSuccess(data: any) {
      setUserStudies(data?.body.studies)
    },
  })

  return (
    <DashboardLayout
      title="Study List"
      rightButton={
        <Button
          size="sm"
          onClick={() => setIsOpen(true)}
          type="button"
          leftIcon={<PlusSmIcon height={24} width={24} />}
        >
          Add New
        </Button>
      }
    >
      {/* @ts-ignore */}
      <Helmet>
        <title>Study List</title>
      </Helmet>
      <Box mb={50}>
        {/* study form popup  */}
        <PopupBuilder
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title="Add a new resource on your study list"
        >
          <StudyForm setIsOpen={setIsOpen} isCreate={true} />
        </PopupBuilder>

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
          {userStudies.map((item: any) => (
            <GridItem key={item.id}>
              <StudyCard {...item} />
            </GridItem>
          ))}
        </Grid>
      </Box>
    </DashboardLayout>
  )
}

export default StudyPage
