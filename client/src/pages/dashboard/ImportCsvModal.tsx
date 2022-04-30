import { createSubmission } from "@/api/submissions"
import { Dialog, Transition } from "@headlessui/react"
import { InformationCircleIcon } from "@heroicons/react/outline"
import { CheckIcon } from "@heroicons/react/solid"
import { Fragment, useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { AxiosError } from "axios"
import Spinner from "@/components/Spinner"
import moment from "moment"

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
      const [day, month, year] = date
      date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))

      const currentDate = new Date()
      date = moment(date)
        .set("hour", currentDate.getHours())
        .set("minute", currentDate.getMinutes())
        .set("second", currentDate.getSeconds())
        .set("millisecond", currentDate.getMilliseconds())
        .toDate()

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
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => {}}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-60" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-3xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Import Submissions ({successCount} / {items.length})
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Please wait until we process your .csv file. Don't close the
                    browser window.
                  </p>
                  <p></p>
                </div>

                <div className="mt-6 space-y-3 h-64 bg-light rounded-lg px-5 py-3 overflow-x-hidden">
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
                    const isError =
                      importStarted && status[link].status === "error"

                    return (
                      <div
                        className="flex justify-between items-center text-gray-500 h-7 text-sm"
                        key={`${link}-${i}}`}
                      >
                        <p
                          className={`${isSuccess ? "text-green-500" : ""} ${
                            isError ? "text-red-500" : ""
                          }`}
                        >
                          {link}
                        </p>
                        {isSuccess && (
                          <CheckIcon className="w-5 h-5 text-white rounded-full p-1 bg-green-500" />
                        )}
                        {isLoading && (
                          <p>
                            <Spinner show={true} />
                          </p>
                        )}
                        {isError && (
                          <div title={status[link].error}>
                            <InformationCircleIcon className="w-6 h-6 text-red-500 rounded-full" />
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
                      className="inline-flex justify-center px-4 h-10 items-center text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:bg-gray-100"
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
                    className="inline-flex justify-center px-4 h-10 items-center text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
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
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
