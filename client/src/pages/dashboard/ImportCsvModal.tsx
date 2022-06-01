import { createSubmission } from "@/api/submissions"
import { Dialog, Transition } from "@headlessui/react"
import { InformationCircleIcon } from "@heroicons/react/outline"
import { CheckIcon } from "@heroicons/react/solid"
import { Fragment, useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { AxiosError } from "axios"
import Spinner from "@/components/Spinner"
import moment from "moment"
import PopupBuilder from "@/components/PopupBuilder"

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
        solve_time,
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
          solve_time: parseInt(solve_time),
          solved_at: date,
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
    queryClient.invalidateQueries("practice")
  }

  return (
    <PopupBuilder
      title={`Import Submissions (${successCount} / ${items.length})`}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      className="max-w-2xl"
    >
      <p className="text-sm text-gray-500">
        Please wait until we process your .csv file. Don't close the browser
        window.
      </p>

      <div className="w-full h-64 max-w-2xl py-3 mt-4 overflow-x-hidden">
        <div className="flex px-5 py-2 space-x-12 text-sm uppercase bg-gray-100 border-t border-b">
          <p>ID</p>
          <p>Link</p>
        </div>
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

          const isSuccess = importStarted && status[link].status === "success"
          const isLoading = importStarted && status[link].status === "loading"
          const isError = importStarted && status[link].status === "error"

          return (
            <div
              className="flex items-center justify-between px-6 py-2 text-sm text-gray-500 border-b"
              key={`${link}-${i}}`}
            >
              <div className="flex space-x-12">
                <p>{i + 1}</p>
                <p
                  className={`${isSuccess ? "text-green-500" : ""} ${
                    isError ? "text-red-500" : ""
                  }`}
                >
                  {link}
                </p>
              </div>
              {isSuccess && (
                <CheckIcon className="w-5 h-5 p-1 text-white bg-green-500 rounded-full shrink-0 grow-0" />
              )}
              {isLoading && (
                <p>
                  <Spinner />
                </p>
              )}
              {isError && (
                <div title={status[link].error} className="shrink-0 grow-0">
                  <InformationCircleIcon className="w-5 h-5 text-red-500 rounded-full" />
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="flex mt-8 space-x-4">
        {!importFinished && (
          <button
            type="button"
            className="inline-flex items-center justify-center h-10 px-4 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:bg-gray-100"
            onClick={handleImportRequest}
            disabled={importStarted && !importFinished}
          >
            {importStarted && !importFinished && (
              <p className="flex items-center space-x-2">
                <Spinner show={true} />
                <span>Importing</span>
              </p>
            )}
            {!importStarted && <span>Start import</span>}
          </button>
        )}

        <button
          type="button"
          className="inline-flex items-center justify-center h-10 px-4 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          onClick={() => {
            setIsOpen(false)
            setStatus({})
            setImportStarted(false)
            setImportFinished(false)
          }}
        >
          Close
        </button>
      </div>
    </PopupBuilder>
  )
}
