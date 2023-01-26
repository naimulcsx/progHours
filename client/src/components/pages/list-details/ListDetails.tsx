import axios from "axios"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import ListDetailsTemplate from "~/components/templates/list-details/ListDetails"

export default function ListDetailsPage() {
  const { listId } = useParams()
  const listQuery = useQuery(`lists/${listId}`, () =>
    axios.get(`/api/lists/${listId}`).then((res) => res.data)
  )
  return <ListDetailsTemplate list={listQuery?.data?.list} isLoading={false} />
}
