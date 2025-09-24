import type { SVGProps } from 'react';

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>SwapQuest Logo</title>
      <path d="M10.5 8.5C10.5 7.67157 11.1716 7 12 7C12.8284 7 13.5 7.67157 13.5 8.5V12.5C13.5 13.3284 12.8284 14 12 14C11.1716 14 10.5 13.3284 10.5 12.5V8.5Z" />
      <path d="M12 14L14 16" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  ),
};
