import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { FileIcon, FolderIcon, FolderOpenIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

type TreeViewElement = {
  id: string
  name: string
  isSelectable?: boolean
  children?: TreeViewElement[]
}

type TreeContextProps = {
  selectedId: string | undefined
  expandedItems: string[] | undefined
  indicator: boolean
  handleExpand: (id: string) => void
  selectItem: (id: string) => void
  setExpandedItems?: React.Dispatch<React.SetStateAction<string[] | undefined>>
  openIcon?: React.ReactNode
  closeIcon?: React.ReactNode
  direction: "rtl" | "ltr"
}

const TreeContext = createContext<TreeContextProps | null>(null)

const useTree = () => {
  const context = useContext(TreeContext)
  if (!context) {
    throw new Error("useTree must be used within a TreeProvider")
  }
  return context
}

type Direction = "rtl" | "ltr" | undefined

type TreeViewProps = {
  initialSelectedId?: string
  indicator?: boolean
  elements?: TreeViewElement[]
  initialExpandedItems?: string[]
  openIcon?: React.ReactNode
  closeIcon?: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

const Tree = forwardRef<HTMLDivElement, TreeViewProps>(
  (
    {
      className,
      elements,
      initialSelectedId,
      initialExpandedItems,
      children,
      indicator = true,
      openIcon,
      closeIcon,
      dir,
      ...props
    },
    ref
  ) => {
    const [selectedId, setSelectedId] = useState<string | undefined>(
      initialSelectedId
    )
    const [expandedItems, setExpandedItems] = useState<string[] | undefined>(
      initialExpandedItems
    )

    const selectItem = useCallback((id: string) => {
      setSelectedId(id)
    }, [])

    const handleExpand = useCallback((id: string) => {
      setExpandedItems((prev) => {
        if (prev?.includes(id)) {
          return prev.filter((item) => item !== id)
        }
        return [...(prev ?? []), id]
      })
    }, [])

    const expandSpecificTargetedElements = useCallback(
      (elements?: TreeViewElement[], selectId?: string) => {
        if (!elements || !selectId) return
        const findParent = (
          currentElement: TreeViewElement,
          currentPath: string[] = []
        ) => {
          const isSelectable = currentElement.isSelectable ?? true
          const newPath = [...currentPath, currentElement.id]
          if (currentElement.id === selectId) {
            if (isSelectable) {
              setExpandedItems((prev) => [...(prev ?? []), ...newPath])
            } else {
              if (newPath.includes(currentElement.id)) {
                newPath.pop()
                setExpandedItems((prev) => [...(prev ?? []), ...newPath])
              }
            }
            return
          }
          if (
            isSelectable &&
            currentElement.children &&
            currentElement.children.length > 0
          ) {
            currentElement.children.forEach((child) => {
              findParent(child, newPath)
            })
          }
        }
        elements.forEach((element) => {
          findParent(element)
        })
      },
      []
    )

    useEffect(() => {
      if (initialSelectedId) {
        expandSpecificTargetedElements(elements, initialSelectedId)
      }
    }, [initialSelectedId, elements])

    const direction = dir === "rtl" ? "rtl" : "ltr"

    return (
      <TreeContext.Provider
        value={{
          selectedId,
          expandedItems,
          handleExpand,
          selectItem,
          setExpandedItems,
          indicator,
          openIcon,
          closeIcon,
          direction,
        }}
      >
        <div className={cn("tw-size-full", className)}>
          <ScrollArea
            ref={ref}
            className="tw-relative tw-h-full tw-px-2"
            dir={dir as Direction}
          >
            <AccordionPrimitive.Root
              {...props}
              type="multiple"
              defaultValue={expandedItems}
              value={expandedItems}
              className="tw-flex tw-flex-col tw-gap-1"
              onValueChange={(value) =>
                setExpandedItems((prev) => [...(prev ?? []), value[0]])
              }
              dir={dir as Direction}
            >
              {children}
            </AccordionPrimitive.Root>
          </ScrollArea>
        </div>
      </TreeContext.Provider>
    )
  }
)

Tree.displayName = "Tree"

const TreeIndicator = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { direction } = useTree()

  return (
    <div
      dir={direction}
      ref={ref}
      className={cn(
        "tw-bg-neutral-100 tw-absolute tw-left-1.5 tw-h-full tw-w-px tw-rounded-md tw-py-3 tw-duration-300 tw-ease-in-out hover:tw-bg-slate-300 rtl:tw-right-1.5 dark:tw-bg-neutral-800",
        className
      )}
      {...props}
    />
  )
})

TreeIndicator.displayName = "TreeIndicator"

type FolderProps = {
  expandedItems?: string[]
  element: string
  isSelectable?: boolean
  isSelect?: boolean
} & React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>

const Folder = forwardRef<
  HTMLDivElement,
  FolderProps & React.HTMLAttributes<HTMLDivElement>
>(
  (
    {
      className,
      element,
      value,
      isSelectable = true,
      isSelect,
      children,
      ...props
    },
    ref
  ) => {
    const {
      direction,
      handleExpand,
      expandedItems,
      indicator,
      setExpandedItems,
      openIcon,
      closeIcon,
    } = useTree()

    return (
      <AccordionPrimitive.Item
        {...props}
        value={value}
        className="tw-relative tw-h-full tw-overflow-hidden"
      >
        <AccordionPrimitive.Trigger
          className={cn(
            `flex items-center gap-1 rounded-md text-sm`,
            className,
            {
              "bg-neutral-100 rounded-md dark:bg-neutral-800": isSelect && isSelectable,
              "cursor-pointer": isSelectable,
              "cursor-not-allowed opacity-50": !isSelectable,
            }
          )}
          disabled={!isSelectable}
          onClick={() => handleExpand(value)}
        >
          {expandedItems?.includes(value)
            ? (openIcon ?? <FolderOpenIcon className="tw-size-4" />)
            : (closeIcon ?? <FolderIcon className="tw-size-4" />)}
          <span>{element}</span>
        </AccordionPrimitive.Trigger>
        <AccordionPrimitive.Content className="data-[state=closed]:tw-animate-accordion-up data-[state=open]:tw-animate-accordion-down tw-relative tw-h-full tw-overflow-hidden tw-text-sm">
          {element && indicator && <TreeIndicator aria-hidden="true" />}
          <AccordionPrimitive.Root
            dir={direction}
            type="multiple"
            className="tw-ml-5 tw-flex tw-flex-col tw-gap-1 tw-py-1 rtl:tw-mr-5"
            defaultValue={expandedItems}
            value={expandedItems}
            onValueChange={(value) => {
              setExpandedItems?.((prev) => [...(prev ?? []), value[0]])
            }}
          >
            {children}
          </AccordionPrimitive.Root>
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    )
  }
)

Folder.displayName = "Folder"

const File = forwardRef<
  HTMLButtonElement,
  {
    value: string
    handleSelect?: (id: string) => void
    isSelectable?: boolean
    isSelect?: boolean
    fileIcon?: React.ReactNode
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
>(
  (
    {
      value,
      className,
      handleSelect,
      isSelectable = true,
      isSelect,
      fileIcon,
      children,
      ...props
    },
    ref
  ) => {
    const { direction, selectedId, selectItem } = useTree()
    const isSelected = isSelect ?? selectedId === value
    return (
      <button
        ref={ref}
        type="button"
        disabled={!isSelectable}
        className={cn(
          "tw-flex tw-w-fit tw-items-center tw-gap-1 tw-rounded-md tw-pr-1 tw-text-sm tw-duration-200 tw-ease-in-out rtl:tw-pr-0 rtl:tw-pl-1",
          {
            "bg-neutral-100 dark:bg-neutral-800": isSelected && isSelectable,
          },
          isSelectable ? "tw-cursor-pointer" : "tw-cursor-not-allowed tw-opacity-50",
          direction === "rtl" ? "tw-rtl" : "tw-ltr",
          className
        )}
        onClick={() => selectItem(value)}
        {...props}
      >
        {fileIcon ?? <FileIcon className="tw-size-4" />}
        {children}
      </button>
    )
  }
)

File.displayName = "File"

const CollapseButton = forwardRef<
  HTMLButtonElement,
  {
    elements: TreeViewElement[]
    expandAll?: boolean
  } & React.HTMLAttributes<HTMLButtonElement>
>(({ className, elements, expandAll = false, children, ...props }, ref) => {
  const { expandedItems, setExpandedItems } = useTree()

  const expendAllTree = useCallback((elements: TreeViewElement[]) => {
    const expandTree = (element: TreeViewElement) => {
      const isSelectable = element.isSelectable ?? true
      if (isSelectable && element.children && element.children.length > 0) {
        setExpandedItems?.((prev) => [...(prev ?? []), element.id])
        element.children.forEach(expandTree)
      }
    }

    elements.forEach(expandTree)
  }, [])

  const closeAll = useCallback(() => {
    setExpandedItems?.([])
  }, [])

  useEffect(() => {
    console.log(expandAll)
    if (expandAll) {
      expendAllTree(elements)
    }
  }, [expandAll])

  return (
    <Button
      variant={"ghost"}
      className="tw-absolute tw-right-2 tw-bottom-1 tw-h-8 tw-w-fit tw-p-1"
      onClick={
        expandedItems && expandedItems.length > 0
          ? closeAll
          : () => expendAllTree(elements)
      }
      ref={ref}
      {...props}
    >
      {children}
      <span className="tw-sr-only">Toggle</span>
    </Button>
  )
})

CollapseButton.displayName = "CollapseButton"

export { CollapseButton, File, Folder, Tree, type TreeViewElement }
