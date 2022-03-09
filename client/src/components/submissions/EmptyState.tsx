import { PlusIcon } from "@heroicons/react/outline"
import { Link } from "react-router-dom"

const EmptyState = () => {
  return (
    <div className="relative block w-full p-8 bg-white text-center border-2 border-gray-300 border-dashed rounded">
      <svg
        className="w-10 h-10 mx-auto text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        />
      </svg>
      <h3 className="mt-1 text-2xl font-medium text-gray-900">
        No submissions
      </h3>
      <p className="mt-1 text-gray-500">
        Get started by creating a new submission.
      </p>
    </div>
  )
}

export default EmptyState
