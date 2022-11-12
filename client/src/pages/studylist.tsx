import { getAllUserStudy } from "~/api/userStudies"
import { DashboardLayout } from "~/components/layouts/Dashboard"
import PopupBuilder from "~/components/PopupBuilder"
import StudyCard from "~/components/study/StudyCard"
import StudyForm from "~/components/study/StudyForm"
import { PlusSmIcon } from "@heroicons/react/outline"
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { useQuery } from "react-query"
import { Box, Button, Grid, Group, Text, Title } from "@mantine/core"

const StudyPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [userStudies, setUserStudies] = useState([])

  useQuery("studies", getAllUserStudy, {
    onSuccess(data: any) {
      setUserStudies(data?.body.studies)
    },
  })

  return (
    <DashboardLayout>
      {/* @ts-ignore */}
      <Helmet>
        <title>Study List</title>
      </Helmet>

      <Group position="apart">
        <Title order={3}>Study List</Title>
        <Button
          size="sm"
          onClick={() => setIsOpen(true)}
          type="button"
          leftIcon={<PlusSmIcon height={24} width={24} />}
        >
          Add New
        </Button>
      </Group>
      <Box mt={30}>
        {/* study form popup  */}
        <PopupBuilder
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title="Add a new resource on your study list"
        >
          <StudyForm setIsOpen={setIsOpen} isCreate={true} />
        </PopupBuilder>

        <Grid>
          {userStudies.length === 0 ? (
            <Text size="sm">Set your study goals</Text>
          ) : (
            userStudies.map((item: any) => (
              <Grid.Col key={item.id} md={6} lg={3}>
                <StudyCard {...item} />
              </Grid.Col>
            ))
          )}
        </Grid>
      </Box>
    </DashboardLayout>
  )
}

export default StudyPage
