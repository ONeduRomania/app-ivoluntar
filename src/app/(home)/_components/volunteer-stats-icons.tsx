import type { SVGProps } from "react";

type SVGPropsType = SVGProps<SVGSVGElement>;

export function ClockIcon(props: SVGPropsType) {
  return (
    <svg
      width={28}
      height={28}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"
        fill="currentColor"
      />
    </svg>
  );
}

export function CalendarIcon(props: SVGPropsType) {
  return (
    <svg
      width={28}
      height={28}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ChartIcon(props: SVGPropsType) {
  return (
    <svg
      width={28}
      height={28}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 3v18h18v-2H5V3H3zm16 4h-2v10h2V7zm-4-2h-2v12h2V5zm-4 4h-2v8h2V9zm-4 2h-2v6h2v-6z"
        fill="currentColor"
      />
    </svg>
  );
}

export function OrganizationIcon(props: SVGPropsType) {
  return (
    <svg
      width={28}
      height={28}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.375 2.25C2.75368 2.25 2.25 2.75368 2.25 3.375V14.625C2.25 15.2463 2.75368 15.75 3.375 15.75H6.75V12.375C6.75 11.7537 7.25368 11.25 7.875 11.25H10.125C10.7463 11.25 11.25 11.7537 11.25 12.375V15.75H14.625C15.2463 15.75 15.75 15.2463 15.75 14.625V3.375C15.75 2.75368 15.2463 2.25 14.625 2.25H3.375ZM3.75 3.75V14.25H6V12.375C6 11.582 6.58204 11 7.375 11H10.625C11.418 11 12 11.582 12 12.375V14.25H14.25V3.75H3.75Z"
        fill="currentColor"
      />
      <path d="M5.25 5.25H6.75V6.75H5.25V5.25Z" fill="currentColor" />
      <path d="M5.25 8.25H6.75V9.75H5.25V8.25Z" fill="currentColor" />
      <path d="M8.25 5.25H9.75V6.75H8.25V5.25Z" fill="currentColor" />
      <path d="M8.25 8.25H9.75V9.75H8.25V8.25Z" fill="currentColor" />
      <path d="M11.25 5.25H12.75V6.75H11.25V5.25Z" fill="currentColor" />
      <path d="M11.25 8.25H12.75V9.75H11.25V8.25Z" fill="currentColor" />
    </svg>
  );
}

