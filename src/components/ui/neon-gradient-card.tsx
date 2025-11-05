import {
  CSSProperties,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react"

import { cn } from "@/lib/utils"

interface NeonColorsProps {
  firstColor: string
  secondColor: string
}

interface NeonGradientCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @default <div />
   * @type ReactElement
   * @description
   * The component to be rendered as the card
   * */
  as?: ReactElement
  /**
   * @default ""
   * @type string
   * @description
   * The className of the card
   */
  className?: string

  /**
   * @default ""
   * @type ReactNode
   * @description
   * The children of the card
   * */
  children?: ReactNode

  /**
   * @default 5
   * @type number
   * @description
   * The size of the border in pixels
   * */
  borderSize?: number

  /**
   * @default 20
   * @type number
   * @description
   * The size of the radius in pixels
   * */
  borderRadius?: number

  /**
   * @default "{ firstColor: '#ff00aa', secondColor: '#00FFF1' }"
   * @type string
   * @description
   * The colors of the neon gradient
   * */
  neonColors?: NeonColorsProps
}

export const NeonGradientCard: React.FC<NeonGradientCardProps> = ({
  className,
  children,
  borderSize = 2,
  borderRadius = 20,
  neonColors = {
    firstColor: "#ff00aa",
    secondColor: "#00FFF1",
  },
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current
        setDimensions({ width: offsetWidth, height: offsetHeight })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [])

  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current
      setDimensions({ width: offsetWidth, height: offsetHeight })
    }
  }, [children])

  return (
    <div
      ref={containerRef}
      style={
        {
          "--border-size": `${borderSize}px`,
          "--border-radius": `${borderRadius}px`,
          "--neon-first-color": neonColors.firstColor,
          "--neon-second-color": neonColors.secondColor,
          "--card-width": `${dimensions.width}px`,
          "--card-height": `${dimensions.height}px`,
          "--card-content-radius": `${borderRadius - borderSize}px`,
          "--pseudo-element-background-image": `linear-gradient(0deg, ${neonColors.firstColor}, ${neonColors.secondColor})`,
          "--pseudo-element-width": `${dimensions.width + borderSize * 2}px`,
          "--pseudo-element-height": `${dimensions.height + borderSize * 2}px`,
          "--after-blur": `${dimensions.width / 3}px`,
        } as CSSProperties
      }
      className={cn(
        "tw-relative tw-z-10 tw-size-full tw-rounded-[var(--border-radius)]",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "tw-relative tw-size-full tw-min-h-[inherit] tw-rounded-[var(--card-content-radius)] tw-bg-gray-100 tw-p-6",
          "before:tw-absolute before:tw--top-[var(--border-size)] before:tw--left-[var(--border-size)] before:tw--z-10 before:tw-block",
          "before:tw-h-[var(--pseudo-element-height)] before:tw-w-[var(--pseudo-element-width)] before:tw-rounded-[var(--border-radius)] before:tw-content-[]",
          "before:tw-bg-[linear-gradient(0deg,var(--neon-first-color),var(--neon-second-color))] before:bg-[length:tw-100%_200%]",
          "before:tw-animate-background-position-spin",
          "after:tw-absolute after:tw--top-[var(--border-size)] after:tw--left-[var(--border-size)] after:tw--z-10 after:tw-block",
          "after:tw-h-[var(--pseudo-element-height)] after:tw-w-[var(--pseudo-element-width)] after:tw-rounded-[var(--border-radius)] after:tw-blur-[var(--after-blur)] after:tw-content-[]",
          "after:tw-bg-[linear-gradient(0deg,var(--neon-first-color),var(--neon-second-color))] after:bg-[length:tw-100%_200%] after:tw-opacity-80",
          "after:tw-animate-background-position-spin",
          "dark:tw-bg-neutral-900",
          "tw-break-words"
        )}
      >
        {children}
      </div>
    </div>
  )
}
