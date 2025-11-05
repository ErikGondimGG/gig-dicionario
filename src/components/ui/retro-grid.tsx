import { cn } from "@/lib/utils"

interface RetroGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Additional CSS classes to apply to the grid container
   */
  className?: string
  /**
   * Rotation angle of the grid in degrees
   * @default 65
   */
  angle?: number
  /**
   * Grid cell size in pixels
   * @default 60
   */
  cellSize?: number
  /**
   * Grid opacity value between 0 and 1
   * @default 0.5
   */
  opacity?: number
  /**
   * Grid line color in light mode
   * @default "gray"
   */
  lightLineColor?: string
  /**
   * Grid line color in dark mode
   * @default "gray"
   */
  darkLineColor?: string
}

export function RetroGrid({
  className,
  angle = 65,
  cellSize = 60,
  opacity = 0.5,
  lightLineColor = "gray",
  darkLineColor = "gray",
  ...props
}: RetroGridProps) {
  const gridStyles = {
    "--grid-angle": `${angle}deg`,
    "--cell-size": `${cellSize}px`,
    "--opacity": opacity,
    "--light-line": lightLineColor,
    "--dark-line": darkLineColor,
  } as React.CSSProperties

  return (
    <div
      className={cn(
        "tw-pointer-events-none tw-absolute tw-size-full tw-overflow-hidden [perspective:tw-200px]",
        `opacity-[var(--opacity)]`,
        className
      )}
      style={gridStyles}
      {...props}
    >
      <div className="tw-absolute tw-inset-0 [transform:tw-rotateX(var(--grid-angle))]">
        <div className="tw-animate-grid [inset:tw-0%_0px] [margin-left:tw--200%] [height:tw-300vh] [width:tw-600vw] [transform-origin:tw-100%_0_0] [background-image:tw-linear-gradient(to_right,var(--light-line)_1px,transparent_0),linear-gradient(to_bottom,var(--light-line)_1px,transparent_0)] [background-size:tw-var(--cell-size)_var(--cell-size)] [background-repeat:tw-repeat] dark:[background-image:tw-linear-gradient(to_right,var(--dark-line)_1px,transparent_0),linear-gradient(to_bottom,var(--dark-line)_1px,transparent_0)]" />
      </div>

      <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-t tw-from-white tw-to-transparent tw-to-90% dark:tw-from-black" />
    </div>
  )
}
