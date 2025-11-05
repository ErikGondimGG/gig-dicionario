import React from "react"
import { motion, type MotionProps } from "motion/react"

import { cn } from "@/lib/utils"

const animationProps: MotionProps = {
  initial: { "--x": "100%", scale: 0.8 },
  animate: { "--x": "-100%", scale: 1 },
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 1,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
}

interface ShinyButtonProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps>,
    MotionProps {
  children: React.ReactNode
  className?: string
}

export const ShinyButton = React.forwardRef<
  HTMLButtonElement,
  ShinyButtonProps
>(({ children, className, ...props }, ref) => {
  return (
    <motion.button
      ref={ref}
      className={cn(
        "tw-relative tw-cursor-pointer tw-rounded-lg tw-border tw-border-neutral-200 tw-px-6 tw-py-2 tw-font-medium tw-backdrop-blur-xl tw-transition-shadow tw-duration-300 tw-ease-in-out hover:tw-shadow dark:tw-bg-[radial-gradient(circle_at_50%_0%,var(--primary)/10%_0%,transparent_60%)] dark:hover:tw-shadow-[0_0_20px_var(--primary)/10%] dark:tw-border-neutral-800",
        className
      )}
      {...animationProps}
      {...props}
    >
      <span
        className="tw-relative tw-block tw-size-full tw-text-sm tw-tracking-wide tw-text-[rgb(0,0,0,65%)] tw-uppercase dark:tw-font-light dark:tw-text-[rgb(255,255,255,90%)]"
        style={{
          maskImage:
            "linear-gradient(-75deg,var(--primary) calc(var(--x) + 20%),transparent 30%),var(--primary) 100%))",
        }}
      >
        {children}
      </span>
      <span
        style={{
          mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude,linear-gradient(rgb(0,0,0),",
          WebkitMask:
            "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude,linear-gradient(rgb(0,0,0),",
          backgroundImage:
            "linear-gradient(-75deg,var(--primary)/10% calc(var(--x)+20%),var(--primary)/50% calc(var(--x)+25%),var(--primary)/10% calc(var(--x)+100%))",
        }}
        className="tw-absolute tw-inset-0 tw-z-10 tw-block tw-rounded-[inherit] tw-p-px"
      />
    </motion.button>
  )
})

ShinyButton.displayName = "ShinyButton"
