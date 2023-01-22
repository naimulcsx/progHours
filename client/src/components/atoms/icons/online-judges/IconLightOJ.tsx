import { SVGProps } from "react"

export default function LOJIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <g clipPath="url(#clip0_908_2241)">
        <path fill="#814FFD" d="M0 0H24V24H0z"></path>
        <path
          fill="#fff"
          d="M0 12v12h24V0H0v12zm11.2-1.463l.05 5.588H19V18.938H6.5V4.855l2.325.056 2.3.057.075 5.568z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_908_2241">
          <path fill="#fff" d="M0 0H24V24H0z"></path>
        </clipPath>
      </defs>
    </svg>
  )
}
