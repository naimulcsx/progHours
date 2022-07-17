import { getAllUserStudy } from "@/api/userStudies"
import { DashboardLayout } from "@/components/layouts/Dashboard"
import PopupBuilder from "@/components/PopupBuilder"
import StudyCard from "@/components/study/StudyCard"
import StudyForm from "@/components/study/StudyForm"
import { Button, Grid, GridItem } from "@chakra-ui/react"
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
    <DashboardLayout title="Study List">
      <Helmet>
        <title>Study List</title>
      </Helmet>
      {/* add new resource button  */}
      <div className="flex justify-end">
        <Button
          size="sm"
          onClick={() => setIsOpen(true)}
          type="button"
          leftIcon={<PlusSmIcon height={24} width={24} />}
        >
          Add New
        </Button>
      </div>

      {/* study form popup  */}
      <PopupBuilder
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Add a new resource on your study list"
      >
        <StudyForm setIsOpen={setIsOpen} isCreate={true} />
      </PopupBuilder>

      <Grid gridTemplateColumns={"repeat(4, 1fr)"} gap={"5"}>
        {userStudies.map((item: any) => (
          <GridItem key={item.id}>
            <StudyCard {...item} />
          </GridItem>
        ))}
      </Grid>
    </DashboardLayout>
  )
}

export default StudyPage
