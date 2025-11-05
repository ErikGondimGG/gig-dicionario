import { motion, MotionProps, useScroll } from "motion/react"

import { cn } from "@/lib/utils"

interface ScrollProgressProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {
  ref?: React.Ref<HTMLDivElement>
}

export function ScrollProgress({
  className,
  ref,
  ...props
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      ref={ref}
      className={cn(
        "tw-fixed tw-inset-x-0 tw-top-0 tw-z-50 tw-h-px tw-origin-left tw-bg-gradient-to-r tw-from-[#A97CF8] tw-via-[#F38CB8] tw-to-[#FDCC92]",
        className
      )}
      style={{
        scaleX: scrollYProgress,
      }}
      {...props}
    />
  )
}
