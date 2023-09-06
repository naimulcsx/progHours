import { SVGProps } from "react";

export function CFIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="100%"
      height="100%"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      {...props}
    >
      <path
        d="M56.3 74.7H35c-5 0-9 4.1-9 9v64.7c0 5 4.1 9 9 9h21.3c5 0 9-4.1 9-9V83.7c.1-5-4-9-9-9Z"
        fill="url(#a)"
      />
      <path
        d="M110.6 42H89.3c-5 0-9 4.1-9 9v97.4c0 5 4.1 9 9 9h21.3c5 0 9-4.1 9-9V51c0-4.9-4-9-9-9Z"
        fill="url(#b)"
      />
      <path
        d="M164.7 87.1h-21.3c-5 0-9 4.1-9 9v52.3c0 5 4.1 9 9 9h21.3c5 0 9-4.1 9-9V96.1c0-5-4-9-9-9Z"
        fill="url(#c)"
      />
      <defs>
        <linearGradient
          id="a"
          x1={26}
          y1={116.083}
          x2={65.376}
          y2={116.083}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F6C43D" />
          <stop offset={1} stopColor="#FCD975" />
        </linearGradient>
        <linearGradient
          id="b"
          x1={80.253}
          y1={99.746}
          x2={119.628}
          y2={99.746}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1480C4" />
          <stop offset={1} stopColor="#1C99D4" />
        </linearGradient>
        <linearGradient
          id="c"
          x1={134.368}
          y1={122.283}
          x2={173.744}
          y2={122.283}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B11E26" />
          <stop offset={1} stopColor="#C21C24" />
        </linearGradient>
      </defs>
    </svg>
  );
}
