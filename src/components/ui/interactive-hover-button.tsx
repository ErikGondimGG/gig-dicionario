import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

export function InteractiveHoverButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "tw-group tw-bg-white tw-relative tw-w-auto tw-cursor-pointer tw-overflow-hidden tw-rounded-full tw-border tw-border-neutral-200 tw-p-2 tw-px-6 tw-text-center tw-font-semibold dark:tw-bg-neutral-950 dark:tw-border-neutral-800",
        className
      )}
      {...props}
    >
      <div className="tw-flex tw-items-center tw-gap-2">
        <div className="tw-bg-neutral-900 tw-h-2 tw-w-2 tw-rounded-full tw-transition-all tw-duration-300 group-hover:tw-scale-[100.8] dark:tw-bg-neutral-50"></div>
        <span className="tw-inline-block tw-transition-all tw-duration-300 group-hover:tw-translate-x-12 group-hover:tw-opacity-0">
          {children}
        </span>
      </div>
      <div className="tw-text-neutral-50 tw-absolute tw-top-0 tw-z-10 tw-flex tw-h-full tw-w-full tw-translate-x-12 tw-items-center tw-justify-center tw-gap-2 tw-opacity-0 tw-transition-all tw-duration-300 group-hover:tw--translate-x-5 group-hover:tw-opacity-100 dark:tw-text-neutral-900">
        <span>{children}</span>
        <ArrowRight />
      </div>
    </button>
  )
}
