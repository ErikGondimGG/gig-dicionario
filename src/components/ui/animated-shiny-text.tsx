import { ComponentPropsWithoutRef, CSSProperties, FC } from "react"

import { cn } from "@/lib/utils"

export interface AnimatedShinyTextProps
  extends ComponentPropsWithoutRef<"span"> {
  shimmerWidth?: number
}

export const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className,
  shimmerWidth = 100,
  ...props
}) => {
  return (
    <span
      style={
        {
          "--shiny-width": `${shimmerWidth}px`,
        } as CSSProperties
      }
      className={cn(
        "tw-mx-auto tw-max-w-md tw-text-neutral-600/70 dark:tw-text-neutral-400/70",

        // Shine effect
        "tw-animate-shiny-text [background-size:tw-var(--shiny-width)_100%] tw-bg-clip-text [background-position:tw-0_0] tw-bg-no-repeat [transition:tw-background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]",

        // Shine gradient
        "tw-bg-gradient-to-r tw-from-transparent tw-via-black/80 tw-via-50% tw-to-transparent dark:tw-via-white/80",

        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
