import { createSubmission } from "@/api/submissions"
import Spinner from "@/components/Spinner"
import { Dialog, Transition } from "@headlessui/react"
import { InformationCircleIcon } from "@heroicons/react/outline"
import { CheckIcon } from "@heroicons/react/solid"
import { Fragment, useEffect, useState } from "react"
import { IoTerminal } from "react-icons/io5"
import { useMutation, useQueryClient } from "react-query"

export default function ImportCsvModal({
  isOpen,
  setIsOpen,
  files = [],
}: {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  files: any[]
}) {
  const queryClient = useQueryClient()

  function closeModal() {
    setIsOpen(false)
  }

  const [status, setStatus] = useState({})
  const [successCount, setSuccessCount] = useState(0)

  const { mutateAsync } = useMutation(createSubmission, {
    onError(err) {
      const { link } = JSON.parse(err.config.data)
      setStatus((prev) => ({
        ...prev,
        [link]: {
          status: "error",
          error: err?.response?.data?.message,
        },
      }))
    },
    onSuccess(data, values) {
      const link = values.link
      setStatus((prev) => ({
        ...prev,
        [link]: {
          status: "success",
        },
      }))
      setSuccessCount((prev) => prev + 1)
    },
    // onMutate(values) {
    //   const link = values.link
    //   setStatus({
    //     ...status,
    //     [link]: {
    //       status: "loading",
    //     },
    //   })
    // },
  })

  interface Done {
    [key: string]: string
  }

  const [importStarted, setImportStarted] = useState(false)
  const [importFinished, setImportFinished] = useState(false)

  const handleImportRequest = async () => {
    setImportStarted(true)

    for (let item of files) {
      let [link] = item
      setStatus((prev) => ({
        ...prev,
        [link]: {
          status: "loading",
        },
      }))
    }

    for (let item of files) {
      let [
        link,
        solvedDuringContest,
        verdict,
        solve_time,
        date,
        submissionLink,
        comment,
      ] = item

      date = date.split("/").length === 3 ? date.split("/") : date.split(".")
      const [day, month, year] = date
      date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))

      // await new Promise((resolve) => setTimeout(resolve, 500))
      try {
        await mutateAsync({
          link,
          verdict,
          solve_time: parseInt(solve_time),
          solved_at: date,
        })
      } catch (err) {}
    }
    setImportFinished(true)

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
                  Import Submissions ({successCount}/{files.length})
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Please wait until we process your .csv file. Don't close the
                    browser window.
                  </p>
                  <p></p>
                </div>

                <div className="mt-6 space-y-3 h-64 bg-primary bg-opacity-5 rounded px-4 py-2 overflow-x-hidden shadow">
                  {files.map((item, i) => {
                    const [
                      link,
                      solvedDuringContest,
                      verdict,
                      solve_time,
                      date,
                      submissionLink,
                      comment,
                    ] = item

                    const isSuccess =
                      importStarted && status[link]?.status === "success"
                    const isLoading =
                      importStarted && status[link]?.status === "loading"
                    const isError =
                      importStarted && status[link]?.status === "error"

                    return (
                      <div
                        className="flex justify-between items-center text-gray-500 h-8 text-sm"
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
                          <div title={status[link]?.error}>
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
                      closeModal()
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
