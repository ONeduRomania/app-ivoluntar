import type { SVGProps } from "react";

type SVGPropsType = SVGProps<SVGSVGElement>;

export function PlayIcon(props: SVGPropsType) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M8 5v14l11-7z"
        fill="currentColor"
      />
    </svg>
  );
}

export function PauseIcon(props: SVGPropsType) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"
        fill="currentColor"
      />
    </svg>
  );
}

export function XIcon(props: SVGPropsType) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
        fill="currentColor"
      />
    </svg>
  );
}

