import ParsersStatusTemplate from "~/components/templates/parsers-status/ParsersStatus"
import { testCases } from "./testCases"

export default function ParsersStatusPage() {
  return <ParsersStatusTemplate testCases={testCases} />
}
