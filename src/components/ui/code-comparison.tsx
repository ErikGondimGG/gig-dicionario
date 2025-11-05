import { useEffect, useMemo, useState } from "react"
import {
  transformerNotationDiff,
  transformerNotationFocus,
} from "@shikijs/transformers"
import { FileIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

interface CodeComparisonProps {
  beforeCode: string
  afterCode: string
  language: string
  filename: string
  lightTheme: string
  darkTheme: string
  highlightColor?: string
}

export function CodeComparison({
  beforeCode,
  afterCode,
  language,
  filename,
  lightTheme,
  darkTheme,
  highlightColor = "#ff3333",
}: CodeComparisonProps) {
  const { theme, systemTheme } = useTheme()
  const [highlightedBefore, setHighlightedBefore] = useState("")
  const [highlightedAfter, setHighlightedAfter] = useState("")
  const [hasLeftFocus, setHasLeftFocus] = useState(false)
  const [hasRightFocus, setHasRightFocus] = useState(false)

  const selectedTheme = useMemo(() => {
    const currentTheme = theme === "system" ? systemTheme : theme
    return currentTheme === "dark" ? darkTheme : lightTheme
  }, [theme, systemTheme, darkTheme, lightTheme])

  useEffect(() => {
    if (highlightedBefore || highlightedAfter) {
      setHasLeftFocus(highlightedBefore.includes('class="line focused"'))
      setHasRightFocus(highlightedAfter.includes('class="line focused"'))
    }
  }, [highlightedBefore, highlightedAfter])

  useEffect(() => {
    async function highlightCode() {
      try {
        const { codeToHtml } = await import("shiki")
        const { transformerNotationHighlight } = await import(
          "@shikijs/transformers"
        )

        const before = await codeToHtml(beforeCode, {
          lang: language,
          theme: selectedTheme,
          transformers: [
            transformerNotationHighlight({ matchAlgorithm: "v3" }),
            transformerNotationDiff({ matchAlgorithm: "v3" }),
            transformerNotationFocus({ matchAlgorithm: "v3" }),
          ],
        })
        const after = await codeToHtml(afterCode, {
          lang: language,
          theme: selectedTheme,
          transformers: [
            transformerNotationHighlight({ matchAlgorithm: "v3" }),
            transformerNotationDiff({ matchAlgorithm: "v3" }),
            transformerNotationFocus({ matchAlgorithm: "v3" }),
          ],
        })
        setHighlightedBefore(before)
        setHighlightedAfter(after)
      } catch (error) {
        console.error("Error highlighting code:", error)
        setHighlightedBefore(`<pre>${beforeCode}</pre>`)
        setHighlightedAfter(`<pre>${afterCode}</pre>`)
      }
    }
    highlightCode()
  }, [beforeCode, afterCode, language, selectedTheme])

  const renderCode = (code: string, highlighted: string) => {
    if (highlighted) {
      return (
        <div
          style={{ "--highlight-color": highlightColor } as React.CSSProperties}
          className={cn(
            "tw-bg-white tw-h-full tw-w-full tw-overflow-auto tw-font-mono tw-text-xs dark:tw-bg-neutral-950",
            "[&>pre]:tw-h-full [&>pre]:tw-!w-screen [&>pre]:tw-py-2",
            "[&>pre>code]:tw-!inline-block [&>pre>code]:tw-!w-full",
            "[&>pre>code>span]:tw-!inline-block [&>pre>code>span]:tw-w-full [&>pre>code>span]:tw-px-4 [&>pre>code>span]:tw-py-0.5",
            "[&>pre>code>.highlighted]:tw-inline-block [&>pre>code>.highlighted]:tw-w-full [&>pre>code>.highlighted]:tw-!bg-[var(--highlight-color)]",
            "tw-group-hover/left:[&>pre>code>:not(.focused)]:!opacity-100 tw-group-hover/left:[&>pre>code>:not(.focused)]:!blur-none",
            "tw-group-hover/right:[&>pre>code>:not(.focused)]:!opacity-100 tw-group-hover/right:[&>pre>code>:not(.focused)]:!blur-none",
            "[&>pre>code>.add]:tw-bg-[rgba(16,185,129,.16)] [&>pre>code>.remove]:tw-bg-[rgba(244,63,94,.16)]",
            "tw-group-hover/left:[&>pre>code>:not(.focused)]:transition-all tw-group-hover/left:[&>pre>code>:not(.focused)]:duration-300",
            "tw-group-hover/right:[&>pre>code>:not(.focused)]:transition-all tw-group-hover/right:[&>pre>code>:not(.focused)]:duration-300"
          )}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      )
    } else {
      return (
        <pre className="tw-bg-white tw-text-neutral-950 tw-h-full tw-overflow-auto tw-p-4 tw-font-mono tw-text-xs tw-break-all dark:tw-bg-neutral-950 dark:tw-text-neutral-50">
          {code}
        </pre>
      )
    }
  }

  return (
    <div className="tw-mx-auto tw-w-full tw-max-w-5xl">
      <div className="tw-group tw-border-neutral-200 tw-relative tw-w-full tw-overflow-hidden tw-rounded-md tw-border dark:tw-border-neutral-800">
        <div className="tw-relative tw-grid md:tw-grid-cols-2">
          <div
            className={cn(
              "tw-leftside tw-group/left tw-border-neutral-900/20 md:tw-border-r dark:tw-border-neutral-50/20",
              hasLeftFocus &&
                "[&>div>pre>code>:not(.focused)]:tw-!opacity-50 [&>div>pre>code>:not(.focused)]:tw-!blur-[0.095rem]",
              "[&>div>pre>code>:not(.focused)]:tw-transition-all [&>div>pre>code>:not(.focused)]:tw-duration-300"
            )}
          >
            <div className="tw-border-neutral-900/20 tw-bg-neutral-100 tw-text-neutral-950 tw-flex tw-items-center tw-border-b tw-p-2 tw-text-sm dark:tw-border-neutral-50/20 dark:tw-bg-neutral-800 dark:tw-text-neutral-50">
              <FileIcon className="tw-mr-2 tw-h-4 tw-w-4" />
              {filename}
              <span className="tw-ml-auto tw-hidden md:tw-block">before</span>
            </div>
            {renderCode(beforeCode, highlightedBefore)}
          </div>
          <div
            className={cn(
              "tw-rightside tw-group/right tw-border-neutral-900/20 tw-border-t md:tw-border-t-0 dark:tw-border-neutral-50/20",
              hasRightFocus &&
                "[&>div>pre>code>:not(.focused)]:tw-!opacity-50 [&>div>pre>code>:not(.focused)]:tw-!blur-[0.095rem]",
              "[&>div>pre>code>:not(.focused)]:tw-transition-all [&>div>pre>code>:not(.focused)]:tw-duration-300"
            )}
          >
            <div className="tw-border-neutral-900/20 tw-bg-neutral-100 tw-text-neutral-950 tw-flex tw-items-center tw-border-b tw-p-2 tw-text-sm dark:tw-border-neutral-50/20 dark:tw-bg-neutral-800 dark:tw-text-neutral-50">
              <FileIcon className="tw-mr-2 tw-h-4 tw-w-4" />
              {filename}
              <span className="tw-ml-auto tw-hidden md:tw-block">after</span>
            </div>
            {renderCode(afterCode, highlightedAfter)}
          </div>
        </div>
        <div className="tw-border-neutral-900/20 tw-bg-neutral-100 tw-text-neutral-950 tw-absolute tw-top-1/2 tw-left-1/2 tw-hidden tw-h-8 tw-w-8 tw--translate-x-1/2 tw--translate-y-1/2 tw-items-center tw-justify-center tw-rounded-md tw-border tw-border-neutral-200 tw-text-xs md:tw-flex dark:tw-border-neutral-50/20 dark:tw-bg-neutral-800 dark:tw-text-neutral-50 dark:tw-border-neutral-800">
          VS
        </div>
      </div>
    </div>
  )
}
