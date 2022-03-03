import Layout from "@/components/dashboard/Layout"
import { GridViewIcon, ListViewIcon, PlusIcon } from "@/components/Icons"
import TrackingTable from "@/components/submissions/Table"
import { useQuery } from "react-query"
import { getSubmissions } from "@/api/submissions"
import { Link } from "react-router-dom"
import { Fragment, useEffect, useRef, useState } from "react"
import { Transition } from "@headlessui/react"

export default function TrackingSheet() {
  const query = useQuery("practice", getSubmissions, {
    staleTime: 30 * 60 * 1000,
  })

  return (
    <Layout>
      {/* tracking table header */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold">
          <div className="flex items-center space-x-4">
            <span>Tracking Sheet</span>
            <Transition
              as={Fragment}
              show={query.status === "loading"}
              enter="transform transition duration-[400ms]"
              enterFrom="opacity-0 rotate-[-120deg] scale-50"
              enterTo="opacity-100 rotate-0 scale-100"
              leave="transform duration-200 transition ease-in-out"
              leaveFrom="opacity-100 rotate-0 scale-100 "
              leaveTo="opacity-0 scale-95 "
            >
              <div className="sp sp-circle sp-circle-dark"></div>
            </Transition>
          </div>
        </h3>
        <div className="flex items-center space-x-5">
          {/* <div className="flex items-center text-primary">
            <div className="p-2 border border-r-0 border-lightGrey rounded-l-md">
              <GridViewIcon size={20} />
            </div>
            <div className="p-2 border border-lightGrey rounded-r-md">
              <ListViewIcon size={20} />
            </div>
          </div> */}
          <Link to="/submissions/new">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusIcon className="w-5 h-5 mr-2 -ml-1" aria-hidden="true" />
              New Entry
            </button>
          </Link>
        </div>
      </div>
      {/* tracking table */}

      <TrackingTable submissions={query.data?.submissions || []} />
    </Layout>
  )
}
