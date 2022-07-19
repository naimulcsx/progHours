import { createSubmission } from "@/api/submissions"
import { Dialog, Transition } from "@headlessui/react"
import { InformationCircleIcon } from "@heroicons/react/outline"
import { CheckIcon } from "@heroicons/react/solid"
import { Fragment, useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { AxiosError } from "axios"
import moment from "moment"
import PopupBuilder from "@/components/PopupBuilder"
import {
  Box,
  Button,
  HStack,
  ModalBody,
  ModalFooter,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  VStack,
} from "@chakra-ui/react"

export default function ImportCsvModal({
  isOpen,
  setIsOpen,
  items = [],
}: {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  items: any[]
}) {
  const queryClient = useQueryClient()

  /**
   * Status is an object that holds the state of the mutation of each items
   * The key is the link, and the value is an object which contains the current status of the item
   * Current status can be either - loading, success, error
   */
  interface Status {
    [link: string]: {
      status: "loading" | "success" | "error"
      error?: any
    }
  }
  const [status, setStatus] = useState<Status>({})
  const [successCount, setSuccessCount] = useState(0)

  const { mutateAsync } = useMutation(createSubmission, {
    onError(err: AxiosError) {
      const { link } = JSON.parse(err.config.data)
      /**
       * Set the status of the particular link to be 'error'
       */
      setStatus((prev) => ({
        ...prev,
        [link]: {
          status: "error",
          error: err.response?.data.message,
        },
      }))
    },

    onSuccess(data, values) {
      const link = values.link
      /**
       * Set the status of the particular link to be 'success'
       */
      setStatus((prev) => ({
        ...prev,
        [link]: {
          status: "success",
        },
      }))
      setSuccessCount((prev) => prev + 1)
    },
  })

  /**
   * States that tracks the status of the import process
   */
  const [importStarted, setImportStarted] = useState(false)
  const [importFinished, setImportFinished] = useState(false)

  /**
   * Main handler function that goes through all the items and creates the submission one by one
   */
  const handleImportRequest = async () => {
    /**
     * Import has started
     */
    setImportStarted(true)

    /**
     * For each item, set the status of the particular link to be 'loading'
     */
    for (let item of items) {
      let [link] = item
      setStatus((prev) => ({
        ...prev,
        [link]: {
          status: "loading",
        },
      }))
    }

    /**
     * For each item, try to create submission with the data we have from .csv
     */
    for (let item of items) {
      let [
        link,
        solvedDuringContest,
        verdict,
        solveTime,
        date,
        submissionLink,
        comment,
      ] = item

      /**
       * Formatting date
       * Supports dd/mm/yyyy or dd.mm.yyyy
       */
      date = date.split("/").length === 3 ? date.split("/") : date.split(".")
      let [day, month, year] = date
      if (year?.length < 4) year = "20" + year
      date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))

      const currentDate = new Date()
      date = moment(date)
        .set("hour", currentDate.getHours())
        .set("minute", currentDate.getMinutes())
        .set("second", currentDate.getSeconds())
        .set("millisecond", currentDate.getMilliseconds())
        .toDate()

      /** Uppercase verdict */
      verdict = verdict.toUpperCase()

      /**
       * Make the POST request to the server
       */
      try {
        await mutateAsync({
          link,
          verdict,
          solveTime: parseInt(solveTime),
          solvedAt: date,
        })
      } catch (err) {}
    }

    /**
     * Everything is done, so let's update the importFinished state
     */
    setImportFinished(true)

    /**
     * Wait 250ms before invalidating previous data, that will update the submissions
     */
    await new Promise((resolve) => setTimeout(resolve, 250))
    queryClient.invalidateQueries("submissions")
  }

  return (
    <PopupBuilder
      title={`Import Submissions (${successCount} / ${items.length})`}
      description="Please wait until we process your .csv file. Don't close the browser window."
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      size="3xl"
    >
      <ModalBody>
        <Box maxH="96" overflowX="hidden">
          <Table fontSize="sm">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Link</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {items.map((item, i) => {
                const [
                  link,
                  solvedDuringContest,
                  verdict,
                  solve_time,
                  date,
                  submissionLink,
                  comment,
                ]: Array<string> = item

                const isSuccess =
                  importStarted && status[link].status === "success"
                const isLoading =
                  importStarted && status[link].status === "loading"
                const isError = importStarted && status[link].status === "error"
                const isSubmissionExistsError =
                  isError && status[link].error === "Submission already exists!"

                return (
                  <Tr key={`${link}-${i}}`}>
                    <Td maxW={16} w={16}>
                      <Text w={16}>{i + 1}</Text>
                    </Td>
                    <Td
                      w="500px"
                      maxW="500px"
                      className={`${isSuccess ? "text-green-500" : ""} ${
                        isError
                          ? isSubmissionExistsError
                            ? "text-blue-500"
                            : "text-red-500"
                          : ""
                      }`}
                    >
                      {link}
                    </Td>
                    <Td>
                      {isSuccess && (
                        <CheckIcon className="w-5 h-5 p-1 text-white bg-green-500 rounded-full shrink-0 grow-0" />
                      )}
                      {isLoading && <Spinner size="sm" />}
                      {isError && (
                        <Tooltip label={status[link].error}>
                          <div className="shrink-0 grow-0">
                            <InformationCircleIcon className="w-5 h-5 text-red-500 rounded-full" />
                          </div>
                        </Tooltip>
                      )}
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </Box>
      </ModalBody>
      <ModalFooter>
        <HStack>
          {!importFinished && (
            <Button
              colorScheme="blue"
              onClick={handleImportRequest}
              disabled={importStarted && !importFinished}
            >
              {importStarted && !importFinished && (
                <Text display="flex" alignItems="center" gap={2}>
                  <Spinner size="sm" />
                  <span>Importing</span>
                </Text>
              )}
              {!importStarted && <span>Start import</span>}
            </Button>
          )}
          <Button
            colorScheme="gray"
            onClick={() => {
              setIsOpen(false)
              setStatus({})
              setImportStarted(false)
              setImportFinished(false)
            }}
          >
            Close
          </Button>
        </HStack>
      </ModalFooter>
    </PopupBuilder>
  )
}
