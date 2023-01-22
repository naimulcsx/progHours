import { SVGProps } from "react"

export default function AppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      fill="none"
      viewBox="0 0 28 28"
      {...props}
    >
      <g clipPath="url(#clip0_1532_3007)">
        <g filter="url(#filter0_i_1532_3007)">
          <path
            fill="url(#paint0_linear_1532_3007)"
            fillRule="evenodd"
            d="M11.24.602a5.04 5.04 0 014.776 0l8.631 4.65a4.942 4.942 0 012.61 4.348v8.8a4.942 4.942 0 01-2.61 4.348l-8.631 4.65a5.04 5.04 0 01-4.776 0l-8.63-4.65A4.943 4.943 0 010 18.4V9.6a4.943 4.943 0 012.61-4.348l8.63-4.65z"
            clipRule="evenodd"
          ></path>
        </g>
        <path
          fill="#FBFAFC"
          d="M13.628 19.114c2.867 0 5.191-2.302 5.191-5.141 0-2.84-2.324-5.141-5.19-5.141-2.867 0-5.191 2.301-5.191 5.141s2.323 5.141 5.19 5.141z"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_i_1532_3007"
          width="27.256"
          height="32"
          x="0"
          y="0"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset dy="8"></feOffset>
          <feGaussianBlur stdDeviation="2"></feGaussianBlur>
          <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"></feComposite>
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.05 0"></feColorMatrix>
          <feBlend in2="shape" result="effect1_innerShadow_1532_3007"></feBlend>
        </filter>
        <linearGradient
          id="paint0_linear_1532_3007"
          x1="14"
          x2="13.628"
          y1="4.237"
          y2="28"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6485E7"></stop>
          <stop offset="0.526" stopColor="#4169E1"></stop>
          <stop offset="1" stopColor="#2A5AEC"></stop>
        </linearGradient>
        <clipPath id="clip0_1532_3007">
          <path fill="#fff" d="M0 0H28V28H0z"></path>
        </clipPath>
      </defs>
    </svg>
  )
}
