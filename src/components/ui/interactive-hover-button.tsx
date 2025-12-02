import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

export function InteractiveHoverButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "group bg-white relative w-auto cursor-pointer overflow-hidden rounded-full border border-neutral-200 p-2 px-6 text-center font-semibold dark:bg-neutral-950 dark:border-neutral-800",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <div className="bg-neutral-900 h-2 w-2 rounded-full transition-all duration-300 group-hover:scale-[100.8] dark:bg-neutral-50"></div>
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
      </div>
      <div className="text-neutral-50 absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100 dark:text-neutral-900">
        <span>{children}</span>
        <ArrowRight />
      </div>
    </button>
  );
}
