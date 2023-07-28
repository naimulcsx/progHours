import { SVGProps } from "react";

export function IconSearch(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <g>
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-3.5-3.5m2.5-6a8.5 8.5 0 11-17 0 8.5 8.5 0 0117 0z"
        ></path>
      </g>
    </svg>
  );
}
